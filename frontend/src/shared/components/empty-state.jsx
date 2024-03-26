import { cn } from "@/libs";

export const EmptyState = ({ className, title, description, children }) => {
  return (
    <section
      className={cn(
        "grid place-content-center gap-6 rounded-md border border-dashed bg-gray-50 px-20 py-12",
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
