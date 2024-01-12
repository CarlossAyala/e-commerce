import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { splitFloat } from "../utils";
import { Skeleton } from "./ui/skeleton";
import { cn } from "../libs/utils";

const sizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

const STARS = [1, 2, 3, 4, 5];
const Star = ({ rate, star, size }) => {
  const [int, float] = splitFloat(rate);

  let width;
  if (rate >= star) width = "100%";
  else if (rate < star && int === star - 1) width = `${float * 100}%`;
  else width = "0%";

  return (
    <div className={`relative ${sizes[size]}`}>
      <StarOutline className={`${sizes[size]} absolute text-indigo-500`} />
      <div className="absolute overflow-hidden" style={{ width }}>
        <StarSolid className={`${sizes[size]} text-indigo-500`} />
      </div>
    </div>
  );
};

export const ReviewStar = ({ rating = 0, size = "sm", className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      {STARS.map((star) => (
        <Star key={star} rate={rating} star={star} size={size} />
      ))}
    </div>
  );
};

ReviewStar.Skeleton = function ReviewStarSkeleton() {
  return <Skeleton className="h-6 w-20" />;
};
