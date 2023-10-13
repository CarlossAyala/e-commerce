import { FaceFrownIcon } from "@heroicons/react/24/outline";
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
    <section className={cn("space-y-8", className)}>
      <Input
        className="max-w-sm grow rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search"
      />

      <section className="space-y-10">
        {isLoading && (
          <>
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching products
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <p className="text-sm font-normal italic text-muted-foreground">
            No products
          </p>
        )}
        {hasContent &&
          groups.map((group) => <StoresGroup key={group.key} group={group} />)}
      </section>
    </section>
  );
};
