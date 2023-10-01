import { ProductItem } from "../../../components";
import { useGetRelatedProducts } from "../queries";

export const RelatedProducts = ({ productId }) => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
  } = useGetRelatedProducts(productId);

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
      {isLoading && (
        <>
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
          <ProductItem.Skeleton />
        </>
      )}
      {isError && (
        <p className="text-sm leading-snug text-muted-foreground">
          Error fetching related products
        </p>
      )}
      {isSuccess &&
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
};
