import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useSidebarContext } from "../hooks";

const SideNavLink = ({ to, label, icon: Icon }) => {
  const { handleClose } = useSidebarContext();

  return (
    <li>
      <NavLink to={to} className="group" onClick={handleClose}>
        {({ isActive }) => (
          <div
            className={clsx(
              "hover:bg-violet-100 items-center rounded-md p-2 flex gap-x-3",
              isActive && "bg-violet-100"
            )}
          >
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
        )}
      </NavLink>
    </li>
  );
};

export default SideNavLink;
