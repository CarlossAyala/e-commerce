import { QuestionItem } from "./question-item";
import { QuestionProduct } from "./question-product";

export const Question = ({ question }) => {
  return (
    <div className="divide-y divide-gray-200 rounded-md border border-gray-200">
      <QuestionProduct product={question.product} />
      <QuestionItem question={question} />
    </div>
  );
};

Question.Skeleton = function QuestionSkeleton() {
  return (
    <div className="divide-y divide-gray-200 rounded-md border border-gray-200">
      <QuestionProduct.Skeleton />
      <QuestionItem.Skeleton />
    </div>
  );
};
