import {
  ArchiveBoxXMarkIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, EmptyPlaceholder } from "../../../../../components";
import { useGetPaymentMethods } from "../../../../common/payment-method";
import { CardItem } from "../components/card-item";

const Cards = () => {
  const { data: cards, isLoading, isSuccess, isError } = useGetPaymentMethods();

  const hasContent = isSuccess && cards.length > 0;
  const isEmpty = isSuccess && cards.length === 0;

  return (
    <div className="space-y-4">
      <section>
        <h3 className="text-lg font-medium">Cards</h3>
        <p className="text-sm text-muted-foreground">Manage your cards.</p>
      </section>

      <section>
        {isLoading && (
          <Card>
            <div className="divide-y divide-black/10">
              <CardItem.Skeleton />
              <CardItem.Skeleton />
              <CardItem.Skeleton />
              <CardItem.Skeleton />
            </div>
          </Card>
        )}
        {isError && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
            <EmptyPlaceholder.Title>
              Error fetching cards
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              An error occurred while fetching addresses. Please try again
              later.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {isEmpty && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon icon={ArchiveBoxXMarkIcon} />
            <EmptyPlaceholder.Title>No cards found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any cards yet.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
        {hasContent && (
          <Card>
            <CardContent className="divide-y divide-black/10 p-0">
              {cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Cards;
