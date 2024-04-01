import { useDocumentTitle } from "@/shared/hooks";
import { useGetPaymentMethods } from "@/shared/features/payment-method";
import { EmptyState } from "@/shared/components";
import { Card } from "@/components";
import { CardItem } from "../components/card-item";

export const Cards = () => {
  useDocumentTitle("Cards");
  const { data: cards, isLoading, isError, error } = useGetPaymentMethods();

  return (
    <div className="max-w-2xl space-y-4">
      <section>
        <h3 className="text-lg font-medium">Cards</h3>
        <p className="text-sm text-muted-foreground">Manage your cards.</p>
      </section>

      <section>
        {isLoading ? (
          <Card className="divide-y divide-black/10">
            <CardItem.Skeleton />
            <CardItem.Skeleton />
            <CardItem.Skeleton />
          </Card>
        ) : isError ? (
          <EmptyState title="Error" description={error.message} />
        ) : !cards.length ? (
          <EmptyState
            title="No cards"
            description="You don't have any cards yet."
          />
        ) : (
          <Card className="divide-y divide-black/10">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </Card>
        )}
      </section>
    </div>
  );
};
