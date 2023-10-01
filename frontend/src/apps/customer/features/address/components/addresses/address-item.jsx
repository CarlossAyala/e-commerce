import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
  useToast,
} from "../../../../../../components";
import { useRemoveAddress } from "../../queries";
import { addressActionRoutes } from "../../utils";

export const AddressItem = ({ address }) => {
  const [alert, setAlert] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const remove = useRemoveAddress();

  const handleRemove = () => {
    remove.mutate(address.id, {
      onSuccess() {
        toast({
          description: "Address removed",
        });
        setAlert(false);
        remove.reset();
      },
      onError(error) {
        setAlert(false);
        remove.reset();
        toast({
          variant: "destructive",
          title: "Address could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
      },
    });
  };

  return (
    <>
      <div className="flex w-full gap-x-4 px-4 py-3">
        <div className="grow space-y-1">
          <p className="line-clamp-1 text-sm font-medium leading-tight">
            {address.street}
          </p>
          <p className="line-clamp-1 text-sm leading-tight text-muted-foreground">
            {`${address.province} (${address.zipCode})`}, {address.city}
          </p>
          <p className="line-clamp-1 text-sm leading-tight text-muted-foreground">
            {address.name} - {address.phone}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 shrink-0 data-[state=open]:bg-muted"
            >
              <EllipsisHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onSelect={() => navigate(addressActionRoutes.edit(address.id))}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center text-destructive focus:text-destructive"
              onSelect={() => setAlert(true)}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={alert} onOpenChange={setAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to remove this address?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={handleRemove}
                disabled={remove.isLoading}
              >
                {remove.isLoading && (
                  <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

AddressItem.Skeleton = function AddressItemSkeleton() {
  return (
    <div className="flex gap-x-4 px-4 py-3">
      <div className="grow space-y-1">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <Skeleton className="h-9 w-9" />
    </div>
  );
};
