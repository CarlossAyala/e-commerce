import { useGetProfile } from "../../../../../shared/auth";
import {
  ButtonSkeleton,
  EmptyPlaceholder,
  InputSkeleton,
  Skeleton,
} from "../../../../../components";
import { ProfileForm } from "../components/profile-form";
import { PasswordForm } from "../components/password-form";
import { useDocumentTitle } from "../../../../../hooks";

export const Account = () => {
  const { data: customer, isLoading, isError, error } = useGetProfile();
  useDocumentTitle("Account");

  return (
    <div className="max-w-2xl space-y-10">
      {isLoading ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <InputSkeleton />
            <ButtonSkeleton />
          </div>
          <div className="space-y-4">
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <ButtonSkeleton />
          </div>
        </>
      ) : isError ? (
        <EmptyPlaceholder title="Error" description={error.message} />
      ) : (
        <>
          <ProfileForm profile={customer} />
          <PasswordForm />
        </>
      )}
    </div>
  );
};
