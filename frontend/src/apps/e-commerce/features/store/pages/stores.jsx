import { useDocumentTitle } from "@/shared/hooks";
import { Filters } from "@/components";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { StoresList } from "../components/stores-list";

const filters = [
  {
    filter_type: "search",
  },
];

export const Stores = () => {
  useDocumentTitle("Stores");

  return (
    <main className="container flex-1 space-y-4">
      <PageHeader>
        <PageHeaderHeading>Stores</PageHeaderHeading>
        <PageHeaderDescription>
          Your favorite brands are already on Fake-Commerce.
        </PageHeaderDescription>
      </PageHeader>

      <Filters filters={filters} />

      <StoresList />
    </main>
  );
};
