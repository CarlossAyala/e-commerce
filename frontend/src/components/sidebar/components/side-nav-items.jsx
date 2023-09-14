const SideNavItems = ({ children }) => {
  return (
    <nav className="flex-1 flex flex-col px-2 pb-4">
      <ol className="space-y-2">{children}</ol>
    </nav>
  );
};

export default SideNavItems;
