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
  Switch,
  Textarea,
  useToast,
} from "../../../../../components";
import { newCategoryInitial, newCategorySchema } from "../schemas";
import { categoryTypes } from "../utils";
import { useCreateCategory } from "../queries";

export const NewCategory = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(newCategorySchema),
    defaultValues: newCategoryInitial,
    mode: "onSubmit",
  });

  const create = useCreateCategory();

  const handleCreate = (values) => {
    create.mutate(values, {
      onSuccess() {
        toast({
          description: "Category created successfully",
        });
        form.reset();
      },
      onError(error) {
        toast({
          title: "Error creating category",
          description: error.message,
        });
      },
    });
  };

  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4">
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
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
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
                    onValueChange={(value) => {
                      if (value === categoryTypes.single) {
                        form.setValue("available", false);
                        field.onChange(value);
                      } else {
                        field.onChange(value);
                      }
                    }}
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

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-md border p-4">
                <FormLabel className="mb-0 text-base">Available</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.getValues().type === categoryTypes.single}
                  />
                </FormControl>
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
