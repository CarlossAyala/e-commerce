import { useGetProductQuestions } from "../../../question";
import { QuestionProductItem } from "./question-item/question-product-item";

export const ProductQuestions = ({ productId }) => {
  const {
    data: questions,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductQuestions(productId);

  const hasContent = isSuccess && questions.rows.length > 0;
  const isEmpty = isSuccess && questions.rows.length === 0;

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <QuestionProductItem.Skeleton />
          <QuestionProductItem.Skeleton />
          <QuestionProductItem.Skeleton />
          <QuestionProductItem.Skeleton />
          <QuestionProductItem.Skeleton />
          <QuestionProductItem.Skeleton />
        </>
      )}
      {isEmpty && (
        <QuestionProductItem.Empty message="No questions yet. Be the first to ask a question" />
      )}
      {isError && <QuestionProductItem.Error />}
      {hasContent &&
        questions.rows.map((question) => (
          <QuestionProductItem key={question.id} question={question} />
        ))}
    </div>
  );
};
