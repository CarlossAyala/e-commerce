import { Fragment, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useGetProfile } from "../auth";

const panelOptions = {
  cart: "cart",
  switcher: "switcher",
};

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

const navigation = [
  {
    section: "Reviews",
    pages: [
      {
        label: "Overview",
        to: "/review",
      },
      {
        label: "Timeline",
        to: "/review/timeline",
      },
    ],
  },
];

const Logo = () => {
  return (
    <Link to="/" className="px-2">
      <div className="flex h-12 flex-col justify-center text-black/90">
        <p className="text-sm leading-none">Fak-Ommerce</p>
        <p className="text-sm font-semibold leading-tight">[Seller]</p>
      </div>
    </Link>
  );
};

export const RootLayout = () => {
  const [slideover, setSlideover] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [slideoverPanel, setSlideoverPanel] = useState("");

  const customer = useGetProfile();

  const handleSlideoverPanel = (panel) => {
    setSlideoverPanel(panel);
    setSlideover(true);
  };

  const hideSlideover = () => {
    setSlideoverPanel("");
    setSlideover(false);
  };

  const hideSidebar = () => {
    setSidebar(false);
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr] overflow-hidden">
      <header className="flex h-12 w-full items-center border-b border-neutral-300">
        <button
          onClick={() => setSidebar(true)}
          className="flex h-full w-12 items-center justify-center"
        >
          <Bars3CenterLeftIcon className="h-5 w-5 text-gray-900" />
        </button>
        <Logo />
        <div className="flex h-full grow justify-end">
          <button
            onClick={() => console.log("Search Icon Header")}
            className="flex h-full w-12 items-center justify-center"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => handleSlideoverPanel(panelOptions.cart)}
            className="relative flex h-full w-12 items-center justify-center"
          >
            <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={() => handleSlideoverPanel(panelOptions.switcher)}
            className="flex h-full w-12 items-center justify-center"
          >
            <Squares2X2Icon className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Sidebar */}
        <Transition.Root show={sidebar} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={hideSlideover}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex">
                    <button
                      type="button"
                      className="relative inline-flex w-12 items-center justify-center rounded-md text-gray-600"
                      onClick={() => setSidebar(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <Logo />
                  </div>

                  {/* Links */}
                  <nav className="border-t border-gray-200 space-y-4">
                    {navigation.map((sections) => (
                      <div key={sections.section} className="group">
                        <div className="mx-4 pb-1 pt-2 border-b border-black/20 group-first:pt-3">
                          <p className="leading-tight text-sm text-gray-600">
                            {sections.section}
                          </p>
                        </div>
                        <ul>
                          {sections.pages.map((page) => (
                            <li key={page.label}>
                              <Link
                                to={page.to}
                                className="block px-4 py-2 font-semibold text-gray-900 leading-tight"
                                onClick={hideSidebar}
                              >
                                {page.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Slideover */}
        <Transition.Root
          show={slideover}
          as={Fragment}
          afterLeave={() => {
            setSlideover(false);
            setSlideoverPanel("");
          }}
        >
          <Dialog as="div" className="relative z-10" onClose={setSlideover}>
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
                            {slideoverPanel === panelOptions.switcher
                              ? "Switcher"
                              : "Shopping Cart"}
                          </Dialog.Title>

                          <button
                            type="button"
                            className="rounded-md text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-400"
                            onClick={() => setSlideover(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>

                        {slideoverPanel === panelOptions.switcher && (
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
                                      onClick={hideSlideover}
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
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </header>

      <div>
        <nav className="px-4 mt-3 flex items-center">
          <ol className="flex items-center flex-wrap">
            <li className="leading-tight mr-1 relative after:text-sm after:content-['/'] after:ml-1 after:text-gray-600">
              <Link
                to="#"
                className="text-sm hover:underline hover:underline-offset-2 hover:decoration-blue-600"
              >
                Page
              </Link>
            </li>
            <li className="leading-tight mr-1 relative after:text-sm after:content-['/'] after:ml-1 after:text-gray-600">
              <Link
                to="#"
                className="text-sm hover:underline hover:underline-offset-2 hover:decoration-blue-600"
              >
                Page
              </Link>
            </li>
          </ol>
        </nav>
        <section className="px-4 pb-2 mt-1 border-black/10 border-b">
          <h1 className="text-2xl leading-tight font-medium text-neutral-800">
            Dashboard
          </h1>
        </section>
      </div>

      <Outlet />
    </div>
  );
};

export default RootLayout;
