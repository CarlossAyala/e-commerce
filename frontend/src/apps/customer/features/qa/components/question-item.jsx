import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Skeleton,
} from "../../../../../components";
import { Formatter } from "../../../../../utils/formatter";

const QUESTION_STATUS = {
  answered: <Badge>Answered</Badge>,
  queue: <Badge variant="outline">Queue</Badge>,
  rejected: <Badge variant="destructive">Rejected</Badge>,
};

export const QuestionItem = ({ question }) => {
  const isQueue = question.states === "queue";
  const isRejected = question.states === "rejected";

  const status = QUESTION_STATUS[question.states];

  return (
    <Accordion type="single" collapsible disabled={isRejected}>
      <AccordionItem value={question.id}>
        <AccordionTrigger className="gap-4 px-4 py-3 text-left">
          <div className="grow space-y-1">
            <div className="flex w-full items-center justify-between">
              {status}
              <p className="text-xs font-normal leading-tight text-muted-foreground">
                {Formatter.fullDate(question.createdAt)}
              </p>
            </div>
            <p className="leading-snug">{question.question}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-1 px-4 pb-2 text-sm leading-tight text-muted-foreground">
          {isQueue ? (
            <span className="italic">Not answered yet</span>
          ) : isRejected ? (
            <span className="italic">Answer rejected</span>
          ) : (
            <>
              <p className="indent-4">{question.answer.answer}</p>
              <p className="text-right text-xs leading-tight text-muted-foreground">
                {Formatter.fullDate(question.createdAt)}
              </p>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

QuestionItem.Skeleton = function QuestionItemSkeleton() {
  return (
    <div className="space-y-2 px-4 py-3">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="h-5 w-full" />
    </div>
  );
};
