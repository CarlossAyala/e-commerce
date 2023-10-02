import { cn } from "../../libs/utils";

const MainContent = ({ children, className }) => {
  return <main className={cn("container", className)}>{children}</main>;
};

export default MainContent;
