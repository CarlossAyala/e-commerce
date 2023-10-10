import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Skeleton,
} from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";

export const QuestionItem = ({ question }) => {
  const isAnswered = question.states === "answered";
  const isRejected = question.states === "rejected";
  const isQueue = question.states === "queue";

  return (
    <Accordion type="single" collapsible disabled={isRejected}>
      <AccordionItem value={question.id}>
        <AccordionTrigger className="gap-4 px-4 py-3 text-left">
          <div className="grow space-y-1">
            <div className="flex w-full items-center justify-between">
              <Badge variant="outline" className="capitalize">
                {question.states}
              </Badge>
              <p className="text-xs font-normal leading-tight text-muted-foreground">
                {Formatter.shortDate(question.createdAt)}
              </p>
            </div>
            <p className="font-normal">{question.question}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3 text-sm font-normal leading-tight text-muted-foreground">
          {isAnswered && question.answer?.answer}
          {isQueue && <span className="italic">Not answered yet</span>}
          {isRejected && <span className="italic">Answer rejected</span>}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

QuestionItem.Skeleton = function QuestionItemSkeleton() {
  return (
    <div className="space-y-2 px-4 py-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-5 w-full" />
    </div>
  );
};
