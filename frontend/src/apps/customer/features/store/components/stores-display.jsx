import { EmptyPlaceholder, Input } from "../../../../../components";
import { cn } from "../../../../../libs/utils";
import { Formatter } from "../../../../../utils";
import { useGetStores } from "../queries";
import { StoresGroup } from "./stores-group";

export const StoresDisplay = ({ className }) => {
  const {
    data: stores,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetStores("");

  const hasContent = isSuccess && stores.rows.length > 0;
  const isEmpty = isSuccess && stores.rows.length === 0;

  const groups =
    hasContent && Formatter.groupByFirstLetter(stores.rows, "name");

  return (
    <section className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <p className="text-sm font-medium tracking-tight">Search</p>

        <Input
          className="max-w-sm grow rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search"
        />
      </div>

      <section>
        {isLoading ? (
          <>
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyPlaceholder title="No results" description="No stores found." />
        ) : (
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-tight">Results</p>

            <div className="space-y-6">
              {groups.map((group) => (
                <StoresGroup key={group.key} group={group} />
              ))}
            </div>
          </div>
        )}
      </section>
    </section>
  );
};
