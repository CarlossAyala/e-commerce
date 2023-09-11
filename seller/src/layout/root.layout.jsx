import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetProfile } from "../auth";
import { Logo, Sidebar } from "../features/ui";

const switcherSections = [
  [
    {
      label: "Publications",
      to: "/product/list",
    },
    {
      label: "Stock alert",
      to: "/product/stock-alert",
    },
    {
      label: "New product",
      to: "/product/new",
    },
    {
      label: "Questions",
      to: "/product/question/all",
    },
    {
      label: "Sales",
      to: "/sale/list",
    },
    {
      label: "Reviews",
      to: "/review/list",
    },
  ],
  [
    {
      label: "Store",
      to: "/store",
    },
    {
      label: "Create Store",
      to: "/store/new",
    },
  ],
  [
    {
      label: "Account",
      to: "/account",
    },
  ],
  [
    {
      label: "Log out",
      to: "/logout",
    },
  ],
];

export const RootLayout = () => {
  const [sidebar, setSidebar] = useState(true);
  const [slide, setSlide] = useState(false);

  const customer = useGetProfile();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] overflow-hidden">
      <header className="flex h-14 w-full items-center border-b border-neutral-300 p-2">
        <button
          onClick={() => setSidebar(true)}
          className="flex p-2 items-center justify-center"
        >
          <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <Logo />
        <div className="flex h-full grow justify-end">
          <button
            onClick={() => setSlide(true)}
            className="flex p-2 items-center justify-center"
          >
            <Squares2X2Icon className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <Sidebar open={sidebar} setOpen={setSidebar} />

        {/* Slideover */}
        <Transition.Root
          show={slide}
          as={Fragment}
          afterLeave={() => {
            setSlide(false);
          }}
        >
          <Dialog as="div" className="relative z-10" onClose={setSlide}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white">
                        <div className="flex items-center justify-between border-b border-black/10 bg-neutral-50 p-4">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Switcher
                          </Dialog.Title>

                          <button
                            type="button"
                            className="rounded-md text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-400"
                            onClick={() => setSlide(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="relative flex-1 divide-y divide-black/10">
                          {customer.isLoading ? (
                            <p>Loading...</p>
                          ) : (
                            <div className="flex items-center gap-x-2 px-4 py-3">
                              {customer.isError && (
                                <div>
                                  <p>Sign in / Sign up</p>
                                </div>
                              )}

                              {customer.isSuccess && (
                                <>
                                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
                                    <img
                                      className="h-full w-full object-cover"
                                      src="https://cdn.dribbble.com/users/6903298/avatars/small/350ff7d3d2a5470d9c9b1d8a05c823aa.png?1671623912"
                                      alt="Dribble Random User"
                                    />
                                  </div>
                                  <div>
                                    <p className="line-clamp-1 text-base font-semibold leading-normal text-gray-900">
                                      {`${customer.data.name} ${customer.data.lastName}`}
                                    </p>
                                    <p className="line-clamp-1 text-sm font-medium leading-normal text-gray-600">
                                      {customer.data.email}
                                    </p>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                          {switcherSections.map((section, index) => (
                            <ul key={index} className="py-2">
                              {section.map(({ label, to }) => (
                                <li key={to}>
                                  <Link
                                    to={to}
                                    className="flex px-4 py-1.5"
                                    onClick={() => setSlide(false)}
                                  >
                                    <p className="text-base font-semibold leading-tight text-gray-900">
                                      {label}
                                    </p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </header>

      <Outlet />
    </div>
  );
};

export default RootLayout;
