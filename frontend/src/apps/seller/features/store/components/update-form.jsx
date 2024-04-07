import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/shared/components";
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
} from "@/components";
import { storeDefault, storeInitial, storeSchema } from "../schemas";
import { useGetStore, useUpdateStore } from "../queries";

// TODO: Missing profile and front-page
export const UpdateForm = () => {
  const { data: store } = useGetStore();
  const { mutate, isLoading } = useUpdateStore();

  const form = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues: storeInitial,
    values: storeDefault(store),
    mode: "onSubmit",
  });

  const handleSave = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Store updated successfully");
      },
    });
  };

  return (
    <section className="px-6">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSave)}>
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see your store.
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
            Update
          </Button>
        </form>
      </Form>
    </section>
  );
};
