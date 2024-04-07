import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
import { useDeleteStore } from "../queries";
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
    <section className="space-y-4 px-6">
      <div>
        <h3 className="text-lg font-medium">Delete Store</h3>
        <p className="text-sm text-muted-foreground">
          Delete all data related to your store.
        </p>
      </div>

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
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading && <Spinner className="mr-2 size-4" />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        type="button"
        variant="destructive"
        onClick={() => setDialog(true)}
        disabled={isLoading}
      >
        Delete
      </Button>
    </section>
  );
};
