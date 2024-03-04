import { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components";
import { reviewActionRoutes } from "../utils";
import { Formatter } from "@/utils";

export const ReviewTimelineTableAction = ({ row }) => {
  const [sheet, setSheet] = useState(false);

  const review = row.original;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => setSheet(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={reviewActionRoutes.list(review.item.productId)}>
              List
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheet} onOpenChange={setSheet}>
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
              <p className="text-sm text-muted-foreground">
                {review.rating} / 5
              </p>
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
    </>
  );
};
