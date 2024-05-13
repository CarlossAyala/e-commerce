import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDocumentTitle } from "@/shared/hooks";
import { validFileType } from "@/shared/utils";
import { PageHeaderHeading, Spinner } from "@/shared/components";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Textarea,
} from "@/components";
import { newCategoryInitial, newCategorySchema } from "../schemas";
import { categoryActionRoutes } from "../utils";
import { useCreateCategory } from "../queries";

export const Create = () => {
  useDocumentTitle("Create Category");
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(newCategorySchema),
    defaultValues: newCategoryInitial,
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useCreateCategory();

  const handleCreate = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "gallery") {
        for (const file of values[key]) {
          formData.append("gallery", file);
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    mutate(formData, {
      onSuccess({ id }) {
        toast("Category created successfully");
        navigate(categoryActionRoutes.details(id));
      },
    });
  };

  const handleImageChange = (e) => {
    const prev = form.getValues("gallery");
    const { files } = e.target;
    const validFiles = [...prev, ...files].filter((file) =>
      validFileType(file),
    );
    const nextFiles = validFiles.slice(0, 10);
    form.setValue("gallery", nextFiles);
  };
  const handleRemoveImage = (index) => {
    const prev = form.getValues("gallery");
    const newFiles = prev.filter((_, i) => i !== index);
    form.setValue("gallery", newFiles);
  };

  const gallery = form.watch("gallery");

  return (
    <main className="flex-1 pb-10">
      <section className="mt-4 flex justify-between gap-4 px-6">
        <div>
          <PageHeaderHeading>New Category</PageHeaderHeading>
        </div>

        <Button form="category-create" type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 size-4" />}
          Create
        </Button>
      </section>

      <Form {...form}>
        <form id="category-create" onSubmit={form.handleSubmit(handleCreate)}>
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-lg font-medium">Information</h3>
              <p className="text-sm text-muted-foreground">
                About this category.
              </p>
            </div>

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
          </section>

          <Separator />

          <section className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Gallery</h3>
                <p className="text-sm text-muted-foreground">
                  Upload up to 10 images for the category banner.
                </p>
              </div>

              <div>
                <p className="text-lg text-muted-foreground">
                  {gallery.length} / 10
                </p>
              </div>
            </div>

            {gallery.length ? (
              <Carousel
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {gallery.map((file, index) => (
                    <CarouselItem key={index}>
                      <div
                        key={index}
                        className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md border sm:aspect-h-6 lg:aspect-h-4"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="size-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <div className="aspect-h-9 aspect-w-16 overflow-hidden rounded-md border border-dashed sm:aspect-h-6 lg:aspect-h-4">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <PhotoIcon className="size-32 stroke-1 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Preview will be shown here.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-5 gap-4">
              {gallery.map((item, index) => (
                <div
                  key={index}
                  className="group aspect-h-9 aspect-w-16 relative overflow-hidden rounded-md border"
                >
                  <img
                    src={URL.createObjectURL(item)}
                    className="size-full object-cover"
                  />
                  <button
                    className="absolute inset-0 hidden items-center justify-center bg-black group-hover:flex group-hover:bg-black/50"
                    onClick={() => handleRemoveImage(index)}
                    type="button"
                  >
                    <XMarkIcon className="size-10 text-white" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>
              ))}
              {gallery.length < 10 && (
                <FormField
                  control={form.control}
                  name="gallery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="aspect-h-9 aspect-w-16 relative m-0 rounded-md border border-dashed">
                        <ArrowUpTrayIcon className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          className="hidden"
                          {...field}
                          onChange={handleImageChange}
                          value=""
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </section>
        </form>
      </Form>
    </main>
  );
};
