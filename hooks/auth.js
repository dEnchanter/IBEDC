import { useEffect, useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from '../util/axios';

export function useUser({ redirectTo = false, redirectIfFound = false } = {}) {
  async function userFetcher(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        return error.response.data;
      }
      if (error.userNotFound) {
        throw error;
      }
      // TODO If the error is not associated with get user request, handle here
      throw error;
    }
  }

  const { data: user, mutate: mutateUser, ...rest } = useSWR('user-data/me', userFetcher);

  useEffect(() => {
    if (!redirectTo || !user) return;

    // Redirect to password reset page if the user we found has password reset flag set
    if (user?.status && user?.data?.passwordReset && redirectIfFound) {
      Router.push('user/reset-password');
      return;
    }

    if (
      // Redirect to login if user is not found and we are not on the login page
      (redirectTo && !redirectIfFound && !user?.status) ||
      // Redirect to appropriate page if this is the login page and we found a user
      (redirectIfFound && user?.status)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser, ...rest };
}
