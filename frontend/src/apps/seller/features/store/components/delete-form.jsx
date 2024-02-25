import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Spinner,
} from "@/components";
import { useDeleteStore } from "../queries";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SELLER_STORE_NAV } from "../utils";

export const DeleteForm = () => {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);

  const { mutate, isLoading } = useDeleteStore();

  const handleDelete = () => {
    mutate(null, {
      onSuccess() {
        toast("Store deleted successfully");
        navigate(SELLER_STORE_NAV.create);
      },
    });
  };

  return (
    <>
      <section className="space-y-4">
        <div className="space-y-1.5">
          <h2 className="font-medium leading-none tracking-tight">Delete</h2>
          <p className="text-sm text-muted-foreground">
            Delete all data related to your store.
          </p>
        </div>

        <Button
          type="button"
          variant="destructive"
          onClick={() => setDialog(true)}
          disabled={isLoading}
        >
          Delete
        </Button>
      </section>

      <AlertDialog open={dialog} onOpenChange={setDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete store</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              {isLoading && <Spinner className="mr-2 size-4" />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
