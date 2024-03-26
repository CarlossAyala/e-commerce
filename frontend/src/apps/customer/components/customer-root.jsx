import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export const CustomerRoot = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 pb-12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
