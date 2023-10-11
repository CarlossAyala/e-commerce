import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useGetProfile } from "../../../../../libs/auth";
import {
  Button,
  EmptyPlaceholder,
  Skeleton,
  SkeletonInput,
} from "../../../../../components";
import { ProfileForm } from "../components/profile-form";
import { PasswordForm } from "../components/password-form";

const Account = () => {
  const {
    data: profile,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProfile();

  return (
    <div className="space-y-10">
      {isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching profile
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {isLoading && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <SkeletonInput />
            <SkeletonInput />
            <Button.Skeleton />
          </div>
          <div className="space-y-4">
            <div className="space-y-2 sm:col-span-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
            <SkeletonInput />
            <SkeletonInput />
            <SkeletonInput />
            <Button.Skeleton />
          </div>
        </>
      )}
      {isSuccess && (
        <>
          <ProfileForm profile={profile} />
          <PasswordForm />
        </>
      )}
    </div>
  );
};

export default Account;
