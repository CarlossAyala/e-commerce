import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useDocumentTitle } from "@/shared/hooks";
import { PageHeader, PageHeaderHeading, Spinner } from "@/shared/components";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components";
import { newCategoryInitial, newCategorySchema } from "../schemas";
import { CATEGORY_TYPES } from "../utils";
import { useCreateCategory } from "../queries";

export const Create = () => {
  useDocumentTitle("Create Category");
  const form = useForm({
    resolver: yupResolver(newCategorySchema),
    defaultValues: newCategoryInitial,
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useCreateCategory();

  const handleCreate = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Category created successfully");
        form.reset();
      },
    });
  };

  return (
    <main className="flex-1 space-y-4 px-6 pb-10">
      <PageHeader>
        <PageHeaderHeading>New Category</PageHeaderHeading>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
          <img
            className="h-64 w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1679967488699-f159404b5c5c?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Future alt"
          />

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
                  <Textarea placeholder="About this category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormItem className="flex gap-2">
                      <FormControl>
                        <RadioGroupItem value={CATEGORY_TYPES.MAIN} />
                      </FormControl>
                      <FormLabel className="m-0 capitalize leading-4">
                        {CATEGORY_TYPES.MAIN}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex gap-2">
                      <FormControl>
                        <RadioGroupItem value={CATEGORY_TYPES.SINGLE} />
                      </FormControl>
                      <div>
                        <FormLabel className="m-0 capitalize leading-4">
                          {CATEGORY_TYPES.SINGLE}
                        </FormLabel>
                        <FormDescription>
                          Single categories are used to attach to Main
                          categories.
                        </FormDescription>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Spinner className="mr-2 size-4" />}
            Create
          </Button>
        </form>
      </Form>
    </main>
  );
};
