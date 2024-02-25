import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useGetProfile } from "../../../shared/auth";

const DropdownProfile = () => {
  const user = useGetProfile();

  return (
    <Menu as="div" className="ml-auto">
      <Menu.Button className="h-10 w-10 overflow-hidden rounded-full">
        <img
          className="inline-block h-full w-full object-cover"
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
        <Menu.Items className="absolute right-0 z-10 mr-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="bg-gray-100 px-3 py-3">
            {user.isLoading ? (
              <>
                <p>Loading...</p>
              </>
            ) : (
              <>
                <p className="line-clamp-1 text-sm font-semibold leading-none text-gray-800">
                  Carlos Ayala
                </p>
                <p className="mt-0.5 line-clamp-1 text-sm font-medium leading-tight text-gray-600">
                  carlosayala@gmail.com
                </p>
              </>
            )}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={clsx(
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm",
                    active ? "bg-violet-500 text-white" : "text-gray-900",
                  )}
                >
                  <UserCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
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
                    active ? "bg-violet-500 text-white" : "text-gray-900",
                  )}
                >
                  <Cog6ToothIcon className="mr-2 h-5 w-5" aria-hidden="true" />
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
                    active ? "bg-violet-500 text-white" : "text-gray-900",
                  )}
                >
                  <UserCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
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
                    active ? "bg-violet-500 text-white" : "text-gray-900",
                  )}
                >
                  <Cog6ToothIcon className="mr-2 h-5 w-5" aria-hidden="true" />
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
                    active ? "bg-violet-500 text-white" : "text-gray-900",
                  )}
                >
                  <ArrowLeftOnRectangleIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Log out
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownProfile;
