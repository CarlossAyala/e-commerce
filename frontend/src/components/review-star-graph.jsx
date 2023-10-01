import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

export const ReviewStarGraph = ({ ratings }) => {
  return (
    <ol className="w-full space-y-1">
      {ratings.map((rating) => (
        <li key={rating.rating} className="flex items-center gap-x-2">
          <div className="relative h-1.5 w-full grow rounded-r-full">
            <span className="absolute left-0 top-0 h-1.5 w-full rounded-r-full bg-black/20"></span>
            <span
              style={{
                width: rating.percentage + "%",
              }}
              className="absolute left-0 top-0 h-1.5 rounded-r-full bg-indigo-500"
            />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-sm leading-none text-gray-500">
              {rating.rating}
            </span>
            <StarSolid className="h-4 w-4 text-gray-300" />
          </div>
        </li>
      ))}
    </ol>
  );
};
