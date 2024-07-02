import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components";
import { StoreCard } from ".";

export const StoresCarousel = ({ stores }) => {
  return (
    <Carousel>
      <CarouselContent>
        {stores.map((store) => (
          <CarouselItem
            key={store.id}
            className="basis-1/4 sm:basis-1/6 md:basis-[12.5%] lg:basis-[10%]"
          >
            <StoreCard store={store} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

StoresCarousel.Skeleton = function StoresCarouselSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        {new Array(2).fill(0).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-1/4 sm:basis-1/6 md:basis-[12.5%] lg:basis-[10%]"
          >
            <StoreCard.Skeleton />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
