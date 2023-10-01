import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addressInitial, addressSchema } from "../schemas";
import { useCreateAddress } from "../queries";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MainContent,
  Textarea,
  useToast,
} from "../../../../../components";
import { addressActionRoutes } from "../utils";
import { clearEmptyValues } from "../../../../../utils";

const AddressNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const create = useCreateAddress();

  const form = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: addressInitial,
    mode: "all",
  });

  const handleCancel = () => {
    navigate(addressActionRoutes.root);
  };

  const handleSubmit = (values) => {
    const cleanValues = clearEmptyValues(values);

    create.mutate(cleanValues, {
      onSuccess(address) {
        toast({
          description: "Address created successfully",
        });
        navigate(addressActionRoutes.edit(address.id));
      },
      onError(error) {
        toast({
          title: "Address could not be created",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <MainContent>
      <section className="pt-2">
        <h1 className="text-2xl font-semibold tracking-tight">New Address</h1>
        <p className="text-muted-foreground">
          Create a new address for your products delivery.
        </p>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Form>
    </MainContent>
  );
};

export default AddressNew;
