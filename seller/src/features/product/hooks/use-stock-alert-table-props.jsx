import clsx from "clsx";
import { Link } from "react-router-dom";
import { priceFormatter } from "../../../utils/formatter";

const headers = [
  {
    key: "product",
    header: "Product",
  },
  {
    key: "stock",
    header: "Stock",
  },
  {
    key: "stockAlert",
    header: "Stock Alert",
  },
  {
    key: "price",
    header: "Price",
  },
  {
    key: "status",
    header: "Status",
  },
];

const useStockAlertTableProps = (data) => {
  const rows = data?.rows
    ? data.rows.map(({ id, name, stock, stockAlert, price, available }) => ({
        id,
        product: (
          <Link to={`/product/${id}/view`}>
            <div className="flex items-center gap-x-1 w-44">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                <img
                  className="h-full w-full object-cover"
                  src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                  alt={name}
                />
              </div>
              <div className="grow">
                <p className="line-clamp-1 text-sm leading-tight text-blue-600">
                  {name}
                </p>
              </div>
            </div>
          </Link>
        ),
        stock,
        stockAlert,
        price: priceFormatter(price),
        status: (
          <span
            className={clsx(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize leading-tight",
              available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {available ? "Available" : "Unavailable"}
          </span>
        ),
      }))
    : [];

  const count = data?.count ? data.count : 0;

  return { rows, headers, count };
};

export default useStockAlertTableProps;
