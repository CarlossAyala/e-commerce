import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3CenterLeftIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetProfile } from "../auth";
import { Logo, Sidebar } from "../features/ui";

export const RootLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  const seller = useGetProfile();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] overflow-hidden">
      <header className="flex h-14 w-full items-center border-b border-neutral-300 pr-4 pl-2 py-2">
        <button
          onClick={() => setSidebar(true)}
          className="flex p-2 items-center justify-center"
        >
          <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <Logo />
        <div className="flex h-full grow justify-end">
          <Menu as="div">
            <Menu.Button className="h-10 w-10 overflow-hidden rounded-full">
              <img
                className="inline-block w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                alt="Image Description"
              />
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
              <Menu.Items className="absolute right-0 mt-2 mr-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-hidden">
                <div className="px-3 py-2 bg-gray-100">
                  <p className="text-sm font-semibold leading-none text-gray-800">
                    James Doe
                  </p>
                  <p className="text-sm font-medium leading-normal text-gray-800">
                    james@site.com
                  </p>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={clsx(
                          "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        )}
                      >
                        <UserCircleIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={clsx(
                          "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        )}
                      >
                        <Cog6ToothIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signin"
                        className={clsx(
                          "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        )}
                      >
                        <UserCircleIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Sign in
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/signup"
                        className={clsx(
                          "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        )}
                      >
                        <Cog6ToothIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Sign up
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={clsx(
                          "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        )}
                      >
                        <ArrowLeftOnRectangleIcon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Sign out
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <Sidebar open={sidebar} setOpen={setSidebar} />
      </header>

      <Outlet />
    </div>
  );
};

export default RootLayout;
