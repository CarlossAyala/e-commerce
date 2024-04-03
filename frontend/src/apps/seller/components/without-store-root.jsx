import { Outlet } from "react-router-dom";
import { Separator } from "@/components";
import { WithoutStoreHeader } from "./without-store-header";

export const WithoutStoreRoot = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <WithoutStoreHeader />
      <Separator />

      <Outlet />
    </div>
  );
};
