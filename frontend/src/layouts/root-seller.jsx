import { Outlet } from "react-router-dom";
import { Header } from "../components";

const RootSeller = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr] overflow-hidden">
      <Header />

      <Outlet />
    </div>
  );
};

export default RootSeller;
