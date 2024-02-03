import { StoresFilter } from "../components/stores-filter";
import { StoresList } from "../components/stores-list";

export const Stores = () => {
  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-2">
        <h2 className="text-2xl font-semibold tracking-tight">Stores</h2>
        <p className="text-sm text-muted-foreground">
          Your favorite brands are already on Fake-Commerce.
        </p>
      </section>

      <StoresFilter />

      <StoresList />
    </main>
  );
};
