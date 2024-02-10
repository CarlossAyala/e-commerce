import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components";
import { ReviewsDone } from "./reviews-done";
import { ReviewsPending } from "./reviews-pending";
import { useDocumentTitle } from "../../../../../hooks";

const TABS = {
  PENDING: "pending",
  DONE: "done",
};

export const Reviews = () => {
  const [params, setParams] = useSearchParams();
  useDocumentTitle("Reviews");

  const tab = Object.values(TABS).includes(params.get("tab"))
    ? params.get("tab")
    : TABS.PENDING;

  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Here you will see a list of all the reviews you have made.
        </p>
      </section>

      <Tabs value={tab}>
        <TabsList>
          <TabsTrigger
            value={TABS.PENDING}
            onClick={() => setParams({ tab: TABS.PENDING })}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value={TABS.DONE}
            onClick={() => setParams({ tab: TABS.DONE })}
          >
            Done
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TABS.PENDING}>
          <ReviewsPending />
        </TabsContent>
        <TabsContent value={TABS.DONE}>
          <ReviewsDone />
        </TabsContent>
      </Tabs>
    </main>
  );
};
