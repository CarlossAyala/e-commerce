import { useSearchParams } from "react-router-dom";
import {
  Button,
  EmptyPlaceholder,
  Pagination,
} from "../../../../../components";
import { Formatter } from "../../../../../utils";
import { useGetStores } from "../queries";
import { StoresGroup } from "./stores-group";

export const StoresList = () => {
  const [params, setParams] = useSearchParams();

  const {
    stores,
    count,
    isLoading,
    isError,
    hasContent,
    hasFilters,
    isSuccess,
    error,
  } = useGetStores(params.toString());

  const groups = isSuccess && Formatter.groupByFirstLetter(stores, "name");

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
        ) : !hasContent ? (
          <EmptyPlaceholder title="No results" description="No stores found.">
            {hasFilters && (
              <Button
                className="mt-4"
                size="sm"
                onClick={() => setParams(new URLSearchParams())}
              >
                Clear filters
              </Button>
            )}
          </EmptyPlaceholder>
        ) : (
          groups.map((group) => <StoresGroup key={group.key} group={group} />)
        )}
      </section>

      <Pagination totalRows={count} />
    </>
  );
};
