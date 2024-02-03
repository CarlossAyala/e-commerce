import { useSearchParams } from "react-router-dom";
import { EmptyPlaceholder } from "../../../../../components";
import { Formatter } from "../../../../../utils";
import { useGetStores } from "../queries";
import { StoresGroup } from "./stores-group";

// TODO: Add pagination
export const StoresList = () => {
  const [params] = useSearchParams();

  const {
    data: stores,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetStores(params.toString());

  const isEmpty = isSuccess && stores.rows.length === 0;

  const groups = isSuccess && Formatter.groupByFirstLetter(stores.rows, "name");

  return (
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
  );
};
