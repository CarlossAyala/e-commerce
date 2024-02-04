import { useParams } from "react-router-dom";
import { EmptyPlaceholder } from "../../../../../components";
import { ProductCard } from "../../../components";
import { useGetRandomsCategory } from "../queries";

export const CategoryRandoms = () => {
  const { slug } = useParams();

  const { products, isLoading, isError, hasContent, error } =
    useGetRandomsCategory(slug);

  return (
    <section className="space-y-2 px-4 lg:px-0">
      <h3 className="text-base font-medium tracking-tight">Randoms</h3>

      {isLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          <ProductCard.Skeleton />
        </div>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : !hasContent ? (
        <EmptyPlaceholder title="No results" description="No products found" />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
