import { createColumnHelper } from "@tanstack/react-table";
import { RequestVerifyStatus } from "@/shared/components";
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
} from "@/components";
import { Formatter } from "@/utils";

const { accessor, display } = createColumnHelper();

export const requestsVerifyColumns = [
  accessor("description", {
    header: () => "Description",
    cell: (info) => (
      <div className="flex max-w-md">
        <span className="truncate py-1 font-medium">{info.getValue()}</span>
      </div>
    ),
  }),
  accessor("status", {
    header: () => "Status",
    cell: (info) => <RequestVerifyStatus status={info.getValue()} />,
  }),
  accessor("createdAt", {
    header: () => "Created At",
    cell: (info) => Formatter.fullDate(info.getValue()),
  }),
  display({
    id: "actions",
    cell: (info) => (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link">View</Button>
        </SheetTrigger>
        <SheetContent className="space-y-2">
          <SheetHeader>
            <SheetTitle>Request verify</SheetTitle>
            <SheetDescription>
              Check how are going your request for your store
            </SheetDescription>
          </SheetHeader>

          <section>
            <h4 className="text-sm font-medium">Status</h4>
            <RequestVerifyStatus status={info.row.original.status} />
          </section>
          <section className="text-sm">
            <h4 className="font-medium">Description</h4>
            <p className="text-muted-foreground">
              {info.row.original.description}
            </p>
          </section>
          <section className="text-sm">
            <h4 className="font-medium">Created At</h4>
            <p className="text-muted-foreground">
              {Formatter.fullDate(info.row.original.createdAt)}
            </p>
          </section>

          {info.row.original.status !== "queue" && (
            <>
              <h3 className="font-semibold">Administration</h3>

              <section className="text-sm">
                <h4 className="font-medium">Response</h4>
                <p className="text-muted-foreground">
                  {info.row.original.response}
                </p>
              </section>
              <section className="text-sm">
                <h4 className="font-medium">Created At</h4>
                <p className="text-muted-foreground">
                  {Formatter.fullDate(info.row.original.updatedAt)}
                </p>
              </section>
            </>
          )}

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  }),
];
