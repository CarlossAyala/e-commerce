import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { Skeleton } from "@/components";
import { categoryActionRoutes } from "../utils";
import { CategoryChildCard } from "./category-child-card";

export const CategoriesList = ({ category }) => {
  const image = category.gallery.length ? category.gallery[0].url : placeholder;

  return (
    <div key={category.id} className="space-y-4">
      <Link to={categoryActionRoutes.details(category.id)}>
        <div className="relative">
          <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14">
            <img
              src={image}
              alt={category.name}
              className="w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-md bg-gradient-to-t from-foreground"></div>
          <div className="absolute inset-x-2 bottom-2">
            <h3 className="line-clamp-1 font-semibold uppercase leading-4 text-primary-foreground tablet:text-xl">
              {category.name}
            </h3>
          </div>
        </div>
      </Link>

      {category.children.length ? (
        <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {category.children.map((child) => (
            <li key={child.id}>
              <CategoryChildCard category={child} />
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
};

CategoriesList.Skeleton = function CategoriesListSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-h-9 aspect-w-16 sm:aspect-h-4 sm:aspect-w-10 lg:aspect-h-4 lg:aspect-w-14" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <Skeleton className="aspect-h-9 aspect-w-16" />
      </div>
    </div>
  );
};
