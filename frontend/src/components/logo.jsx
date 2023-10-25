import { Link } from "react-router-dom";
import { appActionRoutes } from "../configs";
import { Button } from "./ui/button";
import { useSidebarStore } from "../apps/admin/components";

const { admin, customer, seller } = appActionRoutes;

const redirects = [admin, customer, seller];

/**
 * @param {Object} param
 * @param {String} param.className
 * @param {"admin"|"customer"|"seller"} param.app
 */
const Logo = ({ app = customer }) => {
  const { setClose } = useSidebarStore();
  const to = redirects.find((route) => route.includes(app)) ?? customer;
  const prefix = to.split("/")[1];

  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      className="flex-col items-start px-2"
      onClick={setClose}
    >
      <Link to={to}>
        <p className="text-sm font-normal leading-none">Fake-Commerce</p>
        <p className="text-sm font-semibold capitalize leading-none">
          [ {prefix} ]
        </p>
      </Link>
    </Button>
  );
};

export default Logo;
