import { Link, useParams } from "react-router-dom";
import { useGetSale } from "../queries";
import { Formatter } from "../../../../utils/formatter";
import {
  Button,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  useToast,
} from "../../../../components";
import { useCopyToClipboard } from "../../../../hooks";
import { productActionRoutes } from "../../product/utils";
import { MainContent } from "../../layout";

const SaleDetail = () => {
  const { orderId } = useParams();
  const { toast } = useToast();

  const [, copyToClipboard] = useCopyToClipboard();

  const sale = useGetSale(orderId);

  const handleClipboard = async (text) => {
    try {
      await copyToClipboard(text);
      toast({
        description: "Copied to clipboard",
      });
    } catch (error) {
      toast({
        description: "Copy to clipboard failed",
      });
    }
  };

  const total = sale.data?.items.reduce((accu, curr) => {
    const subtotal = +curr.price * curr.quantity;
    return accu + subtotal;
  }, 0);

  return (
    <MainContent>
      <section className="mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Sale detail</h1>
        <p className="text-muted-foreground">This is a sale detail.</p>
      </section>

      <section className="space-y-6">
        {sale.isLoading && <p>Loading...</p>}
        {sale.isError && (
          <p>Error: {sale.error?.message ?? "Something went wrong"}</p>
        )}
        {sale.isSuccess && (
          <>
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Order details
                </h2>
                <p className="leading-tight text-muted-foreground">
                  This section shows the information of this order.
                </p>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">ID</dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  <Button
                    type="button"
                    onClick={() => handleClipboard(sale.data.id)}
                    size="sm"
                    variant="secondary"
                  >
                    {sale.data.id}
                  </Button>
                </dd>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">Status</dt>
                <dd className="mt-1 text-sm font-medium capitalize leading-tight">
                  {sale.data.status}
                </dd>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">Date</dt>
                <dd className="mt-1 text-sm font-medium capitalize leading-tight">
                  {Formatter.shortDate(sale.data.orderedAt)}
                </dd>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Customer details
                </h2>
                <p className="leading-tight text-muted-foreground">
                  This section shows the information of this customer.
                </p>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {sale.data.customer.name} {sale.data.customer.lastName}
                </dd>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">Email</dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {sale.data.customer.email}
                </dd>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Receiver details
                </h2>
                <p className="leading-tight text-muted-foreground">
                  This section shows the information of the receiver.
                </p>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {sale.data.receiverName}
                </dd>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">Phone</dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {sale.data.receiverPhone}
                </dd>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Shipping details
                </h2>
                <p className="leading-tight text-muted-foreground">
                  This section shows the information of the shipping.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-x-2">
                <div>
                  <dt className="text-sm leading-tight text-gray-900">
                    Province
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-tight">
                    {sale.data.province}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm leading-tight text-gray-900">
                    Zip code
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-tight">
                    {sale.data.zipCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm leading-tight text-gray-900">City</dt>
                  <dd className="mt-1 text-sm font-medium leading-tight">
                    {sale.data.city}
                  </dd>
                </div>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">Street</dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {sale.data.street}
                </dd>
              </div>
              <div>
                <dt className="text-sm leading-tight text-gray-900">
                  Indications
                </dt>
                <dd className="mt-1 text-sm font-medium leading-tight">
                  {!sale.data.indications ? (
                    sale.data.indications
                  ) : (
                    <span className="font-normal italic text-muted-foreground">
                      None
                    </span>
                  )}
                </dd>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Product details
                </h2>
                <p className="leading-tight text-muted-foreground">
                  This section shows the information of the products.
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sale.data.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="max-w-sm">
                        <Link
                          to={productActionRoutes.details(item.product.id)}
                          className="line-clamp-1 font-medium hover:underline"
                        >
                          {item.product.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        {Formatter.money(item.product.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {Formatter.money(item.product.price * item.quantity)}
                      </TableCell>
                      <TableCell className="text-center">
                        {Formatter.shortDate(item.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-gray-50">
                  <TableRow>
                    <TableHead className="text-left">Total</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead className="text-center">
                      {Formatter.money(total)}
                    </TableHead>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </>
        )}
      </section>
    </MainContent>
  );
};

export default SaleDetail;
