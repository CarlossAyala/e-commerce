export function EmptyPlaceholder({ title, description }) {
  return (
    <section className="grid place-content-center rounded border border-dashed py-32">
      {title && <p className="text-center text-lg font-semibold">{title}</p>}
      {description && (
        <p className="text-center text-sm font-normal text-muted-foreground">
          {description}
        </p>
      )}
    </section>
  );
}
