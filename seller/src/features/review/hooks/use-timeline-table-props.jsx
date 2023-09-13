import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ddMMYYFormatter } from "../../../utils/date";

const headers = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "review",
    header: "Review",
  },
  {
    key: "reactions",
    header: "Reactions",
  },
  {
    key: "date",
    header: "Date",
  },
];

const STARS = 5;
const ReviewStars = ({ rating }) => {
  return (
    <div>
      <ol className="flex items-center gap-x-px">
        {[...Array(STARS)].map((_, index) => (
          <li key={index} className="relative h-4 w-4">
            <StarOutline className="absolute h-4 w-4 text-indigo-500" />
            <div
              className="absolute overflow-hidden"
              style={{
                width: rating >= index + 1 ? "100%" : "0%",
              }}
            >
              <StarSolid className="h-4 w-4 text-indigo-500" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const useTimelineTableProps = (data) => {
  const rows = data.map(
    ({ id, product, description, rating, like, dislike, updatedAt }) => ({
      id,
      product: (
        <Link to={`/product/${product.id}/view`}>
          <div className="flex items-center gap-x-1 w-32">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                alt={product.name}
              />
            </div>
            <div className="grow">
              <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                {product.name}
              </p>
            </div>
          </div>
        </Link>
      ),
      review: (
        <div className="w-48">
          <ReviewStars rating={rating} />
          <p className="text-sm mt-1 leading-tight text-gray-600">
            {description}
          </p>
        </div>
      ),
      reactions: (
        <div className="flex items-center gap-x-4">
          <div className="flex items-center">
            <HandThumbUpIcon className="h-5 w-5 text-gray-800" />
            <span className="ml-1 leading-tight tabular-nums">{like}</span>
          </div>
          <div className="flex items-center">
            <HandThumbDownIcon className="h-5 w-5 text-gray-800" />
            <span className="ml-1 leading-tight tabular-nums">{dislike}</span>
          </div>
        </div>
      ),
      date: ddMMYYFormatter(updatedAt),
    })
  );

  return { headers, rows };
};

export default useTimelineTableProps;
