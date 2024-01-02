export function EmptyPlaceholder({ title, description }) {
  return (
    <div className="grid place-content-center rounded border border-dashed py-32">
      {title && <p className="text-center text-lg font-semibold">{title}</p>}
      {description && (
        <p className="text-center text-sm font-normal text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
