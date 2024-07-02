import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components";
import { ProductCard } from ".";

export const ProductsCarousel = ({ products }) => {
  return (
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

ProductsCarousel.Skeleton = function ProductsCarouselSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        {new Array(2).fill(0).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
          >
            <ProductCard.Skeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
