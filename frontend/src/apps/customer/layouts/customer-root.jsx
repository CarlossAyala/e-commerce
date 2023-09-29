import { Outlet } from "react-router-dom";

const CustomerRoot = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <header className="h-14 w-full bg-indigo-600"></header>

      <Outlet />
    </div>
  );
};

export default CustomerRoot;
