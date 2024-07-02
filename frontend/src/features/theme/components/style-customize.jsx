import { PaintBrushIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components";
import { Customize } from "./customize";

export const StyleCustomize = () => {
  return (
    <div className="flex items-center space-x-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <PaintBrushIcon className="mr-2 size-5" />
            Customize
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-1 p-6 pt-0">
          <DrawerTitle className="hidden">Customize your style</DrawerTitle>
          <DrawerDescription className="hidden">
            Change the color of the theme, the mode of the theme, and more.
          </DrawerDescription>
          <Customize />
        </DrawerContent>
      </Drawer>
      <div className="hidden md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <PaintBrushIcon className="mr-2 size-5" />
              Customize
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            className="z-40 w-80 rounded bg-background p-6"
          >
            <Customize />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
