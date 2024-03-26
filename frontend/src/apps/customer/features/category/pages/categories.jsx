import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  EmptyState,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Filters } from "@/components";
import { CategoriesList } from "../components/categories-list";
import { useGetFullCategories } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

// TODO: What to do about SINGLE Categories
// TODO: Add Categories images in card
export const Categories = () => {
  const [params] = useSearchParams();
  useDocumentTitle("Categories");

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetFullCategories();

  const search = params.get("q") || "";

  const filter = categories?.filter((category) => {
    const children = category.children.some((child) =>
      child.name.toLowerCase().includes(search.toLowerCase()),
    );
    const main = category.name.toLowerCase().includes(search.toLowerCase());

    return children || main;
  });

  const filtered = filter?.map((category) => {
    return {
      ...category,
      children: category.children.filter((child) =>
        child.name.toLowerCase().includes(search.toLowerCase()),
      ),
    };
  });

  return (
    <main className="container flex-1 space-y-6">
      <PageHeader>
        <PageHeaderHeading>Categories</PageHeaderHeading>
        <PageHeaderDescription>
          Especially designed for you to find the best products for your needs.
        </PageHeaderDescription>
      </PageHeader>

      <Filters filters={filters} />

      {isLoading ? (
        <CategoriesList.Skeleton />
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : !categories.length ? (
        <EmptyState title="No results" description="No categories found" />
      ) : !filtered.length ? (
        <EmptyState
          title="No results"
          description={`No categories match "${search}"`}
        />
      ) : (
        filtered.map((category) => (
          <CategoriesList key={category.id} category={category} />
        ))
      )}
    </main>
  );
};
