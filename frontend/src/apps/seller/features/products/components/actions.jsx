import { useState } from "react";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";
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
} from "@/components";
import { useDeleteProduct } from "../queries";

export const ProductListAction = ({ product }) => {
  const [dialog, setDialog] = useState(false);
  const { mutate, isLoading } = useDeleteProduct();

  const handleDelete = () => {
    mutate(product.id, {
      onSuccess: () => {
        toast("Product deleted successfully");
        setDialog(false);
      },
    });
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setDialog(true)}>
        <TrashIcon className="size-4" />
        <span className="sr-only">Remove</span>
      </Button>

      <AlertDialog open={dialog} onOpenChange={setDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This product will no longer be
              accessible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading && <Spinner className="mr-2 size-4" />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
