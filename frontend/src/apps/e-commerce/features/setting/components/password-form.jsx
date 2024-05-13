import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import {
  changePasswordInitial,
  changePasswordSchema,
  useUpdatePassword,
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
} from "@/components";

export const PasswordForm = () => {
  const updatePassword = useUpdatePassword();

  const form = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: changePasswordInitial,
    mode: "onSubmit",
  });

  const handleSave = (values) => {
    updatePassword.mutate(values, {
      onSuccess() {
        toast("Password updated");
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Change password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password associated with your account.
          </p>
        </div>

        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={updatePassword.isLoading}>
          {updatePassword.isLoading && (
            <ArrowPathIcon className="mr-2 size-4" />
          )}
          Update
        </Button>
      </form>
    </Form>
  );
};
