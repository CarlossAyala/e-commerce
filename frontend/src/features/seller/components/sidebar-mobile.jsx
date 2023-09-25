import { Fragment } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Logo,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "../../../components";
import { navigation } from "../config";

const SidebarMobile = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto p-0" side="left">
        <SheetHeader className="mb-4 flex items-center justify-between px-2 py-3">
          <Logo />
          <SheetClose asChild>
            <Button type="button" variant="ghost" size="icon">
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="space-y-3">
          {navigation.sidebar.map(({ title, icon: Icon, to, items }) => {
            return (
              <Fragment key={title}>
                {to ? (
                  <div className="px-2">
                    <SheetClose asChild>
                      <Button
                        asChild
                        variant="ghost"
                        className="flex justify-start gap-x-2 px-2 text-sm font-medium"
                      >
                        <Link to={to}>
                          <Icon className="h-6 w-6" />
                          {title}
                        </Link>
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value={title}>
                      <AccordionTrigger className="mx-2 flex items-center p-2">
                        <div className="flex items-center gap-x-2 text-sm font-medium">
                          <Icon className="h-6 w-6" />
                          {title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2 p-2">
                        {items.map((nav) => (
                          <div key={nav.title} className="ml-8">
                            <SheetClose asChild>
                              <Button
                                asChild
                                variant="ghost"
                                className="w-full justify-start px-3"
                              >
                                <Link to={nav.to}>{nav.title}</Link>
                              </Button>
                            </SheetClose>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </Fragment>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
