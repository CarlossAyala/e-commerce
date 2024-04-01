import { Filters } from "@/components";
import { StoreProducts } from "../components/store-products";
import { StoreProfile } from "../components/store-profile";

const filters = [
  {
    filter_type: "search",
  },
];

export const Store = () => {
  return (
    <main className="container flex-1 space-y-4">
      <StoreProfile />

      <Filters filters={filters} />

      <StoreProducts />
    </main>
  );
};
