import { Dialog, Transition } from "@headlessui/react";
import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import SideNavItems from "./side-nav-items";
import SideNavLink from "./side-nav-link";
import SideNavMenu from "./side-nav-menu";
import Logo from "../../logo";
import { productNavigation } from "../../../features/seller/product/routes";
import { reviewNavigation } from "../../../features/seller/review/routes";
import { useSidebarContext } from "../hooks";

const Sidebar = () => {
  const { open, handleClose } = useSidebarContext();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto flex relative w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex pt-4 w-16 justify-center">
                      <button
                        type="button"
                        className="bg-black/50 rounded-full p-1 -m-1 text-white"
                        onClick={handleClose}
                      >
                        <span className="absolute" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow gap-y-4 h-full flex-col overflow-y-auto bg-white">
                    <div className="p-2 flex">
                      <Logo />
                    </div>
                    <SideNavItems>
                      <SideNavLink
                        to="/"
                        label="Dashboard"
                        icon={SparklesIcon}
                      />
                      <SideNavMenu
                        label={productNavigation.label}
                        icon={productNavigation.icon}
                        items={productNavigation.navigation}
                      />
                      <SideNavLink
                        to="/question"
                        label="Questions"
                        icon={QuestionMarkCircleIcon}
                      />
                      <SideNavLink
                        to="/store"
                        label="My store"
                        icon={BuildingStorefrontIcon}
                      />
                      <SideNavLink
                        to="/sale"
                        label="Sales"
                        icon={BanknotesIcon}
                      />
                      <SideNavMenu
                        label={reviewNavigation.label}
                        icon={reviewNavigation.icon}
                        items={reviewNavigation.navigation}
                      />
                    </SideNavItems>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
