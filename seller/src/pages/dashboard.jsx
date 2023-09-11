import { Renew } from "@carbon/icons-react";
import {
  Button,
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useGetProducts, useStockAlert } from "../features/product";
import { useGetQAAll } from "../features/qa";
import { useGetReviewTimeline } from "../features/review";
import { useGetSales } from "../features/sale";
import { useGetStoreStats } from "../features/store";
import { StatContainer, StatItem } from "../features/ui/";
import { ddMMYYFormatter } from "../utils/date";
import { priceFormatter } from "../utils/formatter";

const REVIEW_STARS = 5;
const ReviewStars = ({ rating }) => {
  return (
    <div>
      <ol className="flex items-center gap-x-px">
        {[...Array(REVIEW_STARS)].map((_, index) => (
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

const saleHeaders = [
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
const stockAlertHeaders = [
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
const questionHeaders = [
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
const reviewHeaders = [
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
const productHeaders = [
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
    key: "sold",
    header: "Sold",
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

const Dashboard = () => {
  const stats = useGetStoreStats();
  const sales = useGetSales();
  const stockAlert = useStockAlert();
  const questions = useGetQAAll();
  const reviews = useGetReviewTimeline();
  const products = useGetProducts("sortby=latest");
  console.log("Products", products);

  return (
    <main className="flex w-full flex-col overflow-auto space-y-10">
      <section className="px-4 pt-3">
        {stats.isLoading ? (
          <p>Loading stats...</p>
        ) : (
          <>
            {stats.isSuccess && (
              <>
                <div>
                  <h1 className="text-2xl mb-2 leading-tight font-medium text-neutral-800">
                    Dashboard
                  </h1>
                  <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Last 30 days
                  </h2>
                  <p className="text-sm text-gray-600">
                    Key information about your business performance.
                  </p>
                </div>
                <StatContainer>
                  <StatItem
                    title="Revenue"
                    value={priceFormatter(stats.data.revenue)}
                    to="/sale/list"
                  />
                  <StatItem
                    title="Sold"
                    value={stats.data.sold}
                    to="/sale/list"
                  />
                  <StatItem
                    title="Stock alert"
                    value={stats.data.stockAlert}
                    to="/product/list?stockAlert=true"
                  />
                  <StatItem
                    title="Questions"
                    value={stats.data.questions}
                    to="/product/question/all"
                  />
                </StatContainer>
              </>
            )}
            {stats.isError && <p>Stats error: {stats.error.message}</p>}
          </>
        )}
      </section>

      <section className="px-4">
        {sales.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {sales.isSuccess && sales.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Sales"
                  description="List of sales and their details"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No sales found
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has bought anything.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={sales.isLoading}
                      onClick={() => sales.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/sale/list" className="">
                      Go to Sales
                    </Link>
                  </div>
                </div>
              </>
            )}

            {sales.isSuccess && sales.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Sales
                    </h2>
                    <Link to="/sale/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    The latest sales and their details.
                  </p>
                </div>
                <DataTable
                  rows={sales.data.rows.map(
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
                        <Link
                          to={`/sale/${orderId}/view#${id}`}
                          target="_blank"
                        >
                          <p className="text-sm leading-tight text-blue-600">
                            View
                          </p>
                        </Link>
                      ),
                    })
                  )}
                  headers={saleHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
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
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {stockAlert.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {stockAlert.isSuccess && stockAlert.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Sales"
                  description="List of sales and their details"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No stock alert
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that there are no products with low stock.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={stockAlert.isLoading}
                      onClick={() => stockAlert.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/stock-alert" className="">
                      Go to stock alert
                    </Link>
                  </div>
                </div>
              </>
            )}

            {stockAlert.isSuccess && stockAlert.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Stock alert
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of products with low stock.
                  </p>
                </div>
                <DataTable
                  rows={stockAlert.data.rows.map(
                    ({ id, name, stock, stockAlert, price, available }) => ({
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
                    })
                  )}
                  headers={stockAlertHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
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
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {questions.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {questions.isSuccess && questions.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Questions"
                  description="List of questions and their total without answers."
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No questions found
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has asked any questions yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={questions.isLoading}
                      onClick={() => questions.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/question/all" className="">
                      Go to questions
                    </Link>
                  </div>
                </div>
              </>
            )}

            {questions.isSuccess && questions.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Questions
                    </h2>
                    <Link to="/product/question/all">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of questions and their total without answers.
                  </p>
                </div>
                <DataTable
                  rows={questions.data.rows.map(({ product, count }) => ({
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
                      <Link
                        to={`/product/${product.id}/question/list`}
                        target="_blank"
                      >
                        <p className="text-sm leading-tight text-blue-600">
                          View
                        </p>
                      </Link>
                    ),
                  }))}
                  headers={questionHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
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
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {reviews.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {reviews.isSuccess && reviews.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Reviews"
                  description="Latest reviews about your products"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No reviews yet
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems that no one has reviewed any of your products yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={reviews.isLoading}
                      onClick={() => reviews.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/review/list">Go to reviews</Link>
                  </div>
                </div>
              </>
            )}

            {reviews.isSuccess && reviews.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Reviews
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    Latest reviews about your products
                  </p>
                </div>
                <DataTable
                  rows={reviews.data.rows.map(
                    ({
                      id,
                      product,
                      description,
                      rating,
                      like,
                      dislike,
                      updatedAt,
                    }) => ({
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
                            <span className="ml-1 leading-tight tabular-nums">
                              {like}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <HandThumbDownIcon className="h-5 w-5 text-gray-800" />
                            <span className="ml-1 leading-tight tabular-nums">
                              {dislike}
                            </span>
                          </div>
                        </div>
                      ),
                      date: ddMMYYFormatter(updatedAt),
                    })
                  )}
                  headers={reviewHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table size="xl">
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
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
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </>
            )}
          </>
        )}
      </section>

      <section className="px-4">
        {products.isLoading ? (
          <DataTableSkeleton columnCount={3} showToolbar={false} rowCount={6} />
        ) : (
          <>
            {products.isSuccess && products.data.rows.length === 0 && (
              <>
                <TableContainer
                  title="Latest products"
                  description="List of the latest products"
                />
                <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                  <p className="text-base font-semibold leading-tight text-gray-900">
                    No products found.
                  </p>
                  <p className="mb-6 mt-1 text-sm leading-tight text-gray-600">
                    It seems like you haven&apos;t added any products yet.
                  </p>

                  <div className="flex flex-col gap-y-2">
                    <Button
                      kind="tertiary"
                      disabled={stockAlert.isLoading}
                      onClick={() => stockAlert.refetch()}
                      renderIcon={(args) => <Renew {...args} size="24" />}
                    >
                      Refresh
                    </Button>
                    <Link to="/product/list" className="">
                      Go to products
                    </Link>
                  </div>
                </div>
              </>
            )}

            {products.isSuccess && products.data.rows.length > 0 && (
              <>
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-x-4 mb-1">
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Latest products
                    </h2>
                    <Link to="/product/list">View</Link>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    List of the latest products
                  </p>
                </div>
                <DataTable
                  rows={products.data.rows.map(
                    ({
                      id,
                      name,
                      stock,
                      stockAlert,
                      sold,
                      price,
                      available,
                    }) => ({
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
                      sold,
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
                    })
                  )}
                  headers={productHeaders}
                >
                  {({ rows, headers }) => (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                id={header.key}
                                key={header.key}
                                className="uppercase"
                              >
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
                      </Table>
                    </TableContainer>
                  )}
                </DataTable>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
