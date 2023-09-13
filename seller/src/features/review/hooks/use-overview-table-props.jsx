import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ratingFormatter } from "../../../utils/formatter";
import { splitFloat } from "../../../utils/number";

const headers = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "score",
    header: "Score",
  },
  {
    key: "total",
    header: "Total",
  },
  {
    key: "actions",
    header: "",
  },
];

const AverageRating = ({ rating, index }) => {
  const [int, float] = splitFloat(rating);

  let width;
  if (rating >= index) width = "100%";
  else if (rating < index && int === index - 1) width = `${float * 100}%`;
  else width = "0%";

  return (
    <div className="relative h-4 w-4">
      <StarOutline className="absolute h-4 w-4 text-indigo-500" />
      <div className="absolute overflow-hidden" style={{ width }}>
        <StarSolid className="h-4 w-4 text-indigo-500" />
      </div>
    </div>
  );
};

const useOverviewTableProps = (data) => {
  const rows = data.map(({ product, rating, count }) => ({
    id: product.id,
    product: (
      <Link to={`/product/${product.id}/view`}>
        <div className="flex items-center gap-x-1 w-44">
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
    score: (
      <div>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <AverageRating rating={rating} index={++index} key={index} />
          ))}
        </div>
        <p className="text-base leading-tight text-gray-600">
          {ratingFormatter(rating)}
        </p>
      </div>
    ),
    total: count,
    actions: (
      <Link to={`/review/${product.id}/list`} target="_blank">
        <p className="text-sm leading-tight text-blue-600">View</p>
      </Link>
    ),
  }));

  return { rows, headers };
};

export default useOverviewTableProps;
