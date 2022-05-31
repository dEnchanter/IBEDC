import { Menu, Transition } from "@headlessui/react";
import React, { useReducer } from "react";
import { useUser } from "../hooks/auth";
import { AlertContext } from "../components/alertBar";
import {
  CogIcon,
  DownArrowIcon,
  ImagePlaceholderIcon,
  LogoutIcon,
} from "./icons";
import { AlertBar } from "./alertBar";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { formatDate } from "../util/common";
import { format } from "date-fns";

export default function Template({ children, title }) {
  const { user, mutateUser } = useUser({ redirectTo: "/login" });
  const router = useRouter();

  const [menu, submenu] = router.pathname.split("/").filter((p) => !!p); // remove falsies

  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem("ut");
    mutateUser("user-data/me");
  }

  return (
    <>
      <div className="fixed bg-white right-0 left-16 top-0 h-16 z-20 _app-root">
        <div className="relative flex justify-end items-center pr-4 h-full">
          <div className="flex-grow text-gray-500 capitalize pl-5">
            <div className="flex divide-x-2">
              <div className="mr-5">
                <h2 className="text-lg font-bold leading-tight">{menu}</h2>
                <p className="text-xs leading-tight">{format(new Date(), "'Today' d, MMMM yyyy")}</p>
              </div>
              <div className="pl-5 leading-10 text-sm capitalize">{submenu?.split("-")?.join(" ")}</div>
            </div>
          </div>
          <div className="flex">
            <div className="text-left flex justify-center items-center">
              <div className="mr-2 text-gray-500">
                <ImagePlaceholderIcon strokeWidth="1" />
              </div>
              <p className="text-gray-500 text-sm">{user?.data?.fullName}</p>
              {/* <p className="text-gray-500 text-sm">{user?.data?.role}</p> */}
            </div>
            <div className="flex">
              {/* This is where the button is added */}
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className="transition duration-150 ease-in-out appearance-none focus:outline-none">
                      <div className="ml-2 mr-1 text-gray-500 cursor-pointer flex">
                        <DownArrowIcon h="w-5" />
                      </div>
                    </Menu.Button>

                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="absolute right-4 w-56 mt-10 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                      >
                        <div className="px-4 py-3">
                          <p className="text-sm leading-5">Signed in as</p>
                          <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                            {user?.data?.email}
                          </p>
                        </div>

                        <div className="py-1">
                          <Menu.Item
                            as="span"
                            disabled
                            className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                          >
                            Account settings (soon)
                          </Menu.Item>
                        </div>

                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#sign-out"
                                onClick={logout}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-yellow-700 font-semibold"
                                    : "text-yellow-600 font-semibold"
                                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-screen">
        <Sidebar />
        <div className="bg-gray-50 pt-24 pb-8 px-8 ml-16 flex-grow h-screen overflow-y-auto z-10">
          {children}
        </div>
      </div>
    </>
  );
}

// <!--
// 'Solutions' flyout menu, show/hide based on flyout menu state.

// Entering: "transition ease-out duration-200"
//   From: "opacity-0 translate-y-1"
//   To: "opacity-100 translate-y-0"
// Leaving: "transition ease-in duration-150"
//   From: "opacity-100 translate-y-0"
//   To: "opacity-0 translate-y-1"
// -->
