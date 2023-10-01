import { useGetProductCustomerQuestions } from "../../../question";
import { QuestionUserItem } from "./question-item/question-user-item";

export const UserQuestions = ({ productId }) => {
  const {
    data: questions,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductCustomerQuestions(productId);

  const hasContent = isSuccess && questions.rows.length > 0;
  const isEmpty = isSuccess && questions.rows.length === 0;

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <QuestionUserItem.Skeleton />
          <QuestionUserItem.Skeleton />
          <QuestionUserItem.Skeleton />
          <QuestionUserItem.Skeleton />
          <QuestionUserItem.Skeleton />
          <QuestionUserItem.Skeleton />
        </>
      )}
      {isEmpty && (
        <QuestionUserItem.Empty message="No questions yet. Make your first one!" />
      )}
      {isError && <QuestionUserItem.Error />}
      {hasContent &&
        questions.rows.map((question) => (
          <QuestionUserItem key={question.id} question={question} />
        ))}
    </div>
  );
};
