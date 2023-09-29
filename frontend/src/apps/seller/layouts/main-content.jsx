import { cn } from "../../../libs/utils";

const MainContent = ({ children, className }) => {
  return (
    <main
      className={cn("container col-span-2 space-y-6 overflow-auto", className)}
    >
      {children}
    </main>
  );
};

export default MainContent;
