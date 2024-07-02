import { Outlet } from "react-router-dom";
import { useSocketEventHandler } from "../features/chats";
import { Footer } from "./footer";
import { Header } from "./header";

export const CustomerRoot = () => {
  useSocketEventHandler();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
