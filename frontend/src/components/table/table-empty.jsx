const TableEmpty = () => {
  return (
    <div className="h-48 w-full rounded-xl border border-dashed">
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-muted-foreground">No results.</p>
      </div>
    </div>
  );
};

export default TableEmpty;
