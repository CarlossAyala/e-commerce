import { Skeleton } from "@/components";

export const Gallery = () => {
  return (
    <div className="space-y-4">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md border border-border/50">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_655276-MLU74135830926_012024-O.webp"
          alt="RAM"
          className="size-full object-contain object-center"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded border border-border/50"
          >
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg"
              alt="RAM"
              className="size-full object-contain object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

Gallery.Skeleton = function GallerySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-h-1 aspect-w-1 w-full" />

      <div className="grid grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, index) => (
          <Skeleton key={index} className="aspect-h-1 aspect-w-1 w-full" />
        ))}
      </div>
    </div>
  );
};
