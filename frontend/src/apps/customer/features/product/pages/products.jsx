import { useSearchParams } from "react-router-dom";
import {
  EmptyPlaceholder,
  Filters,
  Pagination,
} from "../../../../../components";
import { useGetProducts } from "../queries";
import { ProductCard } from "../../../components";
import { useDocumentTitle } from "../../../../../hooks";

const filters = [
  {
    filter_type: "search",
  },
];

export const Products = () => {
  const [params] = useSearchParams();
  const { products, count, isLoading, isError, error, isEmpty } =
    useGetProducts(params.toString());

  useDocumentTitle("Products");

  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold uppercase tracking-tight">
          Products
        </h2>
        <p className="text-sm text-muted-foreground">
          This is a list of all the products.
        </p>
      </section>

      <Filters filters={filters} />

      {isLoading ? (
        <section className="grid grid-cols-products gap-4">
          <ProductCard.Skeleton />
        </section>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder title="No products" description="No products found" />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </section>
      )}

      <Pagination totalRows={count} />
    </main>
  );
};
