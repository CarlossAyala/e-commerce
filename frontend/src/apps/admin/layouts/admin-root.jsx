import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { UserNav } from "../components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Logo,
} from "../../../components";
import { adminAsideNavigation } from "../utils";

const AdminRoot = () => {
  const { pathname } = useLocation();

  return (
    <div className="container flex min-h-screen overflow-y-auto border p-0">
      <aside className="fixed inset-y-0 z-50 hidden w-full max-w-[256px] shrink-0 border-r bg-white lg:block">
        <div className="flex h-14 items-center px-2">
          <Logo />
        </div>
        <div className="px-2 py-4">
          <nav>
            <ul className="space-y-1">
              {adminAsideNavigation.map(
                ({ name, to, icon: Icon, subRoutes }) => (
                  <li key={name}>
                    {subRoutes ? (
                      <Accordion type="single" collapsible>
                        <AccordionItem
                          value={name}
                          className={clsx(
                            "rounded hover:bg-secondary data-[state=open]:bg-secondary",
                            subRoutes.some(
                              (subRoute) => pathname === subRoute.to,
                            ) && "bg-secondary",
                          )}
                        >
                          <AccordionTrigger className="p-2">
                            <div className="flex items-center gap-x-2">
                              <Icon className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {name}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="ml-6 space-y-1 py-1">
                            {subRoutes.map((route) => (
                              <Link
                                key={route.name}
                                to={route.to}
                                className={clsx(
                                  "block rounded px-2 hover:text-blue-600",
                                  pathname === route.to &&
                                    "font-semibold text-blue-600",
                                )}
                              >
                                {route.name}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                      <Button
                        className="w-full justify-start px-2"
                        variant={pathname === to ? "secondary" : "ghost"}
                        asChild
                      >
                        <Link to={to}>
                          <Icon className="mr-2 h-4 w-4" />
                          {name}
                        </Link>
                      </Button>
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="grow lg:pl-64">
        <header className="flex h-14 w-full items-center justify-end border-b px-4">
          <UserNav />
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
