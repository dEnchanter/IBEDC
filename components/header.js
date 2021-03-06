import { useRouter } from 'next/router';

import Image from 'next/image';
import Link from 'next/link';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { PlusSmIcon } from '@heroicons/react/solid';
import ibedcLogo from '../public/ibedc.png';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ImagePlaceholderIcon, CogIcon } from './icons';

const slugMap = {
  'business-unit': 'Business Unit',
  users: 'Users',
  'transaction-types': 'Transaction Type',
  'dashboard': 'Dashboard',
  'district-sub-station': 'District Sub station',
  'transaction': 'Transaction',	
};

export function Header({ user }) {
  const router = useRouter();
  // console.log(router);

  async function handleLogout() {
    const response = await fetch('/api/logout', getFetcher);
    const data = await response.json();
    if (data.responseCode === 0) {
      router.push('/login');
    } else {
      alert('Error logging user out');
    }
  }

  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem("token");
    // mutateUser("user-data/me");
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="sm:hidden sm:border-l-4 sm:px-2 ml-4 sm:border-ibedc-brand-orange sm:border-opacity-50 text-gray-500 font-semibold text-sm">
                    {slugMap[router.pathname?.substring(1)]}
                  </div>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <div>
                    <Image src={ibedcLogo} />
                  </div>
                  <div className="hidden sm:block border-l-4 px-2 ml-4 border-ibedc-brand-orange border-opacity-50 text-gray-500 font-semibold text-sm">
                    {slugMap[router.pathname?.substring(1)]}
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Menu as="div" className="relative z-20 inline-flex text-left">
                    <Menu.Button
                      as="a"
                      className="inline-flex justify-center items-center px-2 pt-1 w-full bg-white text-sm font-medium text-gray-500 hover:bg-ibedc-brand-orange hover:bg-opacity-5 hover:cursor-pointer focus:outline-none"
                    >
                      <CogIcon h="w-8" />
                      <span className="ml-1">Configuration</span>
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 top-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-4 grid grid-cols-1">
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/transaction-types">
                                <a
                                  href="#"
                                  className="border-transparent hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 block items-center px-4 py-2 text-sm font-medium"
                                >
                                  Transaction Types
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          {/* <Menu.Item>
                            {({ active }) => (
                              <Link href="/dashboard">
                                <a
                                  href="#"
                                  className="border-transparent hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 block items-center px-4 py-2 text-sm font-medium"
                                >
                                  Dashboard
                                </a>
                              </Link>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/business-unit">
                                <a
                                  href="#"
                                  className="border-transparent hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 inline-flex items-center px-4 py-2 text-sm font-medium"
                                >
                                  Business Unit
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/district-sub-station">
                                <a
                                  href="#"
                                  className="border-transparent hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 block items-center px-4 py-2 text-sm font-medium"
                                >
                                  District Sub station
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/transaction">
                                <a
                                  href="#"
                                  className="border-transparent hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 block items-center px-4 py-2 text-sm font-medium"
                                >
                                  Transaction
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/users">
                                <a
                                  href="#"
                                  className="border-transparent  hover:bg-ibedc-brand-orange hover:bg-opacity-25 hover:text-gray-800 text-gray-500 block items-center px-4 py-2 text-sm font-medium"
                                >
                                  Users
                                </a>
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                      <div className="mr-2 text-gray-500">
                        <ImagePlaceholderIcon strokeWidth="1" />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            //onClick={logout}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="div"
                className="bg-ibedc-brand-orange bg-opacity-20 border-ibedc-brand-orange text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link href="/business-unit">
                  <a>Business Unit</a>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link href="/district-sub-station">
                  <a>District Sub-station</a>
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="div"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link href="/transaction-types">
                  <a>Transaction Types</a>
                </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
