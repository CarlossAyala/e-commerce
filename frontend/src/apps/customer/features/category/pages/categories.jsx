import { EmptyPlaceholder } from "../../../../../components";
import { useGetFullCategories } from "../queries";
import { CategoriesDisplay } from "../components/categories-display";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetFullCategories();

  const hasContent = isSuccess && categories.length > 0;
  const isEmpty = isSuccess && categories.length === 0;

  return (
    <main className="container max-w-6xl space-y-6">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Categories
        </h2>
        <p className="text-muted-foreground">
          Especially designed for you to find the best products for your needs.
        </p>
      </section>

      <section className="space-y-10">
        {isLoading && (
          <>
            <CategoriesDisplay.Skeleton />
            <CategoriesDisplay.Skeleton />
            <CategoriesDisplay.Skeleton />
            <CategoriesDisplay.Skeleton />
          </>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching categories
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              {error.message}
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <p className="text-sm italic text-muted-foreground">
            No categories found.
          </p>
        )}
        {hasContent &&
          categories.map((category) => (
            <CategoriesDisplay key={category.id} category={category} />
          ))}
      </section>
    </main>
  );
};

export default Categories;
