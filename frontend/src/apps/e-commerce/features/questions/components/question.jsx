import { ProductCardRow } from "@/apps/e-commerce/components";
import { Card } from "@/components";
import { QuestionItem } from "./question-item";

export const Question = ({ question }) => {
  return (
    <Card className="divide-y">
      <div className="p-4">
        <ProductCardRow product={question.product} />
      </div>
      <QuestionItem question={question} />
    </Card>
  );
};

Question.Skeleton = function QuestionSkeleton() {
  return (
    <Card className="divide-y">
      <div className="p-4">
        <ProductCardRow.Skeleton />
      </div>
      <QuestionItem.Skeleton />
    </Card>
  );
};
