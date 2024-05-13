import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState, Spinner } from "@/shared/components";
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
  InputSkeleton,
  Skeleton,
  Textarea,
  TextareaSkeleton,
} from "@/components";
import { useGetAddress, useRemoveAddress, useUpdateAddress } from "../queries";
import { addressDefault, addressInitial, addressSchema } from "../schemas";
import { addressActionRoutes } from "../utils";

export const AddressDetails = () => {
  useDocumentTitle("Address Details");
  const [modal, setModal] = useState(false);

  const { addressId } = useParams();

  const navigate = useNavigate();

  const { data: address, isLoading, isError, error } = useGetAddress(addressId);
  const update = useUpdateAddress();
  const remove = useRemoveAddress();

  const form = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: addressInitial,
    values: addressDefault(address),
    mode: "onSubmit",
  });

  const handleUpdate = (values) => {
    update.mutate(
      { addressId, values },
      {
        onSuccess() {
          toast("Address updated successfully");
        },
      },
    );
  };

  const handleRemove = () => {
    remove.mutate(addressId, {
      onSuccess() {
        toast("Address removed successfully");
        navigate(addressActionRoutes.root);
      },
    });
  };

  const handleCancel = () => {
    navigate(addressActionRoutes.root);
  };

  return (
    <div className="max-w-2xl space-y-4">
      <section>
        <h3 className="text-lg font-medium">Address Details</h3>
        <p className="text-sm text-muted-foreground">
          Make sure to fill out all the details of your address.
        </p>
      </section>

      <section>
        {isLoading ? (
          <div className="space-y-4">
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <TextareaSkeleton />

            <div className="flex gap-x-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipient's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Recipient's phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip code</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input placeholder="Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment number</FormLabel>
                    <FormControl>
                      <Input placeholder="Apartment number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="indications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="House description, location, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={update.isLoading || remove.isLoading}
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setModal(true)}
                  disabled={update.isLoading || remove.isLoading}
                >
                  Remove
                </Button>
                <Button variant="ghost" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>

            <AlertDialog open={modal} onOpenChange={setModal}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="leading-tight">
                    Are you sure you want to remove this address?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
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
                    Remove
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Form>
        )}
      </section>
    </div>
  );
};
