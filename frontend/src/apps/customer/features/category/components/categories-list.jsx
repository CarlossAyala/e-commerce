import { Link } from "react-router-dom";
import { Skeleton } from "../../../../../components";
import { categoryActionRoutes } from "../utils";

export const CategoriesList = ({ category }) => {
  return (
    <div key={category.id} className="space-y-1">
      <Link
        to={categoryActionRoutes.details(category.slug)}
        className="text-lg font-medium leading-tight hover:text-blue-600"
      >
        {category.name}
      </Link>
      <ol className="columns-2 space-y-1 sm:columns-3 md:columns-4">
        {category.children.map((child) => (
          <li key={child.id} className="text-sm text-muted-foreground">
            <Link
              className="inline-block hover:text-blue-600"
              to={categoryActionRoutes.details(child.slug)}
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

CategoriesList.Skeleton = function CategoriesListSkeleton() {
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
