import { ProductCard, StoreCard } from "../apps/customer/components";
import { cn } from "../libs/utils";
import { Slider } from "./slider";

const SLIDER_TYPES = {
  product: {
    containerClassName:
      "grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4",
    itemWidth: 144,
    renderSlide: (product, index) => (
      <ProductCard key={index} product={product} />
    ),
  },
  store: {
    containerClassName:
      "grid grid-cols-[repeat(auto-fill,minmax(128px,1fr))] gap-4",
    itemWidth: 128,
    renderSlide: (store, index) => <StoreCard key={index} store={store} />,
  },
};

/**
 * My custom slider xd
 * @param {Object} props
 * @param {Array} props.items
 * @param {String} props.title
 * @param {Boolean} props.isLoading
 * @param {Boolean} props.isError
 * @param {("product"|"store")} props.type
 */
export const SliderComponent = ({
  items,
  title,
  isLoading,
  isError,
  type,
  className,
}) => {
  const config = SLIDER_TYPES[type];

  return (
    <section className={cn(className)}>
      {title && <h2 className="mb-2 text-xl font-semibold">{title}</h2>}

      {isLoading ? (
        <Slider.Skeleton {...config} />
      ) : isError ? (
        <Slider.Error />
      ) : (
        <Slider items={items} {...config} />
      )}
    </section>
  );
};
