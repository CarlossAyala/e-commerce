import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components";
import { Formatter } from "@/shared/utils";

export const ReviewListAction = ({ review }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">View</Button>
      </SheetTrigger>

      <SheetContent className="space-y-4 p-4">
        <SheetHeader className="space-y-2">
          <SheetTitle>Review</SheetTitle>
          <SheetDescription className="text-sm">
            About this review
          </SheetDescription>

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
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
