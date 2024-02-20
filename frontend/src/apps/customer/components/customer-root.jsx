// import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import { Separator } from "../../../components";

export const CustomerRoot = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Separator />
      {/* <Outlet /> */}
      <Separator />
      <Footer />
    </div>
  );
};
