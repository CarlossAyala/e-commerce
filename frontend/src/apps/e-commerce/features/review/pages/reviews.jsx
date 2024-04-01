import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { ReviewsDone } from "./reviews-done";
import { ReviewsPending } from "./reviews-pending";

const TABS = {
  PENDING: "pending",
  DONE: "done",
};

export const Reviews = () => {
  useDocumentTitle("Reviews");
  const [params, setParams] = useSearchParams();

  const tab = Object.values(TABS).includes(params.get("tab"))
    ? params.get("tab")
    : TABS.DONE;

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <PageHeader>
        <PageHeaderHeading>Reviews</PageHeaderHeading>
        <PageHeaderDescription>
          Here you will see a list of all the reviews you have made.
        </PageHeaderDescription>
      </PageHeader>

      <Tabs value={tab} className="space-y-4">
        <TabsList>
          <TabsTrigger
            value={TABS.DONE}
            onClick={() => setParams({ tab: TABS.DONE })}
          >
            Done
          </TabsTrigger>
          <TabsTrigger
            value={TABS.PENDING}
            onClick={() => setParams({ tab: TABS.PENDING })}
          >
            Pending
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.DONE}>
          <ReviewsDone />
        </TabsContent>
        <TabsContent value={TABS.PENDING}>
          <ReviewsPending />
        </TabsContent>
      </Tabs>
    </main>
  );
};
