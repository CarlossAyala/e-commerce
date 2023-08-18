import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  PRODUCT_CONDITIONS,
  productDefault,
  productSchema,
  useGetProduct,
  useUpdateProduct,
} from "../features/product";
import { Form, Formik } from "formik";
import {
  TextArea,
  TextInput,
  NumberInput,
  Select,
  SelectItem,
  Toggle,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableSelectRow,
  TableCell,
  Search,
  Button,
  Pagination,
} from "@carbon/react";
import { useState } from "react";
import { useGetCategories, useGetCategory } from "../features/category";
import { useDebounce } from "../utils/hooks";
import {
  PAGE_SIZES,
  getPage,
  getPageSize,
} from "../constants/pagination.constants";

const headers = [
  {
    key: "name",
    header: "Name",
  },
];

const ProductEdit = () => {
  const [params, setParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState(() => params.get("name") || "");

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const debounceParams = useDebounce(params.toString());

  const product = useGetProduct(productId);
  const updateProduct = useUpdateProduct();
  const category = useGetCategory(categoryId);
  const categories = useGetCategories(debounceParams);

  // console.log("Product", product);
  // console.log("Categories", categories);

  const handleSearch = (event) => {
    const search = event.target.value;
    setSearch(search);
    setParams({ ...params, ...(search ? { name: search } : {}) });
  };

  const clearSearch = () => {
    setSearch("");
    setParams();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProduct.mutateAsync([productId, values]);
      setSubmitting(false);

      navigate(`/product/${productId}/view`);
    } catch (error) {
      setSubmitting(false);
      console.log("<ProductEdit />");
      console.log("handleSubmit", error);
    }
  };

  const rows = categories.data?.rows.map(({ id, name }) => ({
    id,
    name: (
      <Link to="#">
        <p className="leading-none">{name}</p>
        {id === product.data?.categoryId ? (
          <p className="text-sm italic text-gray-600">Current</p>
        ) : id === categoryId ? (
          <p className="text-sm italic text-gray-600">New</p>
        ) : null}
      </Link>
    ),
  }));

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      {product.isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {product.isSuccess && (
            <Formik
              initialValues={productDefault(product.data)}
              validationSchema={productSchema}
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
                <Form className="space-y-10 px-4 py-3">
                  <section>
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Product information
                    </h2>
                    <p className="text-sm text-gray-600">
                      Edit the information of the product.
                    </p>

                    <div className="mt-6 space-y-4">
                      <TextInput
                        id="product-name"
                        name="name"
                        type="text"
                        labelText="Name"
                        placeholder="Your product name"
                        size="md"
                        invalidText={errors.name}
                        invalid={errors.name && touched.name}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TextArea
                        id="product-description"
                        name="description"
                        labelText="Description"
                        placeholder="Your product description"
                        rows={5}
                        enableCounter
                        maxCount={255}
                        invalidText={errors.description}
                        invalid={errors.description && touched.description}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </section>
                  <section>
                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                      Product inventory
                    </h2>
                    <p className="text-sm text-gray-600">
                      Settings the inventory of the product.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <NumberInput
                        id="product-stock"
                        name="stock"
                        label="Stock"
                        invalidText={errors.stock}
                        invalid={errors.stock && touched.stock}
                        value={values.stock}
                        onChange={(event, { value }) => {
                          setFieldValue("stock", value);
                          if (value < 1) setFieldValue("available", false);
                        }}
                        onBlur={handleBlur}
                        min={0}
                      />
                      <NumberInput
                        id="product-price"
                        name="price"
                        label="Price"
                        invalidText={errors.price}
                        invalid={errors.price && touched.price}
                        value={values.price}
                        onChange={(event, { value }) => {
                          setFieldValue("price", value);
                        }}
                        onBlur={handleBlur}
                        min={0}
                      />
                      <div className="col-span-2">
                        <Select
                          id="product-condition"
                          name="condition"
                          labelText="Condition"
                          invalidText={errors.condition}
                          invalid={errors.condition && touched.condition}
                          value={values.condition}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {PRODUCT_CONDITIONS.map((condition) => (
                            <SelectItem
                              key={condition}
                              value={condition}
                              text={condition}
                            />
                          ))}
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Toggle
                          id="product-available"
                          name="available"
                          labelText="Status"
                          labelA="Unavailable"
                          labelB="Available"
                          defaultToggled={values.available}
                          onToggle={(value) =>
                            setFieldValue("available", value)
                          }
                          toggled={values.available}
                          disabled={values.stock < 1 || !values.stock}
                        />
                        <p className="text-xs text-gray-800">
                          You can only disable the product when the Stock is
                          zero
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div>
                      <h2 className="text-base font-semibold leading-6 text-gray-900">
                        Product category
                      </h2>
                      <p className="text-sm text-gray-600">
                        Settings the category of the product.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm leading-5 text-gray-500">
                        Current
                      </h3>

                      <dl className="mt-1 space-y-2 bg-gray-100 px-4 py-3">
                        <div className="col-span-2">
                          <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                            Name
                          </dt>
                          <dd className="text-sm leading-tight text-gray-900">
                            <Link to="#">{product.data.category.name}</Link>
                          </dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                            Description
                          </dt>
                          <dd className="line-clamp-2 text-sm leading-tight text-gray-900">
                            {product.data.category.description}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {categoryId && (
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm leading-5 text-gray-500">
                            New
                          </h3>
                          <button
                            onClick={() => setCategoryId("")}
                            className="text-sm text-blue-600"
                          >
                            Cancel
                          </button>
                        </div>

                        {category.isLoading ? (
                          <p>Loading category...</p>
                        ) : (
                          <>
                            {category.isSuccess && (
                              <dl className="mt-1 space-y-2 bg-gray-100 px-4 py-3">
                                <div className="col-span-2">
                                  <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                                    Name
                                  </dt>
                                  <dd className="text-sm leading-tight text-gray-900">
                                    <Link to="#">{category.data.name}</Link>
                                  </dd>
                                </div>
                                <div className="col-span-2">
                                  <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                                    Description
                                  </dt>
                                  <dd className="line-clamp-2 text-sm leading-tight text-gray-900">
                                    {category.data.description}
                                  </dd>
                                </div>
                              </dl>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="text-sm leading-5 text-gray-500">
                        Category search
                      </h3>

                      <Search
                        id="category-search"
                        name="search"
                        labelText="Search"
                        placeholder="Search for a category"
                        size="lg"
                        closeButtonLabelText="Clear search input"
                        onChange={handleSearch}
                        onClear={clearSearch}
                        value={search}
                      />

                      {categories.isLoading ? (
                        <div>
                          <p>Loading categories...</p>
                        </div>
                      ) : (
                        <>
                          {search && categories.data.rows.length === 0 && (
                            <div>
                              <TableContainer
                                title="Table Categories"
                                description="To change the current category, choose any of the following"
                              >
                                <div className="text border-t border-gray-300 bg-gray-100 px-4 py-10">
                                  <p className="text-base font-bold leading-5 text-gray-900">
                                    No results found
                                  </p>
                                  <p className="mb-4 text-sm text-gray-600">
                                    Try searching for a different term
                                  </p>

                                  <Button kind="tertiary" onClick={clearSearch}>
                                    Clear search
                                  </Button>
                                </div>
                              </TableContainer>
                              <div className="">
                                <Pagination
                                  backwardText="Previous page"
                                  forwardText="Next page"
                                  itemsPerPageText="Items per page:"
                                  onChange={(e) => {
                                    const page = getPage(e.page);
                                    const pageSize = getPageSize(e.pageSize);

                                    setParams((prev) => {
                                      prev.delete("page");
                                      prev.delete("limit");
                                      prev.set("page", page);
                                      prev.set("limit", pageSize);
                                      return prev;
                                    });
                                  }}
                                  page={getPage(params.get("page"))}
                                  pageSize={getPageSize(params.get("limit"))}
                                  pageSizes={PAGE_SIZES}
                                  size="md"
                                  totalItems={categories.data.count}
                                />
                              </div>
                            </div>
                          )}

                          {categories.data.rows.length > 0 && (
                            <div className="mt-2">
                              <DataTable rows={rows} headers={headers} radio>
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
                                    title="Table Categories"
                                    description="To change the current category, choose any of the following"
                                    {...getTableContainerProps()}
                                  >
                                    <Table {...getTableProps()}>
                                      <TableHead>
                                        <TableRow>
                                          <th scope="col" />
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
                                                  setFieldValue(
                                                    "categoryId",
                                                    row.id
                                                  );
                                                  setCategoryId(row.id);
                                                },
                                              })}
                                              checked={row.id === categoryId}
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
                              <div className="">
                                <Pagination
                                  backwardText="Previous page"
                                  forwardText="Next page"
                                  itemsPerPageText="Items per page:"
                                  onChange={(e) => {
                                    const page = getPage(e.page);
                                    const pageSize = getPageSize(e.pageSize);

                                    setParams((prev) => {
                                      prev.delete("page");
                                      prev.delete("limit");
                                      prev.set("page", page);
                                      prev.set("limit", pageSize);
                                      return prev;
                                    });
                                  }}
                                  page={getPage(params.get("page"))}
                                  pageSize={getPageSize(params.get("limit"))}
                                  pageSizes={PAGE_SIZES}
                                  size="md"
                                  totalItems={categories.data.count}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </section>

                  <section className="mt-8 flex gap-x-px">
                    <Link
                      to={`/product/${productId}/view`}
                      style={{ flexGrow: "1" }}
                    >
                      <Button
                        kind="secondary"
                        type="button"
                        style={{ width: "100%" }}
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      kind="primary"
                      style={{ flexGrow: "1" }}
                      type="submit"
                    >
                      Save
                    </Button>
                  </section>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </main>
  );
};

export default ProductEdit;
