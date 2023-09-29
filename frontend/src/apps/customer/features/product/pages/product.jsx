import { useParams } from "react-router-dom";
import clsx from "clsx";
import { MainContent } from "../../../../../components";
import { useGetProduct } from "../queries";

const ReviewRating = ({ rating }) => {};

const Product = () => {
  const { productId } = useParams();
  const product = useGetProduct(productId);

  return (
    <MainContent className="space-y-4">
      {product.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {product.isSuccess && (
            <>
              <section className="mt-3">
                <div className="mb-1 flex items-center justify-between gap-x-2">
                  <p
                    className={clsx(
                      "text-sm font-medium capitalize leading-snug",
                      product.data.condition === "new" && "text-green-700",
                      product.data.condition === "used" && "text-violet-700",
                      product.data.condition === "reconditioned" &&
                        "text-blue-700",
                    )}
                  >
                    {product.data.condition}
                  </p>
                  <div></div>
                  <p className="text-sm leading-snug text-muted-foreground">
                    {product.data.sold} sold
                  </p>
                </div>
                <h1 className="scroll-m-20 text-xl font-medium tracking-tight">
                  {product.data.name}
                </h1>
              </section>
              <section className="">
                <img
                  className="h-full w-full object-contain object-center"
                  src="https://http2.mlstatic.com/D_NQ_NP_651885-MLA31088151129_062019-O.webp"
                  alt={`${product.data.name} image`}
                />
              </section>
              <section></section>
            </>
          )}
        </>
      )}
    </MainContent>
  );
};

export default Product;
