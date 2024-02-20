import { useForm } from "react-hook-form";
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
import {
  changePasswordInitial,
  changePasswordSchema,
  useUpdatePassword,
} from "../../../../../libs/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export const PasswordForm = () => {
  const updatePassword = useUpdatePassword();

  const form = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: changePasswordInitial,
    mode: "all",
  });

  const handleSave = (values) => {
    updatePassword.mutate(values, {
      onSuccess() {
        toast({
          description: "Password updated",
        });
        form.reset();
      },
      onError(error) {
        toast({
          title: "Error updating password",
          description: error.message,
        });
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

        <Button
          type="submit"
          className="mt-4"
          disabled={updatePassword.isLoading}
        >
          {updatePassword.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
