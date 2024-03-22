import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CubeIcon,
  Square3Stack3DIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Button, Label, RadioGroup, RadioGroupItem } from "@/components";

const APPS = {
  "e-commerce": "/",
  seller: "/seller",
  admin: "/admin",
};

export const Portals = () => {
  const [app, setApp] = useState("e-commerce");
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(APPS[app]);
  };

  return (
    <>
      <RadioGroup
        value={app}
        onValueChange={setApp}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem
            value="e-commerce"
            id="e-commerce"
            className="peer sr-only"
          />
          <Label
            htmlFor="e-commerce"
            className="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <TagIcon className="size-6" />
            E-Commerce
          </Label>
        </div>
        <div>
          <RadioGroupItem value="seller" id="seller" className="peer sr-only" />
          <Label
            htmlFor="seller"
            className="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CubeIcon className="size-6" />
            Seller
          </Label>
        </div>
        <div>
          <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
          <Label
            htmlFor="admin"
            className="flex flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Square3Stack3DIcon className="size-6" />
            Admin
          </Label>
        </div>
      </RadioGroup>

      <Button className="w-full" onClick={handleRedirect}>
        Go
      </Button>
    </>
  );
};
