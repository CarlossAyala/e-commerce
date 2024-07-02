import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { Spinner } from "@/shared/components";
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
  Textarea,
} from "@/shared/components";
import { createSchema, createInitial } from "../schemas";
import { useCreateStore } from "../queries";

export const StoreNew = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useCreateStore();

  const form = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: createInitial,
    mode: "onSubmit",
  });

  const handleCreate = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Store created");
        navigate("/seller");
      },
    });
  };

  return (
    <main className="container flex max-w-2xl flex-1 flex-col justify-center px-4 tablet:px-6">
      <Card className="my-4">
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
