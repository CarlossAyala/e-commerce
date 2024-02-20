import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeInitial, storeSchema } from "../schemas";
import { useCreateStore } from "../queries";
import { MainContent } from "../../layouts";

const StoreNew = () => {
  const navigate = useNavigate();

  const createStore = useCreateStore();

  const form = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues: storeInitial,
    mode: "all",
  });

  const handleCreate = (values) => {
    createStore.mutate(values, {
      onSuccess() {
        toast({
          description: "Store updated successfully",
        });
        setTimeout(() => {
          createStore.reset();
          navigate("/seller/store");
        }, 1300);
      },
      onError(error) {
        setTimeout(createStore.reset, 1300);
        toast({
          variant: "destructive",
          title: "Store could not be created",
          description: error.message,
        });
      },
    });
  };

  return (
    <MainContent>
      <section className="pt-3">
        <h1 className="text-2xl font-bold tracking-tight">Create Store</h1>
        <p className="text-muted-foreground">
          Create a new store and start selling your products.
        </p>
      </section>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleCreate)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Store name" {...field} />
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
                  <Textarea placeholder="Describe your store" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={createStore.isLoading}>
            {createStore.isIdle && "Create"}
            {createStore.isLoading && "Creating..."}
            {createStore.isError && "Error creating"}
            {createStore.isSuccess && "Created"}
          </Button>
        </form>
      </Form>
    </MainContent>
  );
};

export default StoreNew;
