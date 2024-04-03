import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { SELLER_NAV } from "@/apps/seller/config";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
  Textarea,
} from "@/components";
import { storeInitial, storeSchema } from "../schemas";
import { useCreateStore } from "../queries";

// TODO: Missing profile and front-page
export const StoreNew = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateStore();

  const form = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues: storeInitial,
    mode: "onSubmit",
  });

  const handleCreate = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Store created");
        navigate(SELLER_NAV.store.to);
      },
    });
  };

  return (
    <main className="container flex max-w-2xl flex-1 flex-col justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Store</CardTitle>
          <CardDescription>
            Create a new store and start selling your products.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleCreate)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 size-4" />}
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};
