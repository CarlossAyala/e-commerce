import { Link } from "react-router-dom";
import { appActionRoutes } from "../configs";
import { Button } from "./ui/button";
import { useSidebarStore } from "../apps/admin/components";
import { cn } from "../libs/utils";

const { admin, customer, seller } = appActionRoutes;

const apps = [admin, customer, seller];

/**
 * @param {Object} param
 * @param {String} param.className
 * @param {"admin"|"customer"|"seller"} param.app
 */
const Logo = ({ app = customer, className }) => {
  const { setClose } = useSidebarStore();
  const to = apps.find((route) => route.includes(app)) ?? customer;
  const prefix = to.split("/")[1];

  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      className={cn("shrink-0 flex-col items-start px-2", className)}
      onClick={setClose}
    >
      <Link to={to}>
        <p className="text-sm font-normal leading-4">Fake-Commerce</p>
        <p className="text-sm font-semibold capitalize leading-none">
          [ {prefix} ]
        </p>
      </Link>
    </Button>
  );
};

export default Logo;
