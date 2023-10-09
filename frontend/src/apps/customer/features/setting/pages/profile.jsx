import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  changeNameDefault,
  changeNameInitial,
  changeNameSchema,
  useGetProfile,
  useUpdateProfile,
} from "../../../../../libs/auth";
import {
  Button,
  EmptyPlaceholder,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SkeletonInput,
  useToast,
} from "../../../../../components";
import { ArrowPathIcon, FaceFrownIcon } from "@heroicons/react/24/outline";

const Profile = () => {
  const { toast } = useToast();

  const { data: profile, isLoading, isSuccess, isError } = useGetProfile();
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
    <div className="space-y-4">
      <section>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">About your profile.</p>
      </section>

      {isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching profile
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            An error occurred while fetching profile. Please try again later.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {isLoading && (
        <section className="grid gap-4 sm:grid-cols-2">
          <SkeletonInput />
          <SkeletonInput />
          <Button.Skeleton />
        </section>
      )}
      {isSuccess && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)}>
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
      )}
    </div>
  );
};

export default Profile;
