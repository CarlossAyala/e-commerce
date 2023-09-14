import clsx from "clsx";
import { Link } from "react-router-dom";
import { useActiveRoute, useSidebarContext } from "../hooks";

const SideNavMenuItem = ({ to, label }) => {
  const isActive = useActiveRoute(to);
  const { handleClose } = useSidebarContext();

  return (
    <li>
      <Link to={to} className="group" onClick={handleClose}>
        <div
          className={clsx(
            "hover:bg-violet-100 rounded-md p-2 ml-9 gap-x-2",
            isActive && "bg-violet-100"
          )}
        >
          <p
            className={clsx(
              "font-semibold text-sm text-gray-800",
              isActive && "text-violet-900"
            )}
          >
            {label}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default SideNavMenuItem;
