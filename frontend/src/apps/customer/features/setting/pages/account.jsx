import { useGetProfile } from "@/shared/auth";
import { useDocumentTitle } from "@/shared/hooks";
import { EmptyState } from "@/shared/components";
import { InputSkeleton, Skeleton } from "@/components";
import { ProfileForm } from "../components/profile-form";
import { PasswordForm } from "../components/password-form";

// TODO: Add profile photo logic
export const Account = () => {
  useDocumentTitle("Account");
  const { data: customer, isLoading, isError, error } = useGetProfile();

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
            <Skeleton className="h-9 w-16" />
          </div>
          <div className="space-y-4">
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <Skeleton className="h-9 w-16" />
          </div>
        </>
      ) : isError ? (
        <EmptyState title="Error" description={error.message} />
      ) : (
        <>
          <ProfileForm profile={customer} />
          <PasswordForm />
        </>
      )}
    </div>
  );
};
