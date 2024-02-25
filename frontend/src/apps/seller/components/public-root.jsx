import { Outlet } from "react-router-dom";
import { Separator } from "@/components";
import { PublicHeader } from "./public-header";

export const PublicRoot = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <PublicHeader />
      <Separator />

      <Outlet />
    </div>
  );
};
