import { useSearchParams } from "react-router-dom";
import { EmptyPlaceholder, Pagination } from "@/components";
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
  const isEmpty = groups.length === 0;

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
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : isEmpty ? (
          <EmptyPlaceholder title="No results" description="No stores found." />
        ) : (
          groups.map((group) => <StoresGroup key={group.key} group={group} />)
        )}
      </section>

      <Pagination totalRows={stores?.count} />
    </>
  );
};
