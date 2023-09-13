import {
  Button,
  DataTable,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TextArea,
} from "@carbon/react";
import { NoSymbolIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProduct } from "../features/product";
import { answerDefault, answerSchema } from "../features/qa";
import {
  useGetQA,
  useGetQAList,
  useRejectQA,
  useReplyQA,
} from "../features/qa/qa.queries";
import { Pagination } from "../features/ui";
import { ddMMYYFormatter } from "../utils/date";

const headers = [
  {
    key: "question",
    header: "Question",
  },
  {
    key: "createdAt",
    header: "Created at",
  },
  {
    key: "actions",
    header: "",
  },
];

const QuestionList = () => {
  const [questionId, setQuestionId] = useState("");
  const [modalReply, setModalReply] = useState(false);
  const [modalReject, setModalReject] = useState(false);

  const { id: productId } = useParams();

  const product = useGetProduct(productId);
  const questions = useGetQAList(productId);
  const question = useGetQA(questionId);
  const reply = useReplyQA();
  const reject = useRejectQA();

  // console.log("Product", product);
  // console.log("Questions", questions);
  // console.log("Question", question);

  const handleClickReply = (id) => {
    setQuestionId(id);
    setModalReply(true);
  };
  const handleCloseReply = () => {
    setModalReply(false);
    setQuestionId("");
  };

  const handleClickReject = (id) => {
    setQuestionId(id);
    setModalReject(true);
  };
  const handleCloseReject = () => {
    setModalReject(false);
    setQuestionId("");
  };

  const handleReply = async (values, { setSubmitting }) => {
    try {
      await reply.mutateAsync([questionId, values]);
      handleCloseReply();
    } catch (error) {
      console.log("<ProductQuestionList />");
      console.log("handleReply", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    try {
      await reject.mutateAsync([questionId]);
      handleCloseReject();
    } catch (error) {
      console.log("<ProductQuestionList />");
      console.log("handleReject", error);
    }
  };

  const rows = questions.data?.rows.map(({ id, question, createdAt }) => ({
    id,
    question: (
      <div className="min-w-[12rem]">
        <p className="line-clamp-2">{question}</p>
      </div>
    ),
    createdAt: <p>{ddMMYYFormatter(createdAt)}</p>,
    actions: (
      <div className="flex gap-x-1">
        <button
          onClick={() => handleClickReply(id)}
          title="Reply"
          className="px-2 py-1"
        >
          <PencilSquareIcon className="h-5 w-5 text-blue-600" />
        </button>
        <button
          onClick={() => handleClickReject(id)}
          title="Reject"
          className="px-2 py-1"
        >
          <NoSymbolIcon className="h-5 w-5 text-red-600" />
        </button>
      </div>
    ),
  }));

  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto bg-white">
      <section className="px-4 pt-3">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Product question list
        </h1>
        <p className="text-sm text-gray-600">
          Here will appear all product questions.
        </p>
      </section>

      <section className="px-4">
        <h3 className="text-sm leading-5 text-gray-600">Product information</h3>

        {product.isLoading ? (
          <p>Loading product...</p>
        ) : (
          <>
            {product.isSuccess && (
              <dl className="mt-1 grid grid-cols-3 gap-2 bg-gray-100 px-4 py-3">
                <div className="col-span-3">
                  <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                    Name
                  </dt>
                  <dd className="text-sm leading-tight text-gray-900">
                    <Link
                      to={`/product/${product.data.id}/view`}
                      target="_blank"
                    >
                      {product.data.name}
                    </Link>
                  </dd>
                </div>
                <div className="col-span-3">
                  <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                    Description
                  </dt>
                  <dd className="line-clamp-2 text-sm leading-tight text-gray-900">
                    {product.data.description}
                  </dd>
                </div>
              </dl>
            )}
          </>
        )}
      </section>

      {questions.isLoading ? (
        <section className="px-4">
          <p>Loading Questions...</p>
        </section>
      ) : (
        <div className="space-y-10">
          {questions.isSuccess && questions.data.rows.length === 0 && (
            <section className="px-4">
              <TableContainer
                title="Tabla questions"
                description="All questions about this product will be shown here."
              />
              <div className="border-t border-gray-300 bg-gray-100 px-4 pb-12 pt-10">
                <p className="text-base font-semibold leading-tight text-gray-900">
                  No questions yet
                </p>
                <p className="mb-4 mt-1 text-sm leading-tight text-gray-600">
                  It seems that no one has asked about this product.
                </p>

                <Button
                  disabled={questions.isLoading}
                  onClick={() => questions.refetch()}
                >
                  Refresh
                </Button>
              </div>
              {questionId && modalReply && (
                <Formik
                  initialValues={answerDefault}
                  validationSchema={answerSchema}
                  onSubmit={handleReply}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form>
                      <Modal
                        open={modalReply}
                        modalLabel="Customer question"
                        modalHeading="Reply to"
                        primaryButtonText="Reply"
                        secondaryButtonText="Cancel"
                        primaryButtonDisabled={question.isLoading}
                        onRequestSubmit={handleSubmit}
                        onSecondarySubmit={handleCloseReply}
                        onRequestClose={handleCloseReply}
                      >
                        {question.isLoading ? (
                          <p>Loading question...</p>
                        ) : (
                          <>
                            {question.isSuccess && (
                              <div>
                                <p className="text-xs leading-tight  text-gray-600">
                                  {ddMMYYFormatter(question.data.createdAt)}
                                </p>
                                <p className="mb-4 text-base leading-tight text-gray-900">
                                  {question.data.question}
                                </p>

                                <TextArea
                                  id="answer"
                                  name="answer"
                                  labelText="Answer"
                                  placeholder="Your answer"
                                  enableCounter
                                  maxCount={255}
                                  rows={5}
                                  invalidText={errors.answer}
                                  invalid={errors.answer && touched.answer}
                                  value={values.answer}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </Modal>
                    </Form>
                  )}
                </Formik>
              )}
              {questionId && modalReject && (
                <Modal
                  open={modalReject}
                  modalLabel="Customer question"
                  modalHeading="Reject to"
                  primaryButtonText="Reject"
                  secondaryButtonText="Cancel"
                  danger
                  size="sm"
                  primaryButtonDisabled={question.isLoading}
                  onRequestSubmit={handleReject}
                  onSecondarySubmit={handleCloseReject}
                  onRequestClose={handleCloseReject}
                >
                  {question.isLoading ? (
                    <p>Loading question...</p>
                  ) : (
                    <>
                      {question.isSuccess && (
                        <div>
                          <p className="text-xs leading-tight  text-gray-600">
                            {ddMMYYFormatter(question.data.createdAt)}
                          </p>
                          <p className="mb-4 text-base leading-tight text-gray-900">
                            {question.data.question}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </Modal>
              )}
            </section>
          )}

          {questions.isSuccess && questions.data.rows.length > 0 && (
            <section className="px-4">
              <DataTable
                rows={rows}
                headers={headers}
                render={({ rows, headers }) => (
                  <TableContainer
                    title="Tabla questions"
                    description="All questions about this product will be shown here."
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader id={header.key} key={header.key}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              />
              <Pagination count={question.data.count} />

              {questionId && modalReply && (
                <Formik
                  initialValues={answerDefault}
                  validationSchema={answerSchema}
                  onSubmit={handleReply}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form>
                      <Modal
                        open={modalReply}
                        modalLabel="Customer question"
                        modalHeading="Reply to"
                        primaryButtonText="Reply"
                        secondaryButtonText="Cancel"
                        primaryButtonDisabled={question.isLoading}
                        onRequestSubmit={handleSubmit}
                        onSecondarySubmit={handleCloseReply}
                        onRequestClose={handleCloseReply}
                      >
                        {question.isLoading ? (
                          <p>Loading question...</p>
                        ) : (
                          <>
                            {question.isSuccess && (
                              <div>
                                <p className="text-xs leading-tight  text-gray-600">
                                  {ddMMYYFormatter(question.data.createdAt)}
                                </p>
                                <p className="mb-4 text-base leading-tight text-gray-900">
                                  {question.data.question}
                                </p>

                                <TextArea
                                  id="answer"
                                  name="answer"
                                  labelText="Answer"
                                  placeholder="Your answer"
                                  enableCounter
                                  maxCount={255}
                                  rows={5}
                                  invalidText={errors.answer}
                                  invalid={errors.answer && touched.answer}
                                  value={values.answer}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </Modal>
                    </Form>
                  )}
                </Formik>
              )}

              {questionId && modalReject && (
                <Modal
                  open={modalReject}
                  modalLabel="Customer question"
                  modalHeading="Reject to"
                  primaryButtonText="Reject"
                  secondaryButtonText="Cancel"
                  danger
                  size="sm"
                  primaryButtonDisabled={question.isLoading}
                  onRequestSubmit={handleReject}
                  onSecondarySubmit={handleCloseReject}
                  onRequestClose={handleCloseReject}
                >
                  {question.isLoading ? (
                    <p>Loading question...</p>
                  ) : (
                    <>
                      {question.isSuccess && (
                        <div>
                          <p className="text-xs leading-tight  text-gray-600">
                            {ddMMYYFormatter(question.data.createdAt)}
                          </p>
                          <p className="mb-4 text-base leading-tight text-gray-900">
                            {question.data.question}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </Modal>
              )}
            </section>
          )}
        </div>
      )}
    </main>
  );
};

export default QuestionList;
