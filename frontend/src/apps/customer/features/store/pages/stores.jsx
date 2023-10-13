import { MainContent, Separator } from "../../../../../components";
import { StoresDisplay } from "../components/stores-display";
import { StoresFilters } from "../components/stores-filters";

const Stores = () => {
  return (
    <MainContent className="max-w-6xl space-y-6">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">Stores</h2>
        <p className="leading-tight text-muted-foreground">
          Your favorite brands are already on Fake-Commerce.
        </p>
      </section>

      <Separator />

      <section className="flex gap-10">
        <StoresFilters className="hidden w-full max-w-[240px] shrink-0 sm:block" />
        <StoresDisplay className="grow" />
      </section>
    </MainContent>
  );
};

export default Stores;
