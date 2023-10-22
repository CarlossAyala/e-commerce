import { Link } from "react-router-dom";
import {
  Button,
  EmptyPlaceholder,
  Separator,
  Skeleton,
} from "../../../../../components";
import { categoryActionRoutes, categoryTypes } from "../utils";
import { useGetMixCategories } from "../queries";
import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";

export const CategoriesOverview = () => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetMixCategories();

  const singleCategories = categories?.filter((category) => {
    return category.type === categoryTypes.single;
  });
  const mainCategories = categories?.filter((category) => {
    return category.type === categoryTypes.main;
  });

  const hasCategories = isSuccess && categories.length > 0;
  const isEmpty = isSuccess && categories.length === 0;

  return (
    <main className="space-y-4 p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Categories Overview
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Categories in the E-Commerce.
        </p>
      </section>

      <Separator />

      <section className="space-y-4">
        {isLoading && (
          <>
            <section className="space-y-2">
              <Skeleton className="h-5 w-36" />

              <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(10)].map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </section>
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
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No categories found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              There are no categories yet. Start creating one.
            </EmptyPlaceholder.Description>
            <Button asChild type="button">
              <Link to={categoryActionRoutes.new}>Create</Link>
            </Button>
          </EmptyPlaceholder>
        )}
        {hasCategories && (
          <>
            <div className="space-y-1">
              <p className="text-base font-semibold">Single Categories</p>
              {singleCategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {singleCategories.map((_category) => (
                    <Link
                      key={_category.id}
                      to={categoryActionRoutes.details(_category.id)}
                      className="truncate text-xs hover:text-blue-600"
                    >
                      {_category.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  No single categories found.
                </p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold">Main Categories</p>
              <div className="space-y-6">
                {mainCategories.length > 0 ? (
                  mainCategories.map((_category) => (
                    <div key={_category.id} className="space-y-1">
                      <Link
                        key={_category.id}
                        to={categoryActionRoutes.details(_category.id)}
                        className="truncate text-sm font-medium hover:text-blue-600"
                      >
                        {_category.name}
                      </Link>

                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                        {_category.children.length > 0 ? (
                          _category.children.map((children) => (
                            <Link
                              key={children.id}
                              to={categoryActionRoutes.details(children.id)}
                              className="truncate text-xs hover:text-blue-600"
                            >
                              {children.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm italic text-muted-foreground">
                            No sub-categories found.
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    No main categories found.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};
