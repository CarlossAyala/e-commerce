import clsx from "clsx";
import { cn } from "../../libs/utils";

const MainContent = ({ children, className, container = true }) => {
  return (
    <main className={cn(clsx(container && "container"), className)}>
      {children}
    </main>
  );
};

export default MainContent;
