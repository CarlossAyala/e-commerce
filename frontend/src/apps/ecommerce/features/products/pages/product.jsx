import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsCarousel } from "@/apps/ecommerce/components";
import { useGetProduct } from "@/features/products";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  ProductCondition,
  ReviewStars,
  Separator,
  Skeleton,
} from "@/shared/components";
import { useAuth } from "@/features/auth";
import { Formatter } from "@/shared/utils";
import { useAddHistory } from "../../history";
import { useGetReviewsStat } from "../../review";
import { RelatedProducts } from "../components/related-products";
import { AddToCart } from "../components/add-to-cart";
import { Bookmark } from "../components/bookmark";
import { Store } from "../components/store";
import { Gallery } from "../components/gallery";
import { QANew } from "../components/qa-new";
import { Questions } from "../components/questions";
import { ReviewList } from "../components/review-list";
import { ReviewScore } from "../components/review-score";
import { ShareProduct } from "../components/share-product";

export const Product = () => {
  const { productId } = useParams();
  const auth = useAuth();
  const isAuthenticated = !!auth.data;

  const { data: product, isLoading, isError, error } = useGetProduct(productId);
  const stats = useGetReviewsStat(productId);

  useDocumentTitle(product?.name);

  const addToHistory = useAddHistory();

  useEffect(() => {
    if (!isAuthenticated) return;

    addToHistory.mutate(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <main className="container flex-1 space-y-6 pb-10">
      {isLoading ? (
        <>
          <section className="mt-4 grid gap-6 md:grid-cols-2">
            <Gallery.Skeleton />

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-full" />
              </div>
              <Skeleton className="h-10 w-1/4" />

              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="space-y-2">
                {new Array(4).fill(0).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>

              <div className="grid w-full grid-cols-6 gap-2">
                <Skeleton className="col-span-2 h-10" />
                <Skeleton className="col-span-4 h-10" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="size-9" />
                <Skeleton className="size-9" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-xl leading-snug">Questions and Answers</h3>

            <ul className="space-y-6">
              {new Array(3).fill(0).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </ul>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-xl leading-snug">Reviews</h3>

            <div className="flex flex-col gap-8 sm:flex-row">
              <ReviewScore />
              <ReviewList />
            </div>
          </section>

          <Separator />
          <section className="space-y-4">
            <h3 className="text-xl leading-snug">Related Products</h3>

            <ProductsCarousel.Skeleton />
          </section>
        </>
      ) : isError ? (
        <EmptyState
          title="Error"
          description={error.message}
          className="mt-4"
        />
      ) : (
        <>
          <section className="mt-4 grid gap-6 md:grid-cols-2">
            <Gallery gallery={product.gallery} />
            <div className="space-y-4">
              <div className="space-y-1">
                {stats.isLoading ? (
                  <Skeleton className="h-5 w-1/2" />
                ) : stats.isError ? (
                  <div>
                    <p className="text-sm text-muted-foreground">Error stats</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="leading-none text-muted-foreground md:text-sm">
                      {stats.data.average}
                    </p>
                    <ReviewStars
                      rating={stats.data.average}
                      size="lg"
                      className="gap-0"
                    />
                    <p className="leading-none text-muted-foreground md:text-sm">
                      ({stats.data.count})
                    </p>
                  </div>
                )}

                <div>
                  <h2 className="text-3xl font-bold">{product.name}</h2>
                </div>
              </div>
              <div>
                <p className="text-3xl">{Formatter.currency(product.price)}</p>
              </div>
              <div>
                <p className="leading-snug text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <p>Condition</p>
                  <ProductCondition condition={product.condition} />
                </div>
                <div className="flex items-center justify-between">
                  <p>Available</p>
                  <p className="font-medium">
                    {product.available ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Stock</p>
                  <p className="font-medium">{product.stock}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Sold</p>
                  <p className="font-medium">{product.sold}</p>
                </div>
              </div>
              <AddToCart product={product} />
              <div className="flex justify-between">
                <Bookmark product={product} />
                <ShareProduct product={product} />
              </div>
              <Separator />
              <Store productId={productId} />
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl leading-snug">Questions and Answers</h3>
              <QANew productId={productId} />
            </div>

            <Questions productId={productId} />
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-xl leading-snug">Reviews</h3>

            <div className="flex flex-col gap-8 sm:flex-row">
              <ReviewScore productId={productId} />
              <ReviewList productId={productId} />
            </div>
          </section>

          <Separator />

          <section className="space-y-4">
            <h3 className="text-xl leading-snug">Related Products</h3>

            <RelatedProducts />
          </section>
        </>
      )}
    </main>
  );
};
