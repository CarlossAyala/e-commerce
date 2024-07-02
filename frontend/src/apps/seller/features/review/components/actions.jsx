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
  SheetTrigger,
} from "@/shared/components";
import { Formatter } from "@/shared/utils";
import { reviewActionRoutes } from "../utils";

export const ReviewTimelineAction = ({ review }) => {
  const [sheet, setSheet] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-muted"
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
            <Link to={reviewActionRoutes.overview(review.item.productId)}>
              Overview
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent className="space-y-4">
          <SheetHeader className="space-y-2">
            <SheetTitle>Review</SheetTitle>

            <div className="text-sm">
              <h3 className="font-medium">ID</h3>
              <p className="text-muted-foreground">{review.id}</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Content</h3>
              <p className="text-muted-foreground">{review.description}</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Rating</h3>
              <p className="text-muted-foreground">{review.rating} / 5</p>
            </div>
            <div className="text-sm">
              <h3 className="font-medium">Created At</h3>
              <p className="text-muted-foreground">
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
    </>
  );
};

export const ReviewListAction = ({ review }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">View</Button>
      </SheetTrigger>

      <SheetContent className="space-y-4">
        <SheetHeader className="space-y-2">
          <SheetTitle>Review</SheetTitle>

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
