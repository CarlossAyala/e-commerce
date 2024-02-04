import { Filters } from "../../../../../components";
import { StoresList } from "../components/stores-list";

const filters = [
  {
    filter_type: "search",
  },
];

export const Stores = () => {
  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-2">
        <h2 className="text-2xl font-semibold tracking-tight">Stores</h2>
        <p className="text-sm text-muted-foreground">
          Your favorite brands are already on Fake-Commerce.
        </p>
      </section>

      <Filters filters={filters} />

      <StoresList />
    </main>
  );
};
