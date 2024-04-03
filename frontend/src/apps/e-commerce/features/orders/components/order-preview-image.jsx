//TODO: Replace src with the real product image
export const OrderPreviewImage = ({ order }) => {
  const oneProduct = order.items.length === 1;
  const twoProducts = order.items.length === 2;
  const threeProducts = order.items.length === 3;
  const restProducts = order.items.length - 3;

  return (
    <>
      {oneProduct ? (
        <div className="size-14 shrink-0 overflow-hidden rounded-md border shadow">
          <img
            src="https://http2.mlstatic.com/D_697502-MLU72567972782_112023-N.jpg"
            alt="xxx"
            className="h-full w-full object-cover"
          />
        </div>
      ) : twoProducts ? (
        <div className="relative size-14 shrink-0">
          <div className="absolute left-0 top-0 z-10 size-10 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_697502-MLU72567972782_112023-N.jpg"
              alt="xxx"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 z-0 size-10 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
              alt="xxx"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : threeProducts ? (
        <div className="relative size-14 shrink-0">
          <div className="absolute left-0 top-0 z-30 size-8 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
              alt="a"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute right-0 top-1/2 z-20 size-8 -translate-y-1/2 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
              alt="a"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 z-10 size-8 translate-x-1/4 overflow-hidden rounded-md border shadow">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_949764-MLA46043438480_052021-O.webp"
              alt="a"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="grid shrink-0 grid-cols-2 overflow-hidden rounded-md border shadow">
          <div className="size-7">
            <img
              src="https://http2.mlstatic.com/D_942301-MLA43498437450_092020-N.jpg"
              alt="xxx"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="size-7">
            <img
              src="https://http2.mlstatic.com/D_751939-MLA46221843872_052021-N.jpg"
              alt="aaa"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="size-7">
            <img
              src="https://http2.mlstatic.com/D_NQ_NP_949764-MLA46043438480_052021-O.webp"
              alt="aaa"
              className="h-full w-full object-cover"
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
