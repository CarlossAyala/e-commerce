import { UpdateForm } from "../components/update-form";
import { DeleteForm } from "../components/delete-form";

export const Store = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">Store</h2>

      <UpdateForm />
      <DeleteForm />
    </main>
  );
};
