import { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@carbon/react";
import { Edit, TrashCan } from "@carbon/icons-react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDeleteProduct, useGetProduct } from "../features/product";
import { priceFormatter } from "../utils/formatter";
import clsx from "clsx";
import { fullDateFormatter } from "../utils/date";

const ProductView = () => {
  const [modal, setModal] = useState(false);

  const { id: productId } = useParams();
  const navigate = useNavigate();

  const product = useGetProduct(productId);
  const deleteProduct = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(productId);

      navigate("/product/list");
    } catch (error) {
      console.log("ProductView", error);
    } finally {
      setModal(false);
    }
  };

  console.log("Product", product);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      {product.isLoading ? (
        <section>
          <p>Loading...</p>
        </section>
      ) : (
        <>
          {product.isSuccess && (
            <section className="space-y-10 px-4 py-3">
              <div className="">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Product information
                </h1>
                <p className="text-sm text-gray-600">
                  All information about this product is available here.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-y-4">
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Name
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.name}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Description
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.description}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Stock
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.stock}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Sold
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.sold}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Price
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {priceFormatter(product.data.price)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Condition
                    </dt>
                    <dd
                      className={clsx(
                        "text-sm font-semibold capitalize leading-tight",
                        product.data.condition === "new" && "text-green-700",
                        product.data.condition === "used" && "text-violet-700",
                        product.data.condition === "reconditioned" &&
                          "text-blue-700"
                      )}
                    >
                      {product.data.condition}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Status
                    </dt>
                    <dd
                      className={clsx(
                        "text-sm font-semibold capitalize leading-tight",
                        product.data.available
                          ? "text-green-700"
                          : "text-red-700"
                      )}
                    >
                      {product.data.available ? "Available" : "Unavailable"}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Created at
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {fullDateFormatter(product.data.createdAt)}
                    </dd>
                  </div>
                  <div className="">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Last update at
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {fullDateFormatter(product.data.updatedAt)}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Category information
                </h1>
                <p className="text-sm text-gray-600">
                  Information about the category of your product.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-y-4">
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Name
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.category.name}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs font-semibold uppercase leading-6 text-gray-900">
                      Description
                    </dt>
                    <dd className="text-sm leading-tight text-gray-900">
                      {product.data.category.description}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex gap-x-1">
                <Link to={`/product/${productId}/edit`}>
                  <Button renderIcon={Edit} iconDescription="Edit">
                    Edit
                  </Button>
                </Link>
                <Button
                  kind="danger--tertiary"
                  renderIcon={TrashCan}
                  iconDescription="Delete"
                  onClick={() => setModal(true)}
                >
                  Delete
                </Button>
              </div>

              <Transition.Root show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <ExclamationTriangleIcon
                                  className="h-6 w-6 text-red-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-base font-semibold leading-6 text-gray-900"
                                >
                                  Delete product
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Are you sure you want to delete this
                                    product? All data will be permanently
                                    removed. This action cannot be undone.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                              onClick={handleDelete}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setModal(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default ProductView;
