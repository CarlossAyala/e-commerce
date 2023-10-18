import { Link, Outlet, useLocation } from "react-router-dom";
import { UserNav } from "../components";
import { Button, Logo } from "../../../components";
import { adminAsideNavigation } from "../utils";
import { isCurrentPath } from "../../../utils";
import { dashboardActionRoutes } from "../features";

const AdminRoot = () => {
  const location = useLocation();

  return (
    <div className="container flex h-screen overflow-hidden border p-0">
      <aside className="hidden w-full max-w-[240px] shrink-0 border-r lg:block">
        <div className="flex h-14 items-center px-2">
          <Logo />
        </div>
        <div className="px-2 py-4">
          <nav>
            <ul className="space-y-1">
              {adminAsideNavigation.map(({ name, to, icon: Icon }) => (
                <li key={name}>
                  <Button
                    variant={
                      isCurrentPath(location, to, dashboardActionRoutes.root)
                        ? "secondary"
                        : "ghost"
                    }
                    className="w-full justify-start px-2"
                    asChild
                  >
                    <Link to={to}>
                      <Icon className="mr-2 h-4 w-4" />
                      {name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="grow overflow-y-auto">
        <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-end border-b px-4">
          <UserNav />
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
