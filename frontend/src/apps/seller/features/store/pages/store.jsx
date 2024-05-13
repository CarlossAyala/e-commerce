import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import placeholderImage from "@/assets/images/placeholder-image.jpg";
import { validFileSize, validFileType } from "@/shared/utils";
import { PageHeaderHeading, Spinner } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
  buttonVariants,
} from "@/components";
import { useDeleteStore, useGetStore, useUpdateStore } from "../queries";
import { updateDefault, updateSchema } from "../schemas";
import {
  ArrowUpTrayIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const Store = () => {
  useDocumentTitle("My store");

  const [dialog, setDialog] = useState(false);

  const { data: store } = useGetStore();
  const update = useUpdateStore();
  const remove = useDeleteStore();

  const form = useForm({
    resolver: yupResolver(updateSchema),
    values: updateDefault(store),
    mode: "onSubmit",
  });

  const handleUpdate = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "nextGallery") {
        for (const file of values[key]) {
          formData.append("nextGallery", file);
        }
      } else if (key === "gallery") {
        for (const file of values[key]) {
          formData.append("gallery[]", file.id);
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    update.mutate(formData, {
      onSuccess() {
        toast("Store updated successfully");
      },
    });
  };

  const handleRemove = () => {
    remove.mutate(null, {
      onSuccess() {
        toast("Store deleted successfully");
      },
    });
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (validFileSize(file) && validFileType(file)) {
      form.setValue("nextProfile", file);
    }
  };
  const handleGalleryChange = (e) => {
    const current = form.getValues("gallery");
    const prev = form.getValues("nextGallery");
    const { files } = e.target;
    const validFiles = [...prev, ...files].filter(
      (file) => validFileType(file) && validFileSize(file),
    );
    const nextFiles = validFiles.slice(0, 10 - current.length);
    form.setValue("nextGallery", nextFiles);
  };
  const handleRemoveImage = (item, index) => {
    const current = form.getValues("gallery");
    const next = form.getValues("nextGallery");

    if (item instanceof File) {
      const newNext = next.filter((_, i) => i + current.length !== index);
      form.setValue("nextGallery", newNext);
    } else {
      const newCurrent = current.filter((file) => file.id !== item.id);
      form.setValue("gallery", newCurrent);
    }
  };

  const profile = form.watch("profile");
  const gallery = form.watch("gallery");
  const nextProfile = form.watch("nextProfile");
  const nextGallery = form.watch("nextGallery");

  const images = [...gallery, ...nextGallery];

  return (
    <main className="flex-1 space-y-4 pb-10">
      <section className="mt-4 flex justify-between px-4 tablet:px-6">
        <PageHeaderHeading>Store</PageHeaderHeading>
        <Button form="store-update" type="submit" disabled={update.isLoading}>
          {update.isLoading && <Spinner className="mr-2 size-4" />}
          Update
        </Button>
      </section>

      <Form {...form}>
        <form
          id="store-update"
          onSubmit={form.handleSubmit(handleUpdate)}
          className="space-y-4 px-4 pb-10 tablet:px-6"
        >
          <div>
            <h3 className="text-lg font-medium">Information</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see your store.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {profile && !nextProfile ? (
              <div className="size-32 overflow-hidden rounded-full">
                <img
                  src={profile}
                  alt="Profile"
                  className="size-full object-cover"
                />
              </div>
            ) : nextProfile ? (
              <div className="size-32 overflow-hidden rounded-full">
                <img
                  src={URL.createObjectURL(nextProfile)}
                  alt="Profile"
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <div className="size-32 overflow-hidden rounded-full">
                <img
                  src={placeholderImage}
                  alt="Profile"
                  className="size-full bg-muted-foreground object-cover"
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="nextProfile"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col">
                    <FormLabel
                      className={buttonVariants({
                        variant: "outline",
                      })}
                    >
                      Change profile
                    </FormLabel>
                    {profile || nextProfile ? (
                      <Button
                        variant="secondary"
                        onClick={() => {
                          form.setValue("profile", "");
                          form.setValue("nextProfile", "");
                        }}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <FormMessage className="m-0" />
                  <FormControl>
                    <Input
                      type="file"
                      {...field}
                      onChange={handleProfileChange}
                      value=""
                      className="hidden"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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

          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium">Gallery</h3>
              <p className="text-sm text-muted-foreground">
                You can add up to 10 images to the gallery. The first one will
                be used as profile.
              </p>
            </div>
            <div className="shrink-0">
              <p className="text-lg text-muted-foreground">
                {images.length} / 10
              </p>
            </div>
          </div>

          {images.length ? (
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent>
                {images.map((item, index) => (
                  <CarouselItem key={index}>
                    <div
                      key={index}
                      className="group aspect-h-4 aspect-w-14 relative w-full overflow-hidden rounded-md border"
                    >
                      <img
                        src={
                          item instanceof File
                            ? URL.createObjectURL(item)
                            : item.url
                        }
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
            <div className="aspect-h-4 aspect-w-14 rounded-md border border-dashed">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <PhotoIcon className="size-32 stroke-1 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Preview</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-5 gap-4">
            {images.map((item, index) => (
              <div
                key={index}
                className="group aspect-h-8 aspect-w-14 relative w-full overflow-hidden rounded-md border"
              >
                <img
                  src={
                    item instanceof File ? URL.createObjectURL(item) : item.url
                  }
                  className="size-full object-cover"
                />
                <button
                  className="absolute inset-0 hidden items-center justify-center bg-black group-hover:flex group-hover:bg-black/50"
                  onClick={() => handleRemoveImage(item, index)}
                  type="button"
                >
                  <XMarkIcon className="size-10 text-white" />
                  <span className="sr-only">Remove</span>
                </button>
              </div>
            ))}
            {images.length < 10 && (
              <div className="aspect-h-8 aspect-w-14 relative w-full rounded-md border border-dashed">
                <label
                  htmlFor="nextGallery"
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <ArrowUpTrayIcon className="size-6 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </label>
                <input
                  id="nextGallery"
                  name="nextGallery"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleGalleryChange}
                  value=""
                />
              </div>
            )}
          </div>
        </form>
      </Form>

      <Separator />

      <section className="space-y-4 px-4 tablet:px-6">
        <div>
          <h3 className="text-lg font-medium">Delete Store</h3>
          <p className="text-sm text-muted-foreground">
            Delete all data related to your store.
          </p>
        </div>

        <AlertDialog open={dialog} onOpenChange={setDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete store</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                store.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={remove.isLoading}
              >
                {remove.isLoading && <Spinner className="mr-2 size-4" />}
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          type="button"
          variant="destructive"
          onClick={() => setDialog(true)}
          disabled={remove.isLoading}
        >
          Delete
        </Button>
      </section>
    </main>
  );
};
