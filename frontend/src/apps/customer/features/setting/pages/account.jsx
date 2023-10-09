import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { Button, EmptyPlaceholder, Skeleton } from "../../../../../components";
import { useGetProfile } from "../../../../../libs/auth";

const Account = () => {
  const { data: profile, isLoading, isSuccess, isError } = useGetProfile();

  return (
    <div className="space-y-4">
      <section>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </section>

      {isLoading && (
        <section className="space-y-6">
          <div>
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div>
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="h-6 w-full" />
            <Button.Skeleton className="mt-4 w-28" />
          </div>
        </section>
      )}
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
      {isSuccess && (
        <section className="space-y-6">
          <div>
            <h4 className="mb-1 text-sm font-semibold leading-tight">Email</h4>
            <p className="text-sm font-normal leading-tight">{profile.email}</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold leading-tight">
              Delete Account
            </h4>
            <p className="text-sm font-normal leading-tight text-muted-foreground">
              This will delete your account and all of its data. You will not be
              able to recover it. Please be certain before proceeding. This
              action cannot be undone.
            </p>
            <Button variant="destructive" className="mt-2">
              TODO: Delete Account
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Account;
