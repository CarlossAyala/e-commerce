import { Link } from "react-router-dom";
import placeholderImage from "@/assets/images/placeholder-image.jpg";
import { Skeleton } from "@/components";
import { categoryActionRoutes } from "../features/categories";

export const CategoryCard = ({ category }) => {
  const image = category.gallery.length
    ? category.gallery[0].url
    : placeholderImage;

  return (
    <Link to={categoryActionRoutes.details(category.id)} className="relative">
      <article className="group w-full overflow-hidden rounded-md border">
        <div className="aspect-h-9 aspect-w-16">
          <img
            src={image}
            alt="Store image"
            className="size-full object-cover object-center"
          />
        </div>
        <div className="aspect-h-9 aspect-w-16 absolute inset-0 rounded-md bg-gradient-to-t from-primary"></div>
        <div className="absolute inset-x-2 bottom-2">
          <p className="line-clamp-1 text-left text-sm font-medium text-primary-foreground group-hover:line-clamp-none">
            {category.name}
          </p>
        </div>
      </article>
    </Link>
  );
};

CategoryCard.Skeleton = function CategoryItemSkeleton() {
  return <Skeleton className="aspect-h-9 aspect-w-16 w-full" />;
};
