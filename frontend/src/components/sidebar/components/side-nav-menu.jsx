import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import SideNavMenuItem from "./side-nav-menu-item";
import { useActiveGroupRoute } from "../hooks";

const SideNavMenu = ({ label, icon: Icon, items }) => {
  const isActive = useActiveGroupRoute(items[0]);

  return (
    <Disclosure as="li" defaultOpen={isActive}>
      {({ open }) => (
        <>
          <Disclosure.Button className="group w-full">
            <div
              className={clsx(
                "hover:bg-violet-100 justify-between items-center rounded-md p-2 flex",
                isActive && "bg-violet-100"
              )}
            >
              <div className="flex items-center gap-x-3">
                <Icon
                  className={clsx(
                    "h-6 w-6 text-gray-500",
                    isActive && "text-violet-900"
                  )}
                />
                <p
                  className={clsx(
                    "font-semibold text-sm text-gray-800",
                    isActive && "text-violet-900"
                  )}
                >
                  {label}
                </p>
              </div>
              <ChevronDownIcon
                className={clsx(
                  "h-5 w-5 text-gray-500 transform duration-150 ease-in-out",
                  open && "rotate-180",
                  isActive && "text-violet-900"
                )}
              />
            </div>
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel as="ol" className="mt-2 space-y-1">
              {items.map(({ to, label }) => (
                <SideNavMenuItem key={to} to={to} label={label} />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default SideNavMenu;
