import { useNavigate } from "react-router-dom";
import { useDeleteStore, useGetStore, useUpdateStore } from "../queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeDefault, storeInitial, storeSchema } from "../schemas";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { useState } from "react";
import { MainContent } from "../../layouts";

const Store = () => {
  const [dialog, setDialog] = useState(false);

  const navigate = useNavigate();

  const store = useGetStore();
  const updateStore = useUpdateStore();
  const deleteStore = useDeleteStore();

  const form = useForm({
    resolver: yupResolver(storeSchema),
    defaultValues: storeInitial,
    values: storeDefault(store.data),
    mode: "all",
  });

  const handleSave = (values) => {
    updateStore.mutate(values, {
      onSuccess() {
        toast({
          description: "Store updated successfully",
        });
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Store could not be updated",
          description: error.message,
        });
      },
    });
    setTimeout(updateStore.reset, 1300);
  };
  const handleDelete = () => {
    deleteStore.mutate(null, {
      onSuccess() {
        toast({
          description: "Store deleted successfully",
        });
        navigate("/seller/store/new");
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Error deleting store",
          description: error.message,
        });
        setTimeout(updateStore.reset, 1300);
      },
    });
  };

  return (
    <MainContent>
      <section className="pt-3">
        <h1 className="text-2xl font-bold tracking-tight">Store</h1>
        <p className="text-muted-foreground">About your store</p>
      </section>

      {store.isLoading && <p>Loading store...</p>}
      {store.isError && <p>Error loading store</p>}
      {store.isSuccess && (
        <section className="space-y-10">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSave)}
            >
              <div>
                <h2 className="text-lg font-medium">Information</h2>
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
              <Button type="submit" disabled={updateStore.isLoading}>
                {updateStore.isLoading && "Saving..."}
                {updateStore.isError && "Error saving"}
                {updateStore.isSuccess && "Saved"}
                {updateStore.isIdle && "Save"}
              </Button>
            </form>
          </Form>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-medium">Delete</h2>
              <p className="text-sm text-muted-foreground">
                Delete all your products and information about your store
              </p>
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setDialog(true)}
              disabled={deleteStore.isLoading}
            >
              Delete
            </Button>
          </section>

          <AlertDialog open={dialog} onOpenChange={setDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete store</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your store.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive" onClick={handleDelete}>
                  {deleteStore.isLoading && "Deleting..."}
                  {deleteStore.isError && "Error deleting"}
                  {deleteStore.isSuccess && "Deleted"}
                  {deleteStore.isIdle && "Delete"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      )}
    </MainContent>
  );
};

export default Store;
