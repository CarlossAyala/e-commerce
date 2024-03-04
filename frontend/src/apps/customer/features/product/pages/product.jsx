import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import { Badge, EmptyPlaceholder, Skeleton } from "@/components";
import { Formatter } from "@/utils";
import { useAddHistory } from "../../history";
import { RelatedProducts } from "../components/related-products";
import { Review } from "../components/review/review";
import ProductStat from "../components/product/product-stat";
import { AddToCart } from "../components/product/add-to-cart";
import { AddToBookmark } from "../components/product/add-to-bookmark";
import { StoreInformation } from "../components/store-information";
import { FAQ } from "../components";
import { useGetProduct } from "@/shared/features/product";

export const Product = () => {
  const { productId } = useParams();
  const { data: product, isLoading, isError, error } = useGetProduct(productId);
  const history = useAddHistory();
  useDocumentTitle(product?.name ?? "Product");

  useEffect(() => {
    history.mutate(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <main className="container relative space-y-10">
      {isLoading ? (
        <article className="mt-4 flex h-60 gap-4">
          <Skeleton className="hidden grow sm:grid" />
          <Skeleton className="w-full sm:max-w-sm sm:shrink-0" />
        </article>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <article className="mt-4 flex gap-4">
          <div className="hidden max-h-60 grow place-content-center rounded-md bg-gray-100 sm:grid">
            <img
              className="h-auto w-80 rounded-md object-contain"
              src="https://http2.mlstatic.com/D_NQ_NP_921008-MLU73192298663_122023-O.webp"
              alt="TelX"
            />
          </div>

          <article className="w-full space-y-2 sm:max-w-sm sm:shrink-0">
            <div className="flex items-start justify-between">
              <ProductStat productId={product.id} />
              <Badge variant="outline" className="capitalize">
                {product.condition}
              </Badge>
            </div>

            <img
              className="max-h-60 w-full rounded-md object-contain sm:hidden"
              src="https://http2.mlstatic.com/D_NQ_NP_921008-MLU73192298663_122023-O.webp"
              alt="TelX"
            />

            <h1 className="text-xl font-medium">{product.name}</h1>
            <p className="text-sm leading-tight text-muted-foreground">
              {product.description}
            </p>
            <ul className="list-inside list-disc text-sm text-muted-foreground">
              <li>{product.sold} sold</li>
              <li>{product.stock} in stock</li>
            </ul>
            <p className="text-2xl font-bold leading-loose">
              {Formatter.currency(product.price)}
            </p>
            <AddToCart product={product} />

            <div className="flex gap-4">
              <AddToBookmark productId={product.id} />

              {/* TODO: Add share logic */}
              <button className="flex items-center text-muted-foreground">
                <ShareIcon className="mr-1 h-5 w-5" />
                Share
              </button>
            </div>
          </article>
        </article>
      )}

      <article className="col-span-2 space-y-2">
        <h2 className="text-lg font-semibold leading-snug">
          Store Information
        </h2>
        <StoreInformation />
      </article>

      <article className="col-span-2 space-y-2">
        <h2 className="text-lg font-semibold leading-snug">
          Frequently Asked Questions
        </h2>
        <FAQ productId={productId} />
      </article>

      <article className="col-span-2">
        <h2 className="text-lg font-semibold leading-snug">Reviews</h2>
        {/* <Review /> */}
        <p>TODO</p>
      </article>

      <section className="col-span-2 space-y-2">
        <h2 className="text-lg font-semibold leading-snug">Related products</h2>
        <RelatedProducts />
      </section>
    </main>
  );
};
