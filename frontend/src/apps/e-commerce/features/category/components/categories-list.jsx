import { Link } from "react-router-dom";
import { Skeleton } from "@/components";
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
      {!category.children.length ? (
        <div>
          <p className="text-sm text-muted-foreground">No sub-categories</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

CategoriesList.Skeleton = function CategoriesListSkeleton() {
  return new Array(3).fill(0).map((_, i_index) => (
    <div key={i_index} className="space-y-4">
      <Skeleton className="h-5 w-24" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:grid-cols-4">
        {new Array(4).fill(0).map((_, ii_index) => (
          <div key={ii_index} className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  ));
};
