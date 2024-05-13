import { cn } from "@/libs";
import { getCurrentApp } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components";

export const NotFound = ({ className }) => {
  const location = useLocation();
  const { to } = getCurrentApp(location.pathname);

  return (
    <section
      className={cn(
        "grid place-content-center place-items-center items-center gap-4 px-4",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center px-4 text-center sm:flex-row">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:mr-6 sm:border-r sm:pr-6">
          404
        </h1>
        <h2 className="mt-2 text-lg text-muted-foreground sm:mt-0">
          This page could not be found.
        </h2>
      </div>
      <Link to={to} className={cn(buttonVariants(), "w-fit")}>
        Go home
      </Link>
    </section>
  );
};
