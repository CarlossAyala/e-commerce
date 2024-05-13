import { Link, useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState, PageHeader, PageHeaderHeading } from "@/shared/components";
import { Filters, Skeleton } from "@/components";
import { categoryActionRoutes } from "../utils";
import { useGetCategories } from "../queries";

const filters = [
  {
    filter_type: "search",
  },
];

export const Overview = () => {
  useDocumentTitle("Categories Overview");
  const [params] = useSearchParams();

  const { data: categories, isLoading, isError, error } = useGetCategories();

  const search = params.get("q") || "";

  const main = categories?.filter((category) => !category.parentId);
  const filteredMain = main
    ?.filter((category) => {
      const parent = category.name.toLowerCase().includes(search.toLowerCase());
      const children = category.children.some((child) => {
        return child.name.toLowerCase().includes(search.toLowerCase());
      });

      return children || parent;
    })
    .map((category) => {
      return {
        ...category,
        children: category.children.filter((child) =>
          child.name.toLowerCase().includes(search.toLowerCase()),
        ),
      };
    });

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <PageHeader>
        <PageHeaderHeading>Categories Overview</PageHeaderHeading>
      </PageHeader>

      <Filters filters={filters} />

      <section className="space-y-4">
        {isLoading ? (
          <div className="space-y-8">
            {new Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />

                <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {new Array(12).fill(0).map((_, ii) => (
                    <li key={ii}>
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : (
          <div className="space-y-4">
            {filteredMain.length ? (
              filteredMain.map((category) => (
                <div key={category.id}>
                  <Link
                    key={category.id}
                    to={categoryActionRoutes.details(category.id)}
                    className="text-sm font-medium hover:text-blue-600"
                  >
                    {category.name}
                  </Link>

                  {category.children.length ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {category.children.map((children) => (
                        <li key={children.id}>
                          <Link
                            to={categoryActionRoutes.details(children.id)}
                            className="text-sm hover:text-blue-600"
                          >
                            {children.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : !category.children.length && search ? (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        No results for sub-categories
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        No sub-categories found.
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : !main.length ? (
              <div>
                <p className="text-sm text-muted-foreground">
                  No main categories.
                </p>
              </div>
            ) : !filteredMain.length && search ? (
              <div>
                <p className="text-sm text-muted-foreground">No results</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">
                  No main categories.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};
