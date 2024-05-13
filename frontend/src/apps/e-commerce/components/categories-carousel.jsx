import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components";
import { CategoryCard } from ".";

export const CategoriesCarousel = ({ categories }) => {
  return (
    <Carousel>
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <CategoryCard category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

CategoriesCarousel.Skeleton = function CategoriesCarouselSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        {new Array(2).fill(0).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <CategoryCard.Skeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
