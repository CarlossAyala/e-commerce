import { useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  PRODUCT_CONDITIONS,
  useEditProduct,
  useGetCategory,
  useGetProduct,
  useSearchCategories,
  validationSchema,
  withInitialValues,
} from '../features/product';
import { useDebounce } from '../utils/hooks';
import {
  TextArea,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
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
  InlineNotification,
  Button,
  Modal,
  Tag,
  SkeletonText,
} from '@carbon/react';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  getPage,
  getPageSize,
} from '../constants/pagination.contants';

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

const INITIAL_CATEGORY = {
  pre: '',
  post: '',
};

const ProductEdit = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  const [search, setSearch] = useState(params.get('q') || '');
  const [modal, setModal] = useState(false);

  const [category, setCategory] = useState(INITIAL_CATEGORY);
  const newCategory = useGetCategory(category.post);

  const debounceParams = useDebounce(params.toString());
  const categories = useSearchCategories(debounceParams);

  const product = useGetProduct(id);
  const editProduct = useEditProduct();

  // console.log(product);
  // console.log('NewCategory', category);

  const handleSubmit = async (values) => {
    try {
      // Si tengo una ID en category.post, entonces tengo que actualizar la categoria
      if (category.post !== '') values.categoryId = category.post;

      await editProduct.mutateAsync({
        id,
        values,
      });

      navigate(`/product/view/${id}`);
    } catch (error) {
      console.log('ProductEdit', error);
    }
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setParams((prev) => {
      prev.delete('q');
      prev.delete('page');

      prev.set('q', e.target.value);
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

  const rows = categories.data?.rows.map(({ id, name, available }) => ({
    id,
    name: <Link to={`/category/${id}`}>{name}</Link>,
    status: available ? (
      <Tag id='tag-available' type='green' style={{ margin: '0' }}>
        Available
      </Tag>
    ) : (
      <Tag id='tag-inavailable' type='red' style={{ margin: '0' }}>
        Not Available
      </Tag>
    ),
  }));

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Product Edit</h1>
      </section>

      <section className='my-4 px-4'>
        {product.isLoading ? (
          <DataTableSkeleton columnCount={headers.length} rowCount={7} />
        ) : null}

        {product.isFetched && !product.data ? (
          <div>
            <h3 className='mb-1 mt-4 text-base font-medium'>
              No products found
            </h3>
            <p className='text-sm text-gray-600'>
              Try adjusting you search or filter options to find what
              you&apos;re looking for.
            </p>
            <Button
              kind='ghost'
              size='sm'
              style={{ padding: '0' }}
              onClick={() => handleClearFilters()}
            >
              Clear filters
            </Button>
          </div>
        ) : null}

        {product.isFetched && product.data ? (
          <Formik
            initialValues={withInitialValues(product.data)}
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
              <Form>
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
                    <h2 className='mb-2 text-xl'>Product settings</h2>
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
                    <div className='mb-4'>
                      <h2 className='text-xl'>Product category</h2>
                      <p className='text-sm text-gray-600'>
                        You can change the category of this product. If you
                        select a new category, the <strong>Current</strong>{' '}
                        category will be replaced with the <strong>New</strong>{' '}
                        one.
                      </p>
                    </div>
                    <div className='mb-3'>
                      <h3 className='mb-1 text-base'>Current</h3>
                      <div className='bg-gray-50 px-3 pt-1'>
                        <span className='text-xs leading-none text-gray-500'>
                          Name
                        </span>
                        <Link to={`/category/${product.data.categoryId}`}>
                          <h4 className='text-lg leading-none'>
                            {product.data.category.name}
                          </h4>
                        </Link>
                      </div>
                      <div className='bg-gray-50 px-3 py-2 pb-2'>
                        <p className='block text-xs text-gray-500'>Status</p>
                        {product.data.category.available ? (
                          <Tag
                            id='tag-available'
                            type='green'
                            size='sm'
                            style={{ margin: '0' }}
                          >
                            Available
                          </Tag>
                        ) : (
                          <Tag
                            id='tag-inavailable'
                            type='red'
                            style={{ margin: '0' }}
                          >
                            Not Available
                          </Tag>
                        )}
                      </div>
                    </div>
                    {newCategory.isLoading && (
                      <div>
                        <h3 className='mb-1 text-base'>New</h3>
                        <div className='space-y-4 bg-gray-50'>
                          <div className='px-3 pt-3'>
                            <div className='mb-2 w-16'>
                              <SkeletonText style={{ margin: '0' }} />
                            </div>
                            <SkeletonText style={{ margin: '0' }} />
                          </div>
                          <div className='px-3 pb-3'>
                            <div className='mb-2 w-16'>
                              <SkeletonText style={{ margin: '0' }} />
                            </div>
                            <SkeletonText style={{ margin: '0' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {newCategory.isFetched && newCategory.data ? (
                      <div>
                        <h3 className='mb-1 text-base'>New</h3>
                        <div className='bg-gray-50 px-2'>
                          <span className='text-xs leading-none text-gray-500'>
                            Name
                          </span>
                          <Link to={`/category/${newCategory.data.id}`}>
                            <h4 className='text-lg leading-none'>
                              {newCategory.data.name}
                            </h4>
                          </Link>
                        </div>
                        <div className='bg-gray-50 px-2 py-2'>
                          <p className='block text-xs text-gray-500'>Status</p>
                          {newCategory.data.available ? (
                            <Tag
                              id='tag-available'
                              type='green'
                              size='sm'
                              style={{ margin: '0' }}
                            >
                              Available
                            </Tag>
                          ) : (
                            <Tag
                              id='tag-inavailable'
                              type='red'
                              style={{ margin: '0' }}
                            >
                              Not Available
                            </Tag>
                          )}
                        </div>
                      </div>
                    ) : null}

                    <div className='mt-2 grid grid-cols-3 gap-x-px'>
                      {category.post !== '' && (
                        <Button
                          id='product-remove-category'
                          kind='secondary'
                          size='md'
                          style={{ width: 'auto' }}
                          onClick={() => setCategory(INITIAL_CATEGORY)}
                        >
                          Remove
                        </Button>
                      )}
                      <Button
                        id='product-change-category'
                        kind='primary'
                        size='md'
                        style={{ width: 'auto' }}
                        onClick={() => setModal(true)}
                      >
                        Change
                      </Button>
                    </div>
                  </div>

                  <Modal
                    open={modal}
                    modalHeading='Select one Category'
                    modalLabel='Confirm Product Category'
                    primaryButtonText='Change'
                    secondaryButtonText='Cancel'
                    onRequestClose={() => setModal(false)}
                    onRequestSubmit={() => {
                      setCategory((previus) => ({
                        ...previus,
                        post: previus.pre,
                      }));
                      setModal(false);
                    }}
                    isFullWidth
                    style={{ margin: '0' }}
                  >
                    <div className='space-y-2 bg-gray-200 py-4 sm:px-4'>
                      <Search
                        id='category-search'
                        placeholder='Search for a category'
                        labelText='Search Icon'
                        onChange={handleSearch}
                        value={search}
                        size='lg'
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
                          columnCount={headers.length}
                          headers={headers}
                          rowCount={7}
                          showToolbar={false}
                        />
                      )}

                      {categories.isFetched && categories.data?.count === 0 ? (
                        <div className='min-h-full px-4'>
                          <h3 className='mb-1 mt-4 text-xl font-medium'>
                            No categories found
                          </h3>
                          <p className='text-sm text-gray-600'>
                            Try adjusting you search or filter options to find
                            what you&apos;re looking for.
                          </p>
                          <Button
                            kind='ghost'
                            size='sm'
                            style={{ padding: '0' }}
                            onClick={() => handleClearFilters()}
                          >
                            Clear filters
                          </Button>
                        </div>
                      ) : null}

                      {categories.isFetched && categories.data.count ? (
                        <>
                          <DataTable
                            size='lg'
                            rows={rows}
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
                                description=''
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
                                      <TableRow
                                        key={i}
                                        {...getRowProps({ row })}
                                      >
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
                                              setCategory({
                                                pre: row.id,
                                                post: '',
                                              });
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
                            id='categories-pagination'
                            backwardText='Previous page'
                            forwardText='Next page'
                            itemsPerPageText='Items per page:'
                            page={getPage(params.get('page'))}
                            size='lg'
                            pageNumberText='Page Number'
                            pageSize={getPageSize(params.get('limit'))}
                            pageSizes={PAGE_SIZES}
                            totalItems={categories.data.count}
                            onChange={handlePagination}
                          />
                        </>
                      ) : null}
                    </div>
                  </Modal>
                </div>
                <div className='mt-8 flex gap-x-px'>
                  <Link to={`/product/view/${id}`} style={{ flexGrow: '1' }}>
                    <Button
                      kind='secondary'
                      type='button'
                      style={{ width: '100%' }}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    kind='primary'
                    style={{ flexGrow: '1' }}
                    type='submit'
                  >
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : null}
      </section>
    </main>
  );
};

export default ProductEdit;
