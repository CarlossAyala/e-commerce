import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "@/shared/hooks";
import {
  Filters,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { ReviewsDone } from "./reviews-done";
import { ReviewsPending } from "./reviews-pending";

const filters = [
  {
    filter_type: "search",
  },
];
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
    <main className="container max-w-3xl flex-1 space-y-3">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Here you will see a list of all the reviews you have made.
        </p>
      </section>

      <Tabs value={tab} className="space-y-3">
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

        <Filters filters={filters} />

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
