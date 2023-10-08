import { cn } from "../libs/utils";

export function EmptyPlaceholder({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

EmptyPlaceholder.Icon = function EmptyPlaceHolderIcon({
  icon: Icon,
  className,
  ...props
}) {
  if (!Icon) {
    return null;
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      <Icon className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
};

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}) {
  return (
    <p
      className={cn(
        "mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
