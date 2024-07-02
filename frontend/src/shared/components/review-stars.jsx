import { StarIcon } from "@heroicons/react/24/solid";
import { cn } from "../utils";

const SIZES_STARS = {
  xs: "size-2",
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
  xl: "size-6",
};

export const ReviewStars = ({ rating, className, size = "md" }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = SIZES_STARS[size];

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {new Array(fullStars).fill(0).map((_, index) => (
        <StarIcon
          key={index}
          className={cn("shrink-0 text-primary", sizeClass)}
        />
      ))}
      {hasHalfStar && (
        <div className={cn("relative", sizeClass)}>
          <StarIcon className="absolute inset-0 size-full text-gray-300" />
          <div
            className="absolute inset-0 size-full overflow-hidden"
            style={{
              width: `${(rating % 1) * 100}%`,
            }}
          >
            <StarIcon className={cn("text-primary", sizeClass)} />
          </div>
        </div>
      )}
      {new Array(emptyStars).fill(0).map((_, index) => (
        <StarIcon
          key={index}
          className={cn("shrink-0 text-muted", sizeClass)}
        />
      ))}
    </div>
  );
};
