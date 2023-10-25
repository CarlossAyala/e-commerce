import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Logo,
} from "../../../../components";
import { adminAsideNavigation } from "../../utils";
import { useSidebarStore } from "./store";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { setClose } = useSidebarStore();

  return (
    <>
      <div className="flex h-14 items-center px-2">
        <Logo app="admin" />
      </div>
      <div className="px-2 py-4">
        <nav>
          <ul className="space-y-1">
            {adminAsideNavigation.map(({ name, to, icon: Icon, subRoutes }) => (
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
                          <span className="text-sm font-medium">{name}</span>
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
                            onClick={setClose}
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
                    <Link to={to} onClick={setClose}>
                      <Icon className="mr-2 h-4 w-4" />
                      {name}
                    </Link>
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
