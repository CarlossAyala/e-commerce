import { Fragment, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  DataTable,
  Search,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  IconButton,
  SkeletonText,
  Modal,
  TextArea,
} from '@carbon/react';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';
import { useDebounce } from '../utils/hooks';
import {
  QUESTION_STATES,
  answerQuestionInitial,
  answerQuestionSchema,
  useGetProduct,
  useGetQuestion,
  useProductQuestions,
  useSendAnswerToQuestion,
  useSendStateQuestion,
} from '../features/product';
import { customRows } from '../utils/tables';
import { customHeaders } from '../utils/tables/custom-headers';
import { Edit, Error } from '@carbon/icons-react';
import { getTimeAgo } from '../utils/date';
import { priceFormater } from '../utils/formater';
import { Form, Formik } from 'formik';

const headersData = [
  {
    key: 'customer',
    header: 'Customer',
  },
  {
    key: 'createdAt',
    header: 'Asked',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'action',
    header: 'Actions',
  },
  {
    key: 'question',
    header: 'Cuestion',
  },
];
const headersWanted = ['createdAt', 'status', 'action'];

const ProductQuestions = () => {
  const [params, setParams] = useSearchParams();
  const { id } = useParams();

  const [modalEdit, setModalEdit] = useState(false);
  const [modalStates, setModalStates] = useState(false);
  const [questionId, setQuestionId] = useState('');
  const [search, setSearch] = useState(params.get('q') || '');

  const debouncedQuery = useDebounce(params.toString());

  const question = useGetQuestion(questionId);
  const questions = useProductQuestions(id, debouncedQuery);
  const product = useGetProduct(id);
  const sendAnswer = useSendAnswerToQuestion();
  const sendState = useSendStateQuestion();
  // console.log('Question', question);
  // console.log('Questions', questions);
  // console.log('Product', product);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    setParams((prev) => {
      prev.delete('q');

      if (search !== '') prev.set('q', search);

      return prev;
    });
  };

  const handlePagination = (e) => {
    const page = getPage(e.page);
    const pageSize = getPageSize(e.pageSize);

    setParams((prev) => {
      prev.delete('page');
      prev.delete('limit');

      if (page !== DEFAULT_PAGE) prev.set('page', page);
      if (pageSize !== DEFAULT_PAGE_SIZE) prev.set('limit', pageSize);

      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setParams((prev) => {
      prev.delete('q');
      prev.delete('page');
      prev.delete('limit');

      return prev;
    });
  };

  const rowsData = questions.data?.rows.map((question) => ({
    id: question.id,
    customer: question.customer.name,
    createdAt: question.createdAt,
    status: question.states,
    action: 'Ver',
    question: question.question,
  }));

  const thereQuery = debouncedQuery !== '';

  const noResult = questions.data?.count === 0 && thereQuery;
  const isEmpty = questions.data?.count === 0 && !thereQuery;

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Product Questions</h1>
      </section>

      <section className='px-4 pt-4'>
        {product.isFetched && product.data ? (
          <h2 className='mb-2 text-xl'>Product</h2>
        ) : null}
        {product.isLoading ? (
          <>
            <h2 className='mb-2 text-xl'>Product</h2>
            <div className='grid grid-cols-2 gap-4 bg-gray-100 p-4'>
              <div>
                <div className='mb-2 w-16'>
                  <SkeletonText style={{ margin: '0' }} />
                </div>
                <SkeletonText style={{ margin: '0' }} />
              </div>
              <div>
                <div className='mb-2 w-16'>
                  <SkeletonText style={{ margin: '0' }} />
                </div>
                <SkeletonText style={{ margin: '0' }} />
              </div>
              <div>
                <div className='mb-2 w-16'>
                  <SkeletonText style={{ margin: '0' }} />
                </div>
                <SkeletonText style={{ margin: '0' }} />
              </div>
              <div>
                <div className='mb-2 w-16'>
                  <SkeletonText style={{ margin: '0' }} />
                </div>
                <SkeletonText style={{ margin: '0' }} />
              </div>
            </div>
          </>
        ) : null}
        {product.isFetched && product.data ? (
          <div>
            <Link
              className='grid grid-cols-2 gap-4 bg-gray-100 px-4 py-3'
              to={`/product/view/${product.data.id}`}
              target='_blank'
            >
              <div>
                <h3 className='text-sm font-semibold text-black'>Name</h3>
                <h4 className='text-base font-medium text-gray-600'>
                  {product.data.name}
                </h4>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-black'>Price</h3>
                <h4 className='text-sm font-medium text-gray-600'>
                  {priceFormater(product.data.price)}
                </h4>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-black'>Sold</h3>
                <h4 className='text-sm font-medium text-gray-600'>
                  {product.data.sold}
                </h4>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-black'>Status</h3>
                {product.data.status ? (
                  <span className='items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                    Available
                  </span>
                ) : (
                  <span className='items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                    Unavailable
                  </span>
                )}
              </div>
            </Link>
          </div>
        ) : null}
      </section>

      <section className='space-y-2 p-4'>
        <h2 className='mb-2 text-xl'>Questions</h2>
        {!isEmpty && (
          <Search
            id='question-search'
            size='lg'
            labelText='Search product'
            className='mb-2'
            onChange={handleSearch}
            value={search}
          />
        )}

        {questions.isLoading && (
          <DataTableSkeleton columnCount={2} rowCount={6} />
        )}

        {questions.isFetched && isEmpty ? (
          <div>
            <h3 className='text-base font-medium'>
              There are no questions about this product
            </h3>
          </div>
        ) : null}

        {questions.isFetched && questions.data?.count > 0 ? (
          <>
            <DataTable rows={rowsData} headers={headersData}>
              {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
              }) => {
                const modifyRows = customRows(rows);
                const modifyHeaders = customHeaders(headers, headersWanted);

                return (
                  <TableContainer
                    title='Questions'
                    description='All questions about your products appear here.'
                  >
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          <TableExpandHeader />
                          {modifyHeaders.map((header) => (
                            <TableHeader
                              key={header.key}
                              {...getHeaderProps({ header })}
                            >
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {modifyRows.map((row) => (
                          <Fragment key={row.id}>
                            <TableExpandRow {...getRowProps({ row })}>
                              <TableCell>
                                {getTimeAgo(row.values.createdAt)}
                              </TableCell>
                              <TableCell>
                                <span className='items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium capitalize text-orange-700 ring-1 ring-inset ring-orange-600/20'>
                                  {row.values.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className='flex items-center gap-x-2'>
                                  <IconButton
                                    align='top'
                                    label='Respond'
                                    size='sm'
                                    kind='ghost'
                                    onClick={() => {
                                      setQuestionId(row.id);
                                      setModalEdit(true);
                                    }}
                                  >
                                    <Edit size='16' />
                                  </IconButton>
                                  <IconButton
                                    align='top'
                                    label='Reject'
                                    size='sm'
                                    kind='ghost'
                                    onClick={() => {
                                      setQuestionId(row.id);
                                      setModalStates(true);
                                    }}
                                  >
                                    <Error size='16' />
                                  </IconButton>
                                </div>
                              </TableCell>
                            </TableExpandRow>
                            {row.isExpanded && (
                              <>
                                <TableExpandedRow
                                  colSpan={modifyHeaders.length + 1}
                                >
                                  <div className='py-2'>
                                    <div className='mb-2'>
                                      <h4 className='mb-1 text-sm font-semibold leading-none'>
                                        Customer
                                      </h4>
                                      <p className='text-sm text-gray-600'>
                                        {row.values.customer}
                                      </p>
                                    </div>
                                    <div className=''>
                                      <h4 className='mb-1 text-sm font-semibold leading-none'>
                                        Question
                                      </h4>
                                      <p className='text-sm italic text-gray-600'>
                                        {row.values.question}
                                      </p>
                                    </div>
                                  </div>
                                </TableExpandedRow>
                              </>
                            )}
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                );
              }}
            </DataTable>

            <Formik
              initialValues={answerQuestionInitial}
              validationSchema={answerQuestionSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  console.log('onEditSubmit', values);
                  const answer = await sendAnswer.mutateAsync({
                    id: questionId,
                    values,
                  });
                  console.log('ANSWER CREATED', answer);
                  setModalEdit(false);
                  setQuestionId(null);
                  resetForm();
                } catch (error) {
                  setModalEdit(false);
                  setQuestionId(null);
                  resetForm();
                  console.log('Product Questions');
                  console.log('onEditSubmit', error);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                submitForm,
              }) => (
                <Form>
                  <Modal
                    open={modalEdit}
                    modalLabel={
                      question.isFetched && question.data
                        ? `Asked ${getTimeAgo(question.data.createdAt)}`
                        : 'Loading...'
                    }
                    modalHeading={
                      question.isFetched && question.data
                        ? `Respond to ${question.data.customer.name}`
                        : 'Loading...'
                    }
                    primaryButtonText='Send'
                    secondaryButtonText='Cancel'
                    onRequestClose={() => setModalEdit(false)}
                    onRequestSubmit={async () => {
                      try {
                        await submitForm();
                      } catch (error) {
                        console.log('Product Questions');
                        console.log('onRequestSubmit', error);
                      }
                    }}
                  >
                    <div className='mb-4'>
                      <p className='mb-2 text-sm font-semibold leading-none'>
                        Question
                      </p>
                      <p className='text-sm italic text-gray-600'>
                        {question.isFetched && question.data
                          ? question.data.question
                          : 'Loading...'}
                      </p>
                    </div>
                    <div className=''>
                      <p className='mb-2 text-sm font-semibold leading-none'>
                        Your response
                      </p>
                      <TextArea
                        id={`question-product-${questionId}`}
                        name='answer'
                        data-modal-primary-focus
                        labelText='Answer'
                        placeholder='Write your response here'
                        enableCounter
                        maxCount={255}
                        invalidText={errors.answer}
                        invalid={errors.answer && touched.answer}
                        value={values.answer}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </Modal>
                </Form>
              )}
            </Formik>

            <Modal
              open={modalStates}
              modalLabel={
                question.isFetched && question.data
                  ? `Asked ${getTimeAgo(question.data.createdAt)}`
                  : 'Loading...'
              }
              modalHeading={
                question.isFetched && question.data
                  ? `Respond to ${question.data.customer.name}`
                  : 'Loading...'
              }
              danger
              primaryButtonText='Reject'
              secondaryButtonText='Cancel'
              onRequestClose={() => setModalStates(false)}
              onRequestSubmit={async () => {
                try {
                  const newState = await sendState.mutateAsync({
                    id: questionId,
                    values: {
                      states: QUESTION_STATES.REJECTED,
                    },
                  });
                  console.log('STATES CREATED', newState);
                  setModalStates(false);
                  setQuestionId(null);
                } catch (error) {
                  setModalStates(false);
                  setQuestionId(null);
                  console.log('Product Questions');
                  console.log('onStatesSubmit', error);
                }
              }}
            >
              <div className='mb-4'>
                <p className='mb-2 text-sm font-semibold leading-none'>
                  Question
                </p>
                <p className='text-sm italic text-gray-600'>
                  {question.isFetched && question.data
                    ? question.data.question
                    : 'Loading...'}
                </p>
              </div>
              <h3 className='text-base leading-none'>
                You want <strong>Reject</strong> this question?
              </h3>
            </Modal>

            <Pagination
              backwardText='Previous page'
              forwardText='Next page'
              itemsPerPageText='Items per page:'
              page={getPage(params.get('page'))}
              size='md'
              pageNumberText='Page Number'
              pageSize={getPageSize(params.get('limit'))}
              pageSizes={PAGE_SIZES}
              totalItems={questions.data?.count}
              onChange={handlePagination}
            />
          </>
        ) : null}
      </section>
    </main>
  );
};

export default ProductQuestions;
