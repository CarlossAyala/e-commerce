import { QuestionItem } from "./question-item";
import { QuestionProduct } from "./question-product";

export const Question = ({ question }) => {
  return (
    <div className="divide-y divide-black/10 rounded-md border border-black/10">
      <QuestionProduct product={question.product} />
      <QuestionItem question={question} />
    </div>
  );
};

Question.Skeleton = function QuestionSkeleton() {
  return (
    <div className="divide-y divide-black/10 rounded-md border border-black/10">
      <QuestionProduct.Skeleton />
      <QuestionItem.Skeleton />
    </div>
  );
};
