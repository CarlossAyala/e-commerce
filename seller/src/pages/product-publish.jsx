import { Form, Formik } from 'formik';
import {
  PRODUCT_CONDITIONS,
  initialValues,
  usePublish,
  validationSchema,
} from '../features/product';
import {
  Button,
  TextInput,
  TextArea,
  NumberInput,
  Select,
  SelectItem,
  InlineNotification,
  Search,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableSelectRow,
  DataTableSkeleton,
  TableCell,
  Pagination,
  Checkbox,
} from '@carbon/react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';
import { useDebounce } from '../utils/hooks';
import { useSearchCategories } from '../features/category';

const productConditions = Object.values(PRODUCT_CONDITIONS);

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const ProductPublish = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('name') || '');

  const navigate = useNavigate();

  const debouncedParams = useDebounce(params.toString());
  const categories = useSearchCategories(debouncedParams);

  const publish = usePublish();

  const handleSubmit = async (values) => {
    try {
      const newProduct = await publish.mutateAsync(values);

      console.log('newProduct', newProduct);
      navigate(`/product/view/${newProduct.id}`);
    } catch (error) {
      console.log('ProductPublish', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setParams((prev) => {
      prev.delete('name');
      prev.set('name', value);
      return prev;
    });
  };

  // console.log(rows);

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Publish Product</h1>
      </section>

      <section className='my-4 px-4'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form className='w-full'>
              <div className='space-y-6'>
                <div>
                  <h2 className='mb-2 text-xl'>Product information</h2>
                  <div className='space-y-4'>
                    <TextInput
                      id='product-name'
                      name='name'
                      labelText='Name'
                      type='text'
                      placeholder='Name'
                      size='md'
                      invalidText={errors.name}
                      invalid={errors.name && touched.name}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <TextArea
                      id='product-description'
                      name='description'
                      labelText='Description'
                      type='text'
                      placeholder='Description'
                      size='xl'
                      enableCounter={true}
                      maxCount={255}
                      invalidText={errors.description}
                      invalid={errors.description && touched.description}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div>
                  <h2 className='mb-2 text-xl'>Product inventory</h2>
                  <div className='space-y-4'>
                    <div className='grid grid-cols-2 gap-x-4'>
                      <NumberInput
                        id='product-stock'
                        name='stock'
                        min={0}
                        hideSteppers
                        label='Stock'
                        invalidText={errors.stock}
                        invalid={errors.stock && touched.stock}
                        value={values.stock}
                        onChange={(e) => {
                          handleChange(e);
                          if (
                            e.target.valueAsNumber < 1 ||
                            e.target.value === ''
                          ) {
                            setFieldValue('available', false);
                          }
                        }}
                        onBlur={handleBlur}
                      />
                      <NumberInput
                        id='product-price'
                        name='price'
                        label='Price'
                        min={0}
                        hideSteppers
                        invalidText={errors.price}
                        invalid={errors.price && touched.price}
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <Select
                      id='product-condition'
                      name='condition'
                      labelText='Condition'
                      invalidText={errors.condition}
                      invalid={errors.condition && touched.condition}
                      value={values.condition}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleBlur(e)}
                    >
                      {productConditions.map((condition) => (
                        <SelectItem
                          key={condition}
                          text={condition}
                          value={condition}
                        />
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <h2 className='mb-2 text-xl'>Product Settings</h2>
                  <fieldset className='cds--fieldset'>
                    <legend className='cds--label'>Available</legend>
                    <Checkbox
                      id='product-available'
                      name='available'
                      labelText={
                        values.available ? 'Available' : 'Not Available'
                      }
                      helperText='Solamente podrás habilitar el producto cuando el Stock sea mayor a cero'
                      onChange={handleChange}
                      checked={values.available}
                      disabled={values.stock < 1 || !values.stock}
                    />
                  </fieldset>
                </div>
                <div>
                  <h2 className='mb-2 text-xl'>Product Category</h2>
                  <div className='space-y-2'>
                    {/* TODO: Agregar un Feedback cuando no se encuentre la categoría */}
                    <Search
                      id='category-search'
                      placeholder='Search for a category'
                      labelText='Search Icon'
                      onChange={handleSearch}
                      value={search}
                    />
                    {errors.categoryId && touched.categoryId && (
                      <InlineNotification
                        style={{ maxWidth: '100%' }}
                        kind='error'
                        lowContrast
                        role='alert'
                        title='Notification error'
                        subtitle={errors.categoryId}
                        hideCloseButton={true}
                        statusIconDescription='notification'
                      />
                    )}

                    {categories.isLoading && (
                      <DataTableSkeleton
                        headers={headers}
                        columnCount={headers.length}
                        showToolbar={false}
                      />
                    )}

                    {categories.isFetched && (
                      <>
                        <DataTable
                          size='lg'
                          rows={categories.data.rows.map(
                            ({ id, name, available }) => ({
                              id,
                              name: (
                                <Link to={`/categories/${id}`}>{name}</Link>
                              ),
                              status: available ? (
                                <span className='items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                                  Available
                                </span>
                              ) : (
                                <span className='items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                                  Unavailable
                                </span>
                              ),
                            })
                          )}
                          headers={headers}
                          radio
                          isSortable
                        >
                          {({
                            rows,
                            headers,
                            getHeaderProps,
                            getRowProps,
                            getSelectionProps,
                            getTableProps,
                            getTableContainerProps,
                          }) => (
                            <TableContainer
                              title='Table Categories'
                              description='Choose one category'
                              {...getTableContainerProps()}
                            >
                              <Table {...getTableProps()}>
                                <TableHead>
                                  <TableRow>
                                    <th scope='col' />
                                    {headers.map((header, i) => (
                                      <TableHeader
                                        key={i}
                                        {...getHeaderProps({ header })}
                                      >
                                        {header.header}
                                      </TableHeader>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {rows.map((row, i) => (
                                    <TableRow key={i} {...getRowProps({ row })}>
                                      <TableSelectRow
                                        {...getSelectionProps({
                                          row,
                                          onChange: () => {
                                            const e = {
                                              target: {
                                                name: 'categoryId',
                                                value: row.id,
                                              },
                                            };
                                            handleChange(e);
                                          },
                                        })}
                                      />
                                      {row.cells.map((cell) => (
                                        <TableCell key={cell.id}>
                                          {cell.value}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )}
                        </DataTable>

                        <Pagination
                          backwardText='Previous page'
                          forwardText='Next page'
                          itemsPerPageText='Items per page:'
                          page={getPage(params.get('page'))}
                          pageNumberText='Page Number'
                          pageSize={getPageSize(params.get('limit'))}
                          pageSizes={PAGE_SIZES}
                          totalItems={categories.data.count}
                          onChange={(e) => {
                            const page = getPage(e.page);
                            const pageSize = getPageSize(e.pageSize);

                            setParams((prev) => {
                              prev.delete('page');
                              prev.delete('limit');
                              prev.set('page', page);
                              prev.set('limit', pageSize);
                              return prev;
                            });

                            setFieldValue('categoryId', '');
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='mt-8 flex gap-x-px'>
                <Button
                  kind='secondary'
                  style={{ flexGrow: '1' }}
                  type='button'
                >
                  Cancel
                </Button>
                <Button kind='primary' style={{ flexGrow: '1' }} type='submit'>
                  Publish
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default ProductPublish;
