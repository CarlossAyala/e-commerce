import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  ButtonSkeleton,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputSkeleton,
  Textarea,
  TextareaSkeleton,
} from "../../../../../components";
import { useGetAddress, useRemoveAddress, useUpdateAddress } from "../queries";
import { addressDefault, addressInitial, addressSchema } from "../schemas";
import { clearEmptyValues } from "../../../../../utils";
import { addressActionRoutes } from "../utils";
import { useDocumentTitle } from "../../../../../hooks";
import { toast } from "sonner";

const AddressDetail = () => {
  const [modal, setModal] = useState(false);

  const { addressId } = useParams();

  const navigate = useNavigate();
  useDocumentTitle("Address Details");

  const { data: address, isLoading, isError, error } = useGetAddress(addressId);
  const update = useUpdateAddress();
  const remove = useRemoveAddress();

  const form = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: addressInitial,
    values: addressDefault(address),
    mode: "all",
  });

  const handleUpdate = (values) => {
    const _values = clearEmptyValues(values);

    update.mutate([addressId, _values], {
      onSuccess() {
        toast("Address updated successfully");
        setTimeout(update.reset, 1300);
      },
      onError(error) {
        toast.message("Address could not be updated", {
          description: error.message,
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
          description: error.message,
        });
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
              <ButtonSkeleton />
              <ButtonSkeleton />
              <ButtonSkeleton />
            </div>
          </div>
        ) : isError ? (
          <EmptyPlaceholder title={error.name} description={error.message} />
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
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
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
      </section>
    </div>
  );
};

export default AddressDetail;
