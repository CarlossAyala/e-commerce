import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "./skeleton";
import { Empty } from "./empty";
import { Error } from "./error";

export const QuestionProductItem = ({ question }) => {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium leading-tight">{question.question}</p>
      <div className="flex items-start gap-x-1.5">
        <ChevronDoubleRightIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <p className="text-sm leading-tight">{question.answer.answer}</p>
      </div>
    </div>
  );
};

QuestionProductItem.Skeleton = Skeleton;
QuestionProductItem.Empty = Empty;
QuestionProductItem.Error = Error;
