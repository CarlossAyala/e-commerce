import { cn } from "../libs/utils";

export function EmptyPlaceholder({ title, description, className, children }) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center rounded border border-dashed p-10",
        className,
      )}
    >
      {title && <p className="text-center text-lg font-semibold">{title}</p>}
      {description && (
        <p className="text-center text-sm font-normal text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </section>
  );
}
