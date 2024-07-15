import { useLocation, NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components";
import { cn } from "@/shared/utils";
import { SIDE_NAV } from "../config";

export const SideNav = () => {
  const location = useLocation();

  const currentPath = location.pathname.split("/")[2] || "dashboard";

  return (
    <nav className="grid px-2 text-sm">
      {SIDE_NAV.map((item) =>
        item.subItems ? (
          <Accordion key={item.name} type="single" collapsible>
            <AccordionItem key={item.name} value={item.name}>
              <AccordionTrigger
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 font-normal",
                  currentPath.includes(item.name)
                    ? "data-[state=closed]:bg-primary data-[state=closed]:text-primary-foreground"
                    : "data-[state=closed]:hover:text-primary",
                )}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 size-5" />
                  {item.label}
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-7 grid text-sm">
                {item.subItems.map((sub) => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:text-primary",
                      )
                    }
                    end
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <NavLink
            key={item.name}
            to={item.to}
            end
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2",
              currentPath.includes(item.name)
                ? "bg-primary text-primary-foreground"
                : "hover:text-primary",
            )}
          >
            <item.icon className="size-5" />
            {item.name}
          </NavLink>
        ),
      )}
    </nav>
  );
};
