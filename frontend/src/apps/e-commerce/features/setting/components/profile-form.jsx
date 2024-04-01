import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  changeNameDefault,
  changeNameSchema,
  useUpdateProfile,
} from "@/shared/auth";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Spinner,
} from "@/components";

export const ProfileForm = ({ profile }) => {
  const { mutate, isLoading } = useUpdateProfile();

  const form = useForm({
    resolver: yupResolver(changeNameSchema),
    values: changeNameDefault(profile),
    mode: "onSubmit",
  });

  const handleSave = (values) => {
    mutate(values, {
      onSuccess() {
        toast("Profile updated");
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

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Spinner className="mr-2 size-4" />}
          Save
        </Button>
      </form>
    </Form>
  );
};
