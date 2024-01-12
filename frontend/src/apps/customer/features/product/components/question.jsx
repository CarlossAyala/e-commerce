import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils";

export const Question = ({ question }) => {
  return (
    <div className="rounded-md border p-2">
      <p className="text-right text-sm leading-tight text-muted-foreground">
        {Formatter.shortDate(new Date())}
      </p>
      <p className="text-sm leading-tight">{question.question}</p>
      <div className="mt-1 flex items-start gap-x-1 text-muted-foreground">
        <ChevronDoubleRightIcon className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="text-sm leading-tight">{question.answer.answer}</p>
      </div>
    </div>
  );
};

Question.Skeleton = function QuestionSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2 rounded-md border p-2">
          <Skeleton className="ml-auto h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex items-start gap-1">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
