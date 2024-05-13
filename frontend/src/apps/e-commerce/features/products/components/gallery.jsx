import placeholder from "@/assets/images/placeholder-image.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from "@/components";

export const Gallery = ({ gallery }) => {
  return (
    <Carousel>
      <CarouselContent>
        {gallery.length ? (
          gallery.map((image) => (
            <CarouselItem key={image.id}>
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md border">
                <img
                  src={image.url}
                  alt="Product image"
                  className="size-full object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))
        ) : (
          <CarouselItem>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md border">
              <img
                src={placeholder}
                alt="Product image place"
                className="size-full object-cover object-center"
              />
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

Gallery.Skeleton = function GallerySkeleton() {
  return <Skeleton className="aspect-h-1 aspect-w-1 w-full" />;
};
