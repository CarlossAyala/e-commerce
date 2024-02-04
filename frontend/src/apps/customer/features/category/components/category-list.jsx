import { NavLink, useParams } from "react-router-dom";
import clsx from "clsx";
import { categoryActionRoutes } from "../utils";
import { EmptyPlaceholder, Skeleton } from "../../../../../components";
import { useGetListCategories } from "../queries";

export const CategoryList = () => {
  const { slug } = useParams();
  const { category, isLoading, isError, error } = useGetListCategories(slug);

  return (
    <>
      {isLoading ? (
        <CategoryList.Skeleton />
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <div key={category.id} className="space-y-2 px-4 lg:px-0">
          <NavLink
            to={categoryActionRoutes.details(category.slug)}
            className={({ isActive }) =>
              clsx(
                "text-lg font-semibold leading-tight hover:text-blue-600",
                isActive && "uppercase text-blue-600",
              )
            }
          >
            {category.name}
          </NavLink>
          <ol className="columns-2 space-y-1 sm:columns-3 md:columns-4">
            {category.children.map((child) => (
              <li key={child.id} className="text-sm text-muted-foreground">
                <NavLink
                  className={({ isActive }) =>
                    clsx(
                      "inline-block hover:text-blue-600",
                      isActive && "uppercase text-blue-600",
                    )
                  }
                  to={categoryActionRoutes.details(child.slug)}
                >
                  {child.name}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

CategoryList.Skeleton = function CategoryListSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-28" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
