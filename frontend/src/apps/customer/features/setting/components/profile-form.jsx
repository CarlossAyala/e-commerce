import { useForm } from "react-hook-form";
import {
  changeNameDefault,
  changeNameInitial,
  changeNameSchema,
  useUpdateProfile,
} from "../../../../../shared/auth";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "../../../../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export const ProfileForm = ({ profile }) => {
  const updateProfile = useUpdateProfile();

  const form = useForm({
    resolver: yupResolver(changeNameSchema),
    defaultValues: changeNameInitial,
    values: changeNameDefault(profile),
    mode: "all",
  });

  const handleSave = (values) => {
    updateProfile.mutate(values, {
      onSuccess() {
        toast({
          description: "Profile updated",
        });
      },
      onError(error) {
        toast({
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Personal Information</h3>
          <p className="text-sm text-muted-foreground">
            Update your profile information.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="mt-4"
          disabled={updateProfile.isLoading}
        >
          {updateProfile.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
