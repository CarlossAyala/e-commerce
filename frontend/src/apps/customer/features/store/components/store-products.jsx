import { useParams, useSearchParams } from "react-router-dom";
import { useDebounced } from "../../../../../hooks";
import { useGetStoreProducts } from "../queries";
import { ProductCard } from "../../../components";
import {
  Button,
  EmptyPlaceholder,
  TablePagination,
} from "../../../../../components";

export const StoreProducts = () => {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const debouncedParams = useDebounced(params.toString());

  const {
    data: products,
    isLoading,
    isError,
    hasContent,
    hasFilters,
    error,
  } = useGetStoreProducts(slug, debouncedParams);

  return (
    <>
      {isLoading ? (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4 px-4 lg:px-0">
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasContent ? (
        <EmptyPlaceholder title="No products" description="No products found.">
          {hasFilters && (
            <Button className="mt-4" onClick={() => setParams()} size="sm">
              Clear filters
            </Button>
          )}
        </EmptyPlaceholder>
      ) : (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4 px-4 lg:px-0">
          {products.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <TablePagination className="px-4 lg:px-0" totalRows={products?.count} />
    </>
  );
};
