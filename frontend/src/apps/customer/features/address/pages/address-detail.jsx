import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MainContent,
  Skeleton,
  TextInputSkeleton,
  Textarea,
  TextareaInputSkeleton,
  useToast,
} from "../../../../../components";
import { useGetAddress, useRemoveAddress, useUpdateAddress } from "../queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressDefault, addressInitial, addressSchema } from "../schemas";
import { useParams } from "react-router-dom";
import { clearEmptyValues } from "../../../../../utils";
import { addressActionRoutes } from "../utils";
import { useState } from "react";
import { ArrowPathIcon, FaceFrownIcon } from "@heroicons/react/24/outline";

const AddressDetail = () => {
  const [modal, setModal] = useState(false);

  const { addressId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const address = useGetAddress(addressId);
  const update = useUpdateAddress();
  const remove = useRemoveAddress();

  const form = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: addressInitial,
    values: addressDefault(address.data),
    mode: "all",
  });

  const handleUpdate = (values) => {
    const cleanValues = clearEmptyValues(values);

    update.mutate([addressId, cleanValues], {
      onSuccess() {
        toast({
          description: "Address updated successfully",
        });
        setTimeout(update.reset, 1300);
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Address could not be updated",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const handleRemove = () => {
    remove.mutate(addressId, {
      onSuccess() {
        toast({
          description: "Address removed successfully",
        });
        navigate(addressActionRoutes.root);
      },
      onError(error) {
        toast({
          variant: "destructive",
          title: "Address could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  const handleCancel = () => {
    navigate(addressActionRoutes.root);
  };

  return (
    <MainContent className="max-w-3xl">
      <section className="pt-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Address Details
        </h1>
        <p className="text-muted-foreground">
          Make sure to fill out all the details of your address.
        </p>
      </section>

      {address.isLoading && (
        <>
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextInputSkeleton />
          <TextareaInputSkeleton />
          <div className="flex gap-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </>
      )}

      {address.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching addresses
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {address.error?.message ?? "Uh oh! Something went wrong."}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}

      {address.isSuccess && (
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
            <div className="flex items-center gap-x-4">
              <Button variant="ghost" type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                type="button"
                onClick={() => setModal(true)}
              >
                Remove
              </Button>
              <Button
                type="submit"
                disabled={update.isLoading || remove.isLoading}
              >
                Update
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
                  {remove.isLoading && (
                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Form>
      )}
    </MainContent>
  );
};

export default AddressDetail;
