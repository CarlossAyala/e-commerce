import { cn } from "../utils";

export const PageHeader = ({ className, children, ...props }) => {
  return (
    <section className={cn("mt-4 space-y-1", className)} {...props}>
      {children}
    </section>
  );
};

export const PageHeaderHeading = ({ className, ...props }) => {
  return (
    <h2
      className={cn("text-2xl font-bold tracking-tight md:text-3xl", className)}
      {...props}
    />
  );
};

export const PageHeaderDescription = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-muted-foreground md:text-lg", className)}
      {...props}
    />
  );
};
