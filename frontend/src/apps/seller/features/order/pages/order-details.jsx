import { Link, useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  EmptyPlaceholder,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from "@/components";
import { OrderStatus } from "@/shared/components";
import { Formatter } from "@/utils";
import { productActionRoutes } from "../../product";
import { useGetOrder } from "../queries";

const { accessor } = createColumnHelper();
const columns = [
  accessor("product.name", {
    header: () => "Product",
    cell: (info) => (
      <div className="flex">
        <Link
          className="max-w-md truncate py-1 font-medium hover:underline"
          to={productActionRoutes.details(info.row.original.productId)}
        >
          {info.getValue()}
        </Link>
      </div>
    ),
  }),
  accessor("quantity", {
    header: () => <div className="text-right">Quantity</div>,
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
  }),
  accessor("price", {
    header: () => <div className="text-right">U.P</div>,
    cell: (info) => (
      <div className="text-right">{Formatter.currency(info.getValue())}</div>
    ),
  }),
  accessor("subtotal", {
    header: () => <div className="text-right">Subtotal</div>,
    cell: (info) => {
      const item = info.row.original;
      return (
        <div className="text-right">
          {Formatter.currency(item.price * item.quantity)}
        </div>
      );
    },
  }),
];

export const OrderDetails = () => {
  const { orderId } = useParams();

  const { data: order, isLoading, isError, error } = useGetOrder(orderId);

  const table = useReactTable({
    columns,
    data: order?.items,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Order Details
      </h2>

      {isLoading ? (
        <>
          <Separator />

          <section className="space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Skeleton className="h-5 w-1/3" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <Skeleton className="h-5 w-1/3" />

            <TableSkeleton action={false} />
          </section>
        </>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <Separator />

          <section className="space-y-2">
            <h3 className="font-semibold uppercase">Order</h3>

            <div className="text-sm">
              <p className="font-medium">ID</p>
              <p className="text-muted-foreground">{order.id}</p>
            </div>
            <div className="space-y-1 text-sm">
              <p className="font-medium">Status</p>
              <OrderStatus status={order.status} />
            </div>
            <div className="text-sm">
              <p className="font-medium">Created At</p>
              <p className="text-muted-foreground">
                {Formatter.fullDate(order.createdAt)}
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="font-semibold uppercase">Customer</h3>

            <div className="text-sm">
              <p className="font-medium">Full name</p>
              <p className="text-muted-foreground">{`${order.customer.name} ${order.customer.lastName}`}</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{order.customer.email}</p>
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="font-semibold uppercase">Payment</h3>

            <div className="text-sm">
              <p className="font-medium capitalize">
                {order.paymentMethod.type}
              </p>
              <p className="capitalize text-muted-foreground">
                {order.paymentMethod.card.brand}{" "}
                {order.paymentMethod.card.funding}
              </p>
              <p className="text-muted-foreground">
                {order.paymentMethod.card.last4}
                {" - "}
                {order.paymentMethod.card.exp_month}/
                {order.paymentMethod.card.exp_year}
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="font-semibold uppercase">Shipping</h3>

            <div className="text-sm">
              <p className="font-medium">Address</p>
              <p className="text-muted-foreground">
                {`${order.address.city}, ${order.address.province} (${order.address.zipCode})`}
              </p>
              <p className="text-muted-foreground">
                {`${order.address.street}, ${order.address.apartmentNumber}`}
              </p>
              <p className="text-muted-foreground">
                {order.address.indications}
              </p>
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="font-semibold uppercase">Items</h3>

            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>TOTAL</TableCell>
                  <TableCell
                    colSpan={columns.length - 1}
                    className="text-right"
                  >
                    {Formatter.currency(order.total)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </section>
        </>
      )}
    </main>
  );
};
