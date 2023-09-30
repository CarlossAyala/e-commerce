import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { splitFloat } from "../utils";
import { Skeleton } from "./ui/skeleton";

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

const gaps = {
  xs: "gap-x-px",
  sm: "gap-x-2",
  md: "gap-x-3",
  lg: "gap-x-4",
  xl: "gap-x-5",
};

export const ReviewStar = ({ rating = 0, size = "xs" }) => {
  return (
    <div className={`flex items-center ${gaps[size]}`}>
      {STARS.map((star) => (
        <Star key={star} rate={rating} star={star} size={size} />
      ))}
    </div>
  );
};

ReviewStar.Skeleton = function ReviewStarSkeleton() {
  return <Skeleton className="h-6 w-20" />;
};

ReviewStar.Error = function ReviewStarError() {
  return (
    <div>
      <p className="text-sm leading-tight text-muted-foreground">
        Error loading review stats.
      </p>
    </div>
  );
};
