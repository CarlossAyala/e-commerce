import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { Button, EmptyPlaceholder } from "../../../../../components";
import { useGetMixCategories } from "../queries";
import { categoryActionRoutes } from "../utils";
import { FormDetachCategory } from "../components/form-detach-category";
import { Link } from "react-router-dom";

export const DetachCategory = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetMixCategories("");

  const hasCategories = isSuccess && categories.length > 0;
  const isEmpty = isSuccess && categories.length === 0;

  return (
    <main className="space-y-4 p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">
          Detach Category
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Control your categories.
        </p>
      </section>

      {isLoading && <FormDetachCategory.Skeleton />}
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
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
          <EmptyPlaceholder.Title>No categories found.</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You have not created any categories yet. Start creating one.
          </EmptyPlaceholder.Description>
          <Button type="button" asChild>
            <Link to={categoryActionRoutes.new}>Add categories</Link>
          </Button>
        </EmptyPlaceholder>
      )}

      {hasCategories && <FormDetachCategory categories={categories} />}
    </main>
  );
};
