import { cn } from "@/libs";

export const EmptyState = ({ className, title, description, children }) => {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 rounded-md border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      <div className="space-y-1 text-balance text-center">
        <p className="text-base font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {children}
    </section>
  );
};
