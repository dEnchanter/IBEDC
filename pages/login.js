import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Input, SubmitButton } from '../components/forms';

import { withSessionSsr } from '../lib/route-helper';
import { useRouter } from 'next/router';

import ibedcLogo from '../public/ibedc.png';

export default function Login({ prop }) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  async function handleSubmit(ev) {
    ev.preventDefault();

    let username = ev.currentTarget.username.value;
    let password = ev.currentTarget.password.value;

    try {
      if (username && password) {
        setLoading(true);
        try {
          let response = await fetch('http://45.33.3.35:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();

          console.log(data);
          if (data.code === 200) {
            localStorage.setItem("token", data.data.token)
            route.push('/transaction');
          } else {
            alert('Login failed. ' + data.message);
          }
        } catch (error) {
          console.error(error);
          alert('Login failed');
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
        {/* <Image
          src="/bulb2.jpg"
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
        /> */}

        <img
          src="/ibedc.png"
          className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
          width={150}
          height={150}
        />

          <form className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-white font-semibold text-center">Sign In</h1>
            <div className='space-y-7'>
              <label htmlFor="username" className="inline-block w-full">
                <Input name="username" placeholder="username" />
              </label>

              <label htmlFor="password" className="inline-block w-full">
                <Input name="password" type="password" placeholder="password" />
              </label>
           </div>
            <SubmitButton loading={loading} label="Sign in" />
            <div className="text-[gray]">
              Don't have an account?{' '}
              <Link href="/signup">
                <button
                  className="cursor-pointer text-white hover:underline"
                  type="submit"
                >
                  Sign up now
                </button>
              </Link>
          </div>
          </form>
        </div>
  );
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
});
