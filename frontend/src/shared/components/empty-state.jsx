import { cn } from "@/libs";

export const EmptyState = ({
  className,
  title,
  description,
  icon: Icon,
  children,
}) => {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-start gap-6 rounded-lg border bg-background px-20 py-12",
        className,
      )}
    >
      {Icon && (
        <div className="flex items-center justify-center rounded-md border p-3">
          <Icon className="size-9 text-muted-foreground" />
        </div>
      )}
      <div className="space-y-1 text-balance text-center">
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}
    </section>
  );
};
