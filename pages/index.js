import { data } from 'autoprefixer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Header } from '../components/header';
import useUser, { getFetcher } from '../hooks/useUser';

export default function Home() {
  const { user, noSessionFound, loading, mutate } = useUser();
  const route = useRouter();

  console.log('noSession found: ' + noSessionFound);
  useEffect(() => {
    if (noSessionFound) {
      // alert('You session has expired. You will be redirected to login');
      route.push('/login');
    }
  }, [noSessionFound, route]);

  return (
    <div>
     <Header />
      <div className="flex mt-10 font-bold justify-center items-center">{loading ? 'Loading...' : JSON.stringify(user)}</div>
    </div>
  );
}
