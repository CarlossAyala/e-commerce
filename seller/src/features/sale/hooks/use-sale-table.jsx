import { Link } from "react-router-dom";
import { ddMMYYFormatter } from "../../../utils/date";
import { priceFormatter } from "../../../utils/formatter";

const headers = [
  {
    key: "product",
    header: "PRODUCT",
  },
  {
    key: "qty",
    header: "QTY",
  },
  {
    key: "price",
    header: "PRICE",
  },
  {
    key: "amount",
    header: "AMOUNT",
  },
  {
    key: "date",
    header: "DATE",
  },
  {
    key: "actions",
    header: "",
  },
];

const useSaleTable = (data) => {
  const rows = data.map(
    ({ id, orderId, product, quantity, price, createdAt }) => ({
      id,
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
      qty: quantity,
      price: priceFormatter(price),
      amount: priceFormatter(quantity * price),
      date: ddMMYYFormatter(createdAt),
      actions: (
        <Link to={`/sale/${orderId}/view#${id}`} target="_blank">
          <p className="text-sm leading-tight text-blue-600">View</p>
        </Link>
      ),
    })
  );

  return { headers, rows };
};

export default useSaleTable;
