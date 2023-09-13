import clsx from "clsx";
import { Link } from "react-router-dom";

const headers = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "total",
    header: "Total",
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "actions",
    header: "",
  },
];

const useQuestionTableProps = (data) => {
  const rows = data?.rows
    ? data.rows.map(({ product, count }) => ({
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
        total: count,
        status: (
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize leading-tight",
              product.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {product.available ? "Available" : "Unavailable"}
          </span>
        ),
        actions: (
          <Link to={`/question/${product.id}/list`} target="_blank">
            <p className="text-sm leading-tight text-blue-600">View</p>
          </Link>
        ),
      }))
    : [];

  const count = data?.count ? data.count : 0;

  return { headers, rows, count };
};

export default useQuestionTableProps;
