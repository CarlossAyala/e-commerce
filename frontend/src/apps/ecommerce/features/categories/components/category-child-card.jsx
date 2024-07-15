import { Link } from "react-router-dom";
import placeholder from "@/assets/images/placeholder-image.jpg";
import { categoryActionRoutes } from "../utils";

export const CategoryChildCard = ({ category }) => {
  const image = category.gallery.length ? category.gallery[0].url : placeholder;

  return (
    <Link to={categoryActionRoutes.details(category.id)}>
      <div className="relative">
        <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md">
          <img
            src={image}
            alt={category.name}
            className="w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-md bg-gradient-to-t from-secondary-foreground" />
        <div className="absolute inset-x-2 bottom-1">
          <h3 className="line-clamp-1 text-sm font-medium leading-4 text-secondary tablet:text-base">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};
