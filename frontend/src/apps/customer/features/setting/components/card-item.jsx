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
  DropdownMenuTrigger,
  Skeleton,
  useToast,
} from "../../../../../components";
import { useRemovePaymentMethod } from "../../../../common/payment-method";
import { useState } from "react";

export const CardItem = ({ card }) => {
  const [alert, setAlert] = useState(false);

  const { toast } = useToast();

  const remove = useRemovePaymentMethod();

  const handleRemove = () => {
    remove.mutate(card.id, {
      onSuccess() {
        toast({
          description: "Card removed",
        });
        setAlert(false);
        remove.reset();
      },
      onError(error) {
        setAlert(false);
        remove.reset();
        toast({
          variant: "destructive",
          title: "Card could not be removed",
          description: error?.message ?? "Uh oh! Something went wrong.",
        });
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
            className="h-9 w-9 shrink-0 data-[state=open]:bg-muted"
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
  );
};

CardItem.Skeleton = function CardItemSkeleton() {
  return (
    <div className="space-y-1 p-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  );
};
