import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Mandatory,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  buttonVariants,
} from "@/components";
import { useUpdateStockAlert } from "../queries";
import { productActionRoutes } from "../utils";
import { stockAlertDefault, stockAlertSchema } from "../schemas";

export const StockAlertTableAction = ({ row }) => {
  const [sheet, setSheet] = useState(false);
  const { mutate, isLoading } = useUpdateStockAlert();

  const product = row.original;

  const form = useForm({
    resolver: yupResolver(stockAlertSchema),
    values: stockAlertDefault(product),
    mode: "all",
  });

  const handleUpdate = (values) => {
    mutate(
      { productId: product.id, values },
      {
        onSuccess: () => {
          toast("Product updated successfully");
          setSheet(false);
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={productActionRoutes.details(product.id)}>View</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setSheet(true);
            }}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit product</SheetTitle>
            <SheetDescription>
              Make changes to your product stock and stock alert.
            </SheetDescription>
          </SheetHeader>

          <div>
            <h3 className="mb-1 text-sm font-medium">Product</h3>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link
                    className="line-clamp-2 hover:underline"
                    to={productActionRoutes.details(product.id)}
                  >
                    {product.name}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stockAlert"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Stock Alert
                      <Mandatory optional />
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Stock" {...field} />
                    </FormControl>
                    <FormDescription>
                      You will be notified when the stock is below this value.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
                <SheetClose
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Cancel
                </SheetClose>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};
