import { useState } from "react";
import { toast } from "sonner";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useRemovePaymentMethod } from "@/shared/features/payment-method";
import { Spinner } from "@/shared/components";
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
  DropdownMenuTrigger,
  Skeleton,
} from "@/components";

export const CardItem = ({ card }) => {
  const [alert, setAlert] = useState(false);

  const { mutate, isLoading } = useRemovePaymentMethod();

  const handleRemove = () => {
    mutate(card.id, {
      onSuccess() {
        toast("Card removed");
        setAlert(false);
      },
    });
  };

  return (
    <div className="flex w-full gap-x-4 p-4">
      <div className="grow">
        <p className="line-clamp-1 text-base font-semibold capitalize leading-tight">
          {card.card.brand}
        </p>
        <p className="line-clamp-1 text-sm font-normal capitalize leading-tight">
          {card.billing_details.name}
        </p>
        <p className="line-clamp-1 text-sm font-normal leading-tight"></p>
        <p className="line-clamp-1 text-sm font-normal leading-tight text-muted-foreground">
          Finished at {card.card.last4} - Expires at{" "}
          {`${card.card.exp_month}/${card.card.exp_year}`}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 data-[state=open]:bg-muted"
          >
            <EllipsisHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
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
              Are you sure you want to remove this card?
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
              disabled={isLoading}
            >
              {isLoading && <Spinner className="mr-2 size-4" />}
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

CardItem.Skeleton = function CardItemSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      <div className="grow space-y-1">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="size-9 shrink-0" />
    </div>
  );
};
