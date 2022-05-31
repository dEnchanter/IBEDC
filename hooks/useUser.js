import useSWR from 'swr';

export default function useUser() {
  const { data, mutate, error: swrError } = useSWR('api/user', getFetcher);
  const error = swrError || data?.responseCode === 10 ? {} : null;
  if (swrError) {
    error.message = 'Failed to retrieve user session. Please refresh page';
    console.error(swrError);
  }
  if (data?.responseCode === 10) {
    error.message = `Failed to retrieve user session. Error: ${data.message}`;
  }
  const loading = !data && !error;
  console.log(data);
  return {
    loading,
    error,
    noSessionFound: data?.payload?.noSessionFound,
    user: data?.payload?.user,
    mutate,
  };
}

export async function getFetcher(url) {
  const response = await fetch(url);
  if (response.statusText === 'OK') {
    return await response.json();
  }
  throw new Error(response.statusText);
}
