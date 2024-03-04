import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components";
import { Formatter } from "@/utils";

export const ReviewListTableAction = ({ row }) => {
  const review = row.original;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">View</Button>
      </SheetTrigger>

      <SheetContent className="space-y-4 py-2">
        <SheetHeader className="space-y-2">
          <SheetTitle className="uppercase">Review</SheetTitle>

          <div>
            <h3 className="text-sm font-medium">ID</h3>
            <p className="text-sm text-muted-foreground">{review.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Content</h3>
            <p className="text-sm text-muted-foreground">
              {review.description}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Rating</h3>
            <p className="text-sm text-muted-foreground">{review.rating} / 5</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Created At</h3>
            <p className="text-sm text-muted-foreground">
              {Formatter.shortDate(review.createdAt)}
            </p>
          </div>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
