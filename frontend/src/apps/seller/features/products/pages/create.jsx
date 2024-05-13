import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useGetCategories } from "@/shared/features/categories";
import {
  EmptyState,
  Spinner,
  LocalPagination,
  PageHeaderHeading,
} from "@/shared/components";
import { useDocumentTitle, useLocalSearchParams } from "@/shared/hooks";
import { paginateArray, validFileSize, validFileType } from "@/shared/utils";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
  Input,
  Card,
  Skeleton,
  CardHeader,
  CardTitle,
  CardDescription,
  Separator,
  RadioGroup,
  RadioGroupItem,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components";
import { clearEmptyValues } from "@/utils";
import { cn } from "@/libs";
import { productInitial, createSchema } from "../schemas";
import { PRODUCT_CONDITIONS, productActionRoutes } from "../utils";
import { useCreateProduct } from "../queries";

export const Create = () => {
  useDocumentTitle("Create Product");
  const navigate = useNavigate();

  const categories = useGetCategories();

  const { params, setParams } = useLocalSearchParams({
    page: 1,
    limit: 10,
    q: "",
  });
  const search = params.get("q");

  const filtered = categories.data?.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );
  const _categories = paginateArray({
    data: filtered,
    limit: params.get("limit"),
    page: params.get("page"),
  });

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(params);
    newParams.set("q", e.target.value);
    newParams.set("page", 1);
    setParams(newParams);
  };

  const form = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: productInitial,
    mode: "onSubmit",
  });
  const categoryId = form.watch("categoryId");

  const category = categories.data?.find((c) => c.id === categoryId);

  const { mutate, isLoading } = useCreateProduct();

  const handleCreate = (values) => {
    const cleanValues = clearEmptyValues(values);
    const formData = new FormData();

    for (const key in cleanValues) {
      if (key === "gallery") {
        cleanValues[key].forEach((file) => {
          formData.append("gallery", file);
        });
      } else {
        formData.append(key, cleanValues[key]);
      }
    }

    mutate(formData, {
      onSuccess(product) {
        toast("Product created successfully");
        navigate(productActionRoutes.details(product.id));
      },
    });
  };

  const handleImageChange = (e) => {
    const prev = form.getValues("gallery");
    const { files } = e.target;
    const validFiles = [...prev, ...files].filter(
      (file) => validFileType(file) && validFileSize(file),
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
    <main className="flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between px-4 tablet:px-6">
        <PageHeaderHeading>Product New</PageHeaderHeading>
        <Button form="product-new" type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 size-4" />}
          Create
        </Button>
      </section>

      <Form {...form}>
        <form id="product-new" onSubmit={form.handleSubmit(handleCreate)}>
          <section className="space-y-4 px-4 pb-10 tablet:px-6">
            <div>
              <h3 className="text-lg font-medium">Information</h3>
              <p className="text-sm text-muted-foreground">
                The information about the product.
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
                    <Textarea
                      placeholder="Describe your product here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Separator />

          <section className="space-y-4 px-4 py-10 tablet:px-6">
            <div>
              <h3 className="text-lg font-medium">Inventory</h3>
              <p className="text-sm text-muted-foreground">
                Control the inventory of the product.
              </p>
            </div>

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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRODUCT_CONDITIONS.map((condition) => (
                        <SelectItem
                          key={condition.label}
                          value={condition.value}
                        >
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Separator />

          <section className="space-y-4 px-4 py-10 tablet:px-6">
            <div>
              <h3 className="text-lg font-medium">Category</h3>
              <p className="text-sm text-muted-foreground">
                Select the category of the product.
              </p>
            </div>

            <div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Current</h4>

                      {!categoryId ? (
                        <Card>
                          <CardHeader>
                            <CardDescription>
                              No category selected.
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      ) : (
                        <Card>
                          <CardHeader>
                            <CardTitle className="line-clamp-1">
                              {category.name}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {category.description}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )}
                      <FormMessage />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Categories</h4>

                      <Input
                        className="w-full md:max-w-md"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search categories"
                      />

                      {categories.isLoading ? (
                        <Card className="divide-y">
                          {new Array(3).fill("").map((_, index) => (
                            <div key={index} className="flex gap-4 p-4">
                              <Skeleton className="size-4 shrink-0 rounded-full" />
                              <div className="grow space-y-2">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-full" />
                              </div>
                            </div>
                          ))}
                        </Card>
                      ) : categories.isError ? (
                        <EmptyState
                          title="Error"
                          description={categories.error.message}
                        />
                      ) : !categories.data.length ? (
                        <EmptyState
                          title="No categories"
                          description="No categories found"
                        />
                      ) : !_categories.length ? (
                        <EmptyState
                          title="No categories"
                          description={`No categories found for "${search}"`}
                        />
                      ) : (
                        <>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <Card className="divide-y overflow-hidden">
                                {_categories.map((category) => {
                                  const isCurrentCategory =
                                    field.value === category.id;

                                  return (
                                    <FormItem
                                      key={category.id}
                                      className={cn(
                                        "flex items-start gap-4 p-4",
                                        isCurrentCategory && "bg-gray-100",
                                      )}
                                    >
                                      <FormControl>
                                        <RadioGroupItem value={category.id} />
                                      </FormControl>
                                      <FormLabel className="m-0 grow">
                                        <p className="line-clamp-1 text-sm font-medium leading-4">
                                          {category.name}
                                        </p>
                                        <p className="line-clamp-2 text-sm font-normal text-muted-foreground">
                                          {category.description}
                                        </p>
                                      </FormLabel>
                                    </FormItem>
                                  );
                                })}
                              </Card>
                            </RadioGroup>
                          </FormControl>

                          <LocalPagination
                            count={filtered.length}
                            params={params}
                            setParams={setParams}
                          />
                        </>
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          <section className="px-4 py-10 tablet:px-6">
            <div className="mb-4 flex justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Gallery</h3>
                <p className="text-sm text-muted-foreground">
                  You can add up to 10 images to the gallery. The first one will
                  be used as profile.
                </p>
              </div>
              <div className="shrink-0">
                <p className="text-lg text-muted-foreground">
                  {gallery.length} / 10
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
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
                            className="group aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-md border"
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
                  <div className="aspect-h-1 aspect-w-1 relative w-full rounded-md border border-dashed">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <PhotoIcon className="size-32 stroke-1 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Preview will be shown here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="grid grid-cols-4 gap-4">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className="group aspect-h-1 aspect-w-1 relative w-full overflow-hidden rounded-md border"
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
                    <div className="aspect-h-1 aspect-w-1 relative w-full rounded-md border border-dashed">
                      <label
                        htmlFor="gallery"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                      >
                        <ArrowUpTrayIcon className="size-6 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </label>
                      <input
                        id="gallery"
                        name="gallery"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                        value=""
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-4 px-4 py-10 tablet:px-6">
            <div>
              <h3 className="text-lg font-medium">Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure the settings of the product.
              </p>
            </div>

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel className="mb-0">Available</FormLabel>
                    <FormDescription>
                      This will prevent customers from buying it.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </section>
        </form>
      </Form>
    </main>
  );
};
