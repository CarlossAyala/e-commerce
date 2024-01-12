import { cn } from "../libs/utils";

export function EmptyPlaceholder({ title, description, className }) {
  return (
    <section
      className={cn(
        "grid place-content-center rounded border border-dashed py-32",
        className,
      )}
    >
      {title && <p className="text-center text-lg font-semibold">{title}</p>}
      {description && (
        <p className="text-center text-sm font-normal text-muted-foreground">
          {description}
        </p>
      )}
    </section>
  );
}
