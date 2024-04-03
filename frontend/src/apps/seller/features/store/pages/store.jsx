import { PageHeader, PageHeaderHeading } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import { Separator } from "@/components";
import { UpdateForm } from "../components/update-form";
import { DeleteForm } from "../components/delete-form";

export const Store = () => {
  useDocumentTitle("Store");
  return (
    <main className="flex-1 space-y-6 pb-10">
      <PageHeader className="px-6">
        <PageHeaderHeading>Store</PageHeaderHeading>
      </PageHeader>

      <UpdateForm />

      <Separator />

      <DeleteForm />
    </main>
  );
};
