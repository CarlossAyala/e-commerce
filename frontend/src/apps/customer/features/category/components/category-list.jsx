import { NavLink } from "react-router-dom";
import { categoryActionRoutes } from "../utils";
import { Skeleton } from "../../../../../components";
import clsx from "clsx";

export const CategoryList = ({ category }) => {
  return (
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
  );
};

CategoryList.Skeleton = function CategoryListSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-28" />
      <div className="columns-2 space-y-1 sm:columns-3 md:columns-4">
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-xs" />
      </div>
    </div>
  );
};
