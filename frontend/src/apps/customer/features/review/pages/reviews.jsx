import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../components";
import ReviewsDone from "./reviews-done";
import ReviewsPending from "./reviews-pending";

const Reviews = () => {
  return (
    <main className="container max-w-4xl space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Reviews
        </h2>
        <p className="text-muted-foreground">
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

export default Reviews;
