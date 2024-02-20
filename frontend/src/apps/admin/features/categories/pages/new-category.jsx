import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
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
  Separator,
  Textarea,
} from "../../../../../components";
import { newCategoryInitial, newCategorySchema } from "../schemas";
import { categoryTypes } from "../utils";
import { useCreateCategory } from "../queries";
import { toast } from "sonner";

export const NewCategory = () => {
  const form = useForm({
    resolver: yupResolver(newCategorySchema),
    defaultValues: newCategoryInitial,
    mode: "onSubmit",
  });

  const create = useCreateCategory();

  const handleCreate = (values) => {
    console.log("Values", values);
    create.mutate(values, {
      onSuccess() {
        toast("Category created successfully");
        form.reset();
      },
      onError(error) {
        toast.message("Error creating category", {
          description: error.message,
        });
      },
    });
  };

  return (
    <main className="space-y-4 p-4">
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          New Category
        </h2>
        <p className="text-sm leading-tight text-muted-foreground">
          Add a new category.
        </p>
      </section>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreate)}
          className="max-w-xl space-y-6"
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
              <FormItem className="space-y-3">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-1"
                  >
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={categoryTypes.main} />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal capitalize">
                          {categoryTypes.main}
                        </FormLabel>
                      </div>
                    </FormItem>
                    <FormItem className="flex items-start space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={categoryTypes.single} />
                      </FormControl>
                      <div>
                        <FormLabel className="font-normal capitalize">
                          {categoryTypes.single}
                        </FormLabel>
                        <FormDescription>
                          Single categories are used to attach to Main
                          categories. They are always disabled. You can&apos;t
                          change this.
                        </FormDescription>
                      </div>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {create.isLoading && (
              <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create
          </Button>
        </form>
      </Form>
    </main>
  );
};
