import { useState } from "react";
import Logo from "../logo";
import { Sidebar, SidebarTrigger } from "../sidebar";
import SidebarContext from "../sidebar/contexts/sidebar-context";

import { DropdownProfile } from "../dropdown";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <SidebarContext.Provider value={{ open, handleClose, handleOpen }}>
      <header className="flex h-14 items-center border-b border-neutral-300 pl-2 pr-4">
        <SidebarTrigger />
        <Logo />

        <DropdownProfile />
      </header>

      <Sidebar />
    </SidebarContext.Provider>
  );
};

export default Header;
