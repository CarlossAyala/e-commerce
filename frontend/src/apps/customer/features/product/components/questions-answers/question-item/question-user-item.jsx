import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "./skeleton";
import { Empty } from "./empty";
import { Error } from "./error";
import { Badge } from "../../../../../../../components";
import clsx from "clsx";
import { Formatter } from "../../../../../../../utils/formatter";

export const QuestionUserItem = ({ question }) => {
  return (
    <div>
      <p className="mb-px text-sm leading-tight text-muted-foreground">
        {Formatter.longDate(question.createdAt)}
      </p>
      <p className="text-sm font-medium leading-tight">{question.question}</p>
      <div
        className={clsx(
          "mt-1.5 flex gap-x-1.5",
          question.states === "answered" ? "items-start" : "items-center",
        )}
      >
        <ChevronDoubleRightIcon className="h-4 w-4 shrink-0 text-muted-foreground" />

        {question.states === "answered" ? (
          <p className="text-sm leading-tight">{question.answer?.answer}</p>
        ) : (
          <Badge variant="outline" className="mr-2 capitalize">
            {question.states}
          </Badge>
        )}
      </div>
    </div>
  );
};

QuestionUserItem.Skeleton = Skeleton;
QuestionUserItem.Empty = Empty;
QuestionUserItem.Error = Error;
