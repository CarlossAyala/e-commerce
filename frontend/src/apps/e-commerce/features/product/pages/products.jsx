import { useSearchParams } from "react-router-dom";
import {
  DocumentIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { ProductCard } from "@/apps/e-commerce/components";
import { useGetProducts } from "@/shared/features/product";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  Pagination,
} from "@/shared/components";
import { Filters } from "@/components";

const filters = [
  {
    filter_type: "search",
  },
];

export const Products = () => {
  useDocumentTitle("Products");
  const [params] = useSearchParams();
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProducts(params.toString());

  const isEmpty = products?.rows.length === 0;

  return (
    <main className="container space-y-4">
      <PageHeader>
        <PageHeaderHeading>Products</PageHeaderHeading>
        <PageHeaderDescription>
          This is a list of all the products.
        </PageHeaderDescription>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <ProductCard.Skeleton count={3} />
      ) : isError ? (
        <EmptyState
          icon={ExclamationTriangleIcon}
          title="Error"
          description={error.message}
        />
      ) : isEmpty ? (
        <EmptyState
          icon={DocumentIcon}
          title="No products"
          description="No products found"
        />
      ) : (
        <section className="grid grid-cols-products gap-4">
          {products.rows.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}

      <Pagination count={products?.count} />
    </main>
  );
};
