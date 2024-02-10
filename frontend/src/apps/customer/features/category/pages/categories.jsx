import { EmptyPlaceholder } from "../../../../../components";
import { useGetFullCategories } from "../queries";
import { CategoriesList } from "../components/categories-list";
import { useDocumentTitle } from "../../../../../hooks";

export const Categories = () => {
  useDocumentTitle("Categories");

  const { categories, isLoading, isError, hasContent, error } =
    useGetFullCategories();

  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        <p className="text-sm text-muted-foreground">
          Especially designed for you to find the best products for your needs.
        </p>
      </section>

      <section className="space-y-4">
        {isLoading ? (
          <CategoriesList.Skeleton />
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : !hasContent ? (
          <EmptyPlaceholder
            title="No results"
            description="No categories found"
          />
        ) : (
          categories.map((category) => (
            <CategoriesList key={category.id} category={category} />
          ))
        )}
      </section>
    </main>
  );
};
