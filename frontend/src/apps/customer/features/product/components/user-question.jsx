import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Badge, Skeleton } from "../../../../../components";
import { Formatter } from "../../../../../utils";

export const UserQuestion = ({ question }) => {
  return (
    <div className="space-y-1 rounded-md border p-2">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="py-0 capitalize">
          {question.states}
        </Badge>
        <p className="text-sm text-muted-foreground">
          {Formatter.longDate(question.createdAt)}
        </p>
      </div>
      <div>
        <p className="text-sm leading-tight">{question.question}</p>
      </div>
      {question.states === "answered" && (
        <div className="flex items-start gap-x-1 text-muted-foreground">
          <ChevronDoubleRightIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-sm leading-tight">{question.answer?.answer}</p>
        </div>
      )}
    </div>
  );
};

UserQuestion.Skeleton = function UserQuestionSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2 rounded-md border p-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
