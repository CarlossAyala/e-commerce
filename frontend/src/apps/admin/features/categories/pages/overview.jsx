import { Link, useSearchParams } from "react-router-dom";
import { EmptyPlaceholder, Filters, Skeleton } from "@/components";
import { categoryActionRoutes, CATEGORY_TYPES } from "../utils";
import { useGetCategories } from "../queries";

const { MAIN, SINGLE } = CATEGORY_TYPES;
const filters = [
  {
    filter_type: "search",
  },
];

export const Overview = () => {
  const [params] = useSearchParams();
  const { data: categories, isLoading, isError, error } = useGetCategories();

  const param = params.get("q") || "";

  const main = categories?.filter((category) => category.type === MAIN) ?? [];
  const single =
    categories?.filter((category) => category.type === SINGLE) ?? [];

  const filteredMain = main
    .filter((category) => {
      const parent = category.name.toLowerCase().includes(param.toLowerCase());
      const children = category.children.some((child) =>
        child.name.toLowerCase().includes(param.toLowerCase()),
      );

      return children || parent;
    })
    .map((category) => {
      return {
        ...category,
        children: category.children.filter((child) =>
          child.name.toLowerCase().includes(param.toLowerCase()),
        ),
      };
    });
  const filteredSingle = single.filter((category) =>
    category.name.toLowerCase().includes(param.toLowerCase()),
  );

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Categories Overview
      </h2>

      <Filters filters={filters} />

      <section className="space-y-4">
        {isLoading ? (
          <>
            <div className="space-y-2">
              <h3 className="font-semibold uppercase">Single Categories</h3>

              <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {new Array(12).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-4 w-full" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold uppercase">Main Categories</h3>

              <div className="space-y-8">
                {new Array(3).fill(0).map((_, parentIndex) => (
                  <div key={parentIndex} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      <Skeleton className="h-4" />
                    </div>

                    <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                      {new Array(12).fill(0).map((_, childrenIndex) => (
                        <li key={childrenIndex}>
                          <Skeleton className="h-4 w-full" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : isError ? (
          <EmptyPlaceholder title="Error" description={error.message} />
        ) : (
          <>
            <div>
              <h3 className="font-semibold uppercase">Single Categories</h3>

              {filteredSingle.length > 0 ? (
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredSingle.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={categoryActionRoutes.details(category.id)}
                        className="text-sm hover:text-blue-600"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : filteredSingle.length === 0 && param ? (
                <p className="text-sm text-muted-foreground">No results</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No single categories found.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold uppercase">Main Categories</h3>

              <div className="space-y-4">
                {filteredMain.length > 0 ? (
                  filteredMain.map((category) => (
                    <div key={category.id}>
                      <Link
                        key={category.id}
                        to={categoryActionRoutes.details(category.id)}
                        className="text-sm font-medium hover:text-blue-600"
                      >
                        {category.name}
                      </Link>
                      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {category.children.length > 0 ? (
                          category.children.map((children) => (
                            <li key={children.id}>
                              <Link
                                to={categoryActionRoutes.details(children.id)}
                                className="text-sm hover:text-blue-600"
                              >
                                {children.name}
                              </Link>
                            </li>
                          ))
                        ) : category.children.length === 0 && param ? (
                          <li>
                            <p className="text-sm text-muted-foreground">
                              No results for sub-categories
                            </p>
                          </li>
                        ) : (
                          <li>
                            <p className="text-sm text-muted-foreground">
                              No sub-categories found.
                            </p>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))
                ) : filteredMain.length === 0 && param ? (
                  <p className="text-sm text-muted-foreground">No results</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
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
