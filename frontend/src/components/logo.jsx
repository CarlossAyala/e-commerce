import { Link } from "react-router-dom";
import { APP_NAVIGATION } from "../configs";
import { Button } from "./ui/button";
import { useSidebarStore } from "../apps/admin/components";
import { cn } from "../libs/utils";

const { admin, customer, seller } = APP_NAVIGATION;

const apps = [admin.to, customer.to, seller.to];

/**
 * @param {Object} param
 * @param {String} param.className
 * @param {"admin"|"customer"|"seller"} param.app
 */
const Logo = ({ app = customer, className }) => {
  const { setClose } = useSidebarStore();
  const to = apps.find((route) => route.includes(app)) ?? customer.to;
  const prefix = to.split("/")[1];

  return (
    <Button
      variant="ghost"
      size="lg"
      asChild
      className={cn(
        "h-auto shrink-0 flex-col items-start rounded-sm p-1",
        className,
      )}
      onClick={setClose}
    >
      <Link to={to}>
        <p className="text-sm font-normal leading-3">Fake-Commerce</p>
        <p className="text-sm font-semibold capitalize leading-4">
          [ {prefix} ]
        </p>
      </Link>
    </Button>
  );
};

export default Logo;
