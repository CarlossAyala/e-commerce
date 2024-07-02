import placeholder from "@/assets/images/placeholder-image.jpg";

export const OrderPreviewImage = ({ order }) => {
  const oneProduct = order.items.length === 1;
  const twoProducts = order.items.length === 2;
  const threeProducts = order.items.length === 3;
  const restProducts = order.items.length - 3;

  const firstImage = order.items[0].product.gallery.length
    ? order.items[0].product.gallery[0].url
    : placeholder;
  const secondImage = order.items[1]?.product.gallery.length
    ? order.items[1].product.gallery[0].url
    : placeholder;
  const thirdImage = order.items[2]?.product.gallery.length
    ? order.items[2].product.gallery[0].url
    : placeholder;

  return (
    <>
      {oneProduct ? (
        <div className="size-14 shrink-0 overflow-hidden rounded-md border shadow">
          <img
            src={firstImage}
            alt="Product"
            className="size-full object-cover object-center"
          />
        </div>
      ) : twoProducts ? (
        <div className="relative size-14 shrink-0">
          <div className="absolute left-0 top-0 z-10 size-10 overflow-hidden rounded-md border shadow">
            <img
              src={firstImage}
              alt="Product"
              className="size-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-0 size-10 overflow-hidden rounded-md border shadow">
            <img src={secondImage} alt="Product" />
          </div>
        </div>
      ) : threeProducts ? (
        <div className="relative size-14 shrink-0">
          <div className="absolute left-0 top-0 z-30 size-8 overflow-hidden rounded-md border shadow">
            <img
              src={firstImage}
              alt="Product"
              className="size-full object-cover object-center"
            />
          </div>
          <div className="absolute right-0 top-1/2 z-20 size-8 -translate-y-1/2 overflow-hidden rounded-md border shadow">
            <img
              src={secondImage}
              alt="Product"
              className="size-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-0 left-0 z-10 size-8 translate-x-1/4 overflow-hidden rounded-md border shadow">
            <img
              src={thirdImage}
              alt="Product"
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      ) : (
        <div className="grid shrink-0 grid-cols-2 overflow-hidden rounded-md border shadow">
          <div className="size-7">
            <img
              src={firstImage}
              alt="Product"
              className="size-full object-cover object-center"
            />
          </div>
          <div className="size-7">
            <img src={secondImage} alt="Product" />
          </div>
          <div className="size-7">
            <img
              alt="Product"
              src={thirdImage}
              className="size-full object-cover object-center"
            />
          </div>
          <div className="grid size-7 place-items-center text-sm text-muted-foreground">
            {restProducts}+
          </div>
        </div>
      )}
    </>
  );
};
