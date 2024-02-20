import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";
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
} from "../../../../../components";
import { addressActionRoutes } from "../utils";
import { useRemoveAddress } from "../queries";

export const AddressItem = ({ address }) => {
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const remove = useRemoveAddress();

  const handleRemove = () => {
    remove.mutate(address.id, {
      onSuccess() {
        toast("Address removed");
        setAlert(false);
        remove.reset();
      },
      onError(error) {
        setAlert(false);
        remove.reset();
        toast.message("Address could not be removed", {
          description: error.message,
        });
      },
    });
  };

  return (
    <>
      <div className="flex w-full gap-x-4 p-4">
        <div className="grow text-sm leading-tight">
          <p className="line-clamp-1 font-medium">{address.street}</p>
          <p className="line-clamp-1 text-muted-foreground">
            {`${address.province} (${address.zipCode})`}, {address.city}
          </p>
          <p className="line-clamp-1 text-muted-foreground">
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
              onSelect={() => navigate(addressActionRoutes.detail(address.id))}
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
    <div className="flex gap-x-4 p-4">
      <div className="grow space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-9 w-9 shrink-0" />
    </div>
  );
};
