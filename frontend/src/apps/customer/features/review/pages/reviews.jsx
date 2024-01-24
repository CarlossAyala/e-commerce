import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components";
import { ReviewsDone } from "./reviews-done";
import { ReviewsPending } from "./reviews-pending";

export const Reviews = () => {
  return (
    <main className="container max-w-3xl flex-1 space-y-4">
      <section className="mt-4">
        <h2 className="text-2xl font-semibold tracking-tight">Reviews</h2>
        <p className="text-sm text-muted-foreground">
          Here you will see a list of all the reviews you have made.
        </p>
      </section>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <ReviewsPending />
        </TabsContent>
        <TabsContent value="done">
          <ReviewsDone />
        </TabsContent>
      </Tabs>
    </main>
  );
};
