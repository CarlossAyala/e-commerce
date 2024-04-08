import { useSearchParams } from "react-router-dom";
import { EmptyState, URLPagination } from "@/shared/components";
import { Formatter } from "@/utils";
import { useGetStores } from "../queries";
import { StoresGroup } from "./stores-group";

export const StoresList = () => {
  const [params] = useSearchParams();
  const {
    data: stores,
    isLoading,
    isError,
    error,
  } = useGetStores(params.toString());

  const groups = Formatter.groupByFirstLetter(stores?.rows, "name");
  const isEmpty = !groups.length;

  return (
    <>
      <section className="space-y-6">
        {isLoading ? (
          <>
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
            <StoresGroup.Skeleton />
          </>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyState title="No results" description="No stores found." />
        ) : (
          groups.map((group) => <StoresGroup key={group.key} group={group} />)
        )}
      </section>

      <URLPagination count={stores?.count} />
    </>
  );
};
