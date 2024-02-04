import { Filters } from "../../../../../components";
import { StoreProducts } from "../components/store-products";
import { StoreProfile } from "../components/store-profile";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "group",
    headline: "Price",
    groups: [
      {
        filter_type: "input",
        type: "number",
        name: "price_min",
        label: "Min",
        placeholder: "$",
      },
      {
        filter_type: "input",
        type: "number",
        name: "price_max",
        label: "Max",
        placeholder: "$",
      },
    ],
  },
];

export const Store = () => {
  return (
    <main className="flex-1 space-y-4 lg:container">
      <StoreProfile />

      <Filters className="px-4 lg:px-0" filters={filters} />

      <StoreProducts />
    </main>
  );
};
