import { useParams } from "react-router-dom";
import { ProductCard } from "@/apps/customer/components";
import { EmptyPlaceholder } from "@/components";
import { useGetRandomsCategory } from "../queries";

export const CategoryRandoms = () => {
  const { slug } = useParams();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetRandomsCategory(slug);

  const isEmpty = products?.length === 0;

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Randoms</h3>

      {isLoading ? (
        <div className="grid grid-cols-products gap-4">
          <ProductCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder title="No results" description="No products found" />
      ) : (
        <div className="grid grid-cols-products gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
