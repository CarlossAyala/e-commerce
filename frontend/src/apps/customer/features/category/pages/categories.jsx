import { useDocumentTitle } from "@/shared/hooks";
import { CategoriesList } from "../components/categories-list";
import { EmptyPlaceholder, Filters } from "@/components";
import { useGetFullCategories } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const Categories = () => {
  useDocumentTitle("Categories");

  const { data, isLoading, isError, error } = useGetFullCategories();

  const isEmpty = data?.length === 0;

  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        <p className="text-sm text-muted-foreground">
          Especially designed for you to find the best products for your needs.
        </p>
      </section>

      <Filters filters={filters} />

      {isLoading ? (
        <CategoriesList.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : isEmpty ? (
        <EmptyPlaceholder
          title="No results"
          description="No categories found"
        />
      ) : (
        data.map((category) => (
          <CategoriesList key={category.id} category={category} />
        ))
      )}
    </main>
  );
};
