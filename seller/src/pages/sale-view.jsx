import { Link, useLocation, useParams } from "react-router-dom";
import {
  CodeSnippet,
  DataTableSkeleton,
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import clsx from "clsx";
import { useGetSale } from "../features/sale";
import { dateFullFormatter } from "../utils/date";
import { priceFormatter } from "../utils/formatter";

const headerItems = [
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
];

const SaleView = () => {
  const { id: orderId } = useParams();
  const location = useLocation();

  const sale = useGetSale(orderId);

  console.log("Sale", sale);

  const rowsItems = sale.data?.items.map(
    ({ id, product, quantity, price }) => ({
      id,
      product: (
        <Link to={`/product/${product.id}/view`}>
          <div className="flex items-center gap-x-1">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src="https://http2.mlstatic.com/D_NQ_NP_904598-MLU69493154879_052023-O.webp"
                alt={product.name}
              />
            </div>
            <div className="grow">
              <p
                className={clsx(
                  "line-clamp-1 leading-tight",
                  location.hash === `#${id}`
                    ? "font-bold text-indigo-600"
                    : "text-sm text-blue-600"
                )}
              >
                {product.name}
              </p>
            </div>
          </div>
        </Link>
      ),
      qty: (
        <div>
          <p
            className={clsx(
              location.hash === `#${id}` && "font-bold text-indigo-600"
            )}
          >
            {quantity}
          </p>
        </div>
      ),
      price: (
        <div>
          <p
            className={clsx(
              location.hash === `#${id}` && "font-bold text-indigo-600"
            )}
          >
            {priceFormatter(price)}
          </p>
        </div>
      ),
      amount: (
        <div>
          <p
            className={clsx(
              location.hash === `#${id}` && "font-bold text-indigo-600"
            )}
          >
            {priceFormatter(quantity * price)}
          </p>
        </div>
      ),
    })
  );

  const total = sale.data?.items.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 pt-2">
        <h1 className="text-base font-semibold uppercase leading-6 text-gray-900">
          Sale information
        </h1>
      </section>

      <section className="my-4 space-y-8 px-4">
        {sale.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {sale.isSuccess && (
              <>
                <div>
                  <h2 className="text-sm font-semibold leading-6 text-gray-900">
                    Order details
                  </h2>
                  <p className="text-sm text-gray-600">
                    This section shows the information of this order.
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-y-3">
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        ID
                      </dt>
                      <dd className="mt-1 text-sm leading-tight text-gray-900">
                        <CodeSnippet
                          type="inline"
                          feedback="Copied to clipboard"
                          copyText={sale.data.id}
                        >
                          {sale.data.id}
                        </CodeSnippet>
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Status
                      </dt>
                      <dd className="text-sm capitalize leading-tight text-gray-900">
                        {sale.data.status}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Ordered
                      </dt>
                      <dd className="text-sm capitalize leading-tight text-gray-900">
                        {dateFullFormatter(sale.data.orderedAt)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-sm font-semibold leading-6 text-gray-900">
                    Customer details
                  </h2>
                  <p className="text-sm text-gray-600">
                    This section shows the information of the customer.
                  </p>
                  <dl className="mt-2 grid grid-cols-2 gap-y-3">
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Full name
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.customer.name} {sale.data.customer.lastName}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Email
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.customer.email}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-sm font-semibold leading-6 text-gray-900">
                    Receiver details
                  </h2>
                  <p className="text-sm text-gray-600">
                    This section shows the information of the receiver.
                  </p>
                  <dl className="mt-2 space-y-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Full name
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.receiverName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Phone
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.receiverPhone}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h2 className="text-sm font-semibold leading-6 text-gray-900">
                    Shipping details
                  </h2>
                  <p className="text-sm text-gray-600">
                    This section shows the information of the shipping.
                  </p>
                  <dl className="mt-2 grid grid-cols-3 gap-y-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Province
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.province}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Zip code
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.zipCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        City
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.city}
                      </dd>
                    </div>
                    <div className="col-span-3">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Street
                      </dt>
                      <dd className="text-sm leading-tight text-gray-900">
                        {sale.data.street}
                      </dd>
                    </div>
                    <div className="col-span-3">
                      <dt className="text-xs font-semibold uppercase leading-snug text-gray-900">
                        Indications
                      </dt>
                      <dd
                        className={clsx(
                          "text-sm leading-tight text-gray-900",
                          !sale.data.indication && "italic"
                        )}
                      >
                        {sale.data.indication ? sale.data.indication : "None"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <DataTable
                    rows={rowsItems}
                    headers={headerItems}
                    render={({ rows, headers }) => (
                      <TableContainer
                        title="Table products"
                        description="List of products and their details"
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              {headers.map((header) => (
                                <TableHeader id={header.key} key={header.key}>
                                  {header.header}
                                </TableHeader>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                {row.cells.map((cell) => (
                                  <TableCell key={cell.id}>
                                    {cell.value}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                          <TableHead>
                            <TableRow>
                              <TableHeader colSpan={3}>SUMMARY</TableHeader>
                              <TableHeader colSpan={1}></TableHeader>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={3}>Total</TableCell>
                              <TableCell colSpan={1}>
                                <div>
                                  <p className="text-sm font-semibold leading-tight text-gray-900">
                                    {priceFormatter(total)}
                                  </p>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    )}
                  />
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default SaleView;
