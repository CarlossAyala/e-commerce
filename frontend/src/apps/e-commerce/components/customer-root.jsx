import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export const CustomerRoot = () => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
