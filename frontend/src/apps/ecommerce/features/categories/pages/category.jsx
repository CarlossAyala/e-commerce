import { useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { ProductsCarousel } from "@/apps/ecommerce/components";
import { useGetCategory } from "@/features/categories";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from "@/shared/components";
import { useGetCategoryRandomProducts } from "../queries";

export const Category = () => {
  const { categoryId } = useParams();

  const category = useGetCategory(categoryId);
  const randoms = useGetCategoryRandomProducts(categoryId);

  useDocumentTitle(category.data?.name);

  useEffect(() => {
    scrollTo(0, 0);
  }, [categoryId]);

  return (
    <main className="flex-1 space-y-6 pb-10">
      {category.isLoading ? (
        <section className="space-y-4 desktop:container">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Skeleton className="aspect-h-9 aspect-w-16 rounded-none sm:aspect-h-6 lg:aspect-h-4" />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div className="space-y-2 px-4 xl:p-0">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-full" />
          </div>
        </section>
      ) : category.isError ? (
        <EmptyState
          title="Something went wrong!"
          description="Please try again later"
          className="mt-4"
        />
      ) : (
        <section className="space-y-2 desktop:container">
          <Carousel>
            <CarouselContent>
              {category.data.gallery.length ? (
                category.data.gallery.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="aspect-h-9 aspect-w-16 sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14">
                      <img
                        src={image.url}
                        alt="Banner"
                        className="size-full object-cover object-center"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="aspect-h-9 aspect-w-16 sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14">
                    <img src={placeholder} alt="No banner" />
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          <div className="px-4 xl:p-0">
            <h2 className="text-xl font-semibold md:text-2xl">
              {category.data.name}
            </h2>
            <p className="text-muted-foreground">{category.data.description}</p>
          </div>
        </section>
      )}

      <section className="container space-y-2">
        <h2 className="font-semibold md:text-xl">Products</h2>

        {randoms.isLoading ? (
          <ProductsCarousel.Skeleton />
        ) : randoms.isError ? (
          <EmptyState
            title="Something went wrong!"
            description="Please try again later"
          />
        ) : !randoms.data.length ? (
          <EmptyState
            title="No products"
            description="There are no products in this category"
          />
        ) : (
          <ProductsCarousel products={randoms.data} />
        )}
      </section>
    </main>
  );
};
