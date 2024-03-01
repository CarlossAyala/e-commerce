import { Outlet } from "react-router-dom";
import { Separator } from "@/components";
import { Footer } from "./footer";
import { Header } from "./header";

export const CustomerRoot = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Separator />
      <Outlet />
      <Separator />
      <Footer />
    </div>
  );
};
