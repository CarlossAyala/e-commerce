import { cn } from "@/libs";

export const PageHeader = ({ className, children, ...props }) => {
  return (
    <section className={cn("space-y-1", className)} {...props}>
      {children}
    </section>
  );
};

export const PageHeaderHeading = ({ className, ...props }) => {
  return (
    <h2
      className={cn("text-3xl font-bold tracking-tight", className)}
      {...props}
    />
  );
};

export const PageHeaderDescription = ({ className, ...props }) => {
  return (
    <p className={cn("text-lg text-muted-foreground", className)} {...props} />
  );
};
