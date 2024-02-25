import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  EmptyPlaceholder,
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
import { storeDefault, storeInitial, storeSchema } from "../schemas";
import { useGetStore, useUpdateStore } from "../queries";
import { toast } from "sonner";

// TODO: Missing profile and front-page
export const UpdateForm = () => {
  const { data: store, isError, error } = useGetStore();
  const { mutate, isLoading } = useUpdateStore();

  const form = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues: storeInitial,
    values: storeDefault(store),
    mode: "all",
  });

  const handleSave = (_values) => {
    mutate(_values, {
      onSuccess() {
        toast("Store updated successfully");
      },
    });
  };

  return (
    <>
      {isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSave)}>
            <div className="space-y-1.5">
              <h2 className="font-medium leading-none tracking-tight">
                Information
              </h2>
              <p className="text-sm text-muted-foreground">
                The information about the your store
              </p>
            </div>

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
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner className="mr-2 size-4" />}
              Save
            </Button>
          </form>
        </Form>
      )}
    </>
  );
};
