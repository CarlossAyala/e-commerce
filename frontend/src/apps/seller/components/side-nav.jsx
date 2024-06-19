import { useLocation, NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components";
import { cn } from "@/libs";
import { SIDE_NAV } from "../config";

export const SideNav = () => {
  const location = useLocation();

  return (
    <nav className="grid px-2 text-sm">
      {SIDE_NAV.map((item) =>
        item.subNav ? (
          <Accordion key={item.name} type="single" collapsible>
            <AccordionItem key={item.name} value={item.name}>
              <AccordionTrigger
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 font-normal",
                  location.pathname.includes(item.to)
                    ? "data-[state=closed]:bg-foreground data-[state=closed]:text-secondary"
                    : "data-[state=closed]:hover:text-primary",
                )}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 size-5" />
                  {item.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="ml-7 grid text-sm">
                {item.subNav.map((sub) => (
                  <NavLink
                    key={sub.name}
                    to={sub.to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2",
                        isActive
                          ? "bg-foreground text-secondary"
                          : "hover:text-primary",
                      )
                    }
                    end
                  >
                    {sub.name}
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
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-md px-3 py-2",
                isActive
                  ? "bg-foreground text-secondary"
                  : "hover:text-primary",
              )
            }
          >
            <item.icon className="size-5" />
            {item.name}
          </NavLink>
        ),
      )}
    </nav>
  );
};
