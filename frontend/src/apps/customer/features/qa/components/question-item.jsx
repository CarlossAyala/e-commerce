import { Skeleton } from "@/components";
import { Formatter } from "@/utils";

export const QuestionItem = ({ question }) => {
  const isQueue = question.status === "queue";
  const isRejected = question.status === "rejected";

  return (
    <div className="space-y-2 p-4">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          {Formatter.fullDate(question.createdAt)}
        </p>
        <p className="text-sm font-medium">{question.content}</p>
      </div>

      {isQueue ? (
        <p className="text-sm italic text-muted-foreground">Not answered yet</p>
      ) : isRejected ? (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            {Formatter.fullDate(question.createdAt)}
          </p>
          <p className="text-sm text-muted-foreground text-red-600">Rejected</p>
        </div>
      ) : (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            {Formatter.fullDate(question.createdAt)}
          </p>
          <p className="text-sm">{question.answer.content}</p>
        </div>
      )}
    </div>
  );
};

QuestionItem.Skeleton = function QuestionItemSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};
