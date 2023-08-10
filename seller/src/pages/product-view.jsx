import { useParams } from 'react-router-dom';
import {
  Button,
  ButtonSkeleton,
  Modal,
  SkeletonText,
  TextAreaSkeleton,
  Tag,
} from '@carbon/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteProduct, useGetProduct } from '../features/product';
import { dateFormater, priceFormatter } from '../utils/formatter';

const FieldSkeleton = () => {
  return (
    <div className='p-4'>
      <div className='mb-2 w-16'>
        <SkeletonText style={{ margin: '0' }} />
      </div>
      <SkeletonText style={{ margin: '0' }} />
    </div>
  );
};

const FieldEmpty = () => {
  return <span className='italic text-gray-500'>(empty)</span>;
};

const ProductView = () => {
  const [modalDelete, setModalDelete] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const product = useGetProduct(id);
  const productDelete = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await productDelete.mutateAsync(id);

      setModalDelete(false);

      navigate('/product/list');
    } catch (error) {
      console.log('ProductView', error);
    }
  };

  console.log('Product', product);

  return (
    <main className='overflow-auto bg-gray-200'>
      <section className='border-b border-gray-200 bg-white px-4 pb-4 pt-3'>
        <h1 className='text-3xl leading-none'>Product View</h1>
      </section>

      {product.isLoading && (
        <>
          <section className='flex justify-end'>
            <ButtonSkeleton size='md' />
          </section>
          <section className='bg-white '>
            <div className='border-b border-gray-200'>
              <div className='w-44 p-4'>
                <SkeletonText style={{ margin: '0' }} />
              </div>
            </div>
            <div className='divide-y divide-gray-200'>
              <FieldSkeleton />
              <div className='p-4'>
                <TextAreaSkeleton />
              </div>
              <FieldSkeleton />
              <FieldSkeleton />
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
          </section>
        </>
      )}

      {product.isFetched && !product.data ? (
        <section className='mt-4 p-4'>
          <h2 className='text-2xl'>Product not found</h2>
          <p className='mb-5 mt-2 text-sm text-gray-600'>
            The product you are looking for does not exist or has been deleted.
          </p>
          <Link to='/product/list'>
            <Button size='md' kind='primary'>
              Go back
            </Button>
          </Link>
        </section>
      ) : null}

      {product.isFetched && product.data ? (
        <>
          <section className='flex justify-end gap-x-px'>
            <Button
              size='md'
              kind='danger'
              onClick={() => setModalDelete(true)}
            >
              Delete
            </Button>
            <Link to={`/product/edit/${id}`}>
              <Button size='md' kind='secondary'>
                Edit
              </Button>
            </Link>
          </section>

          <Modal
            id='product-modal-delete'
            open={modalDelete}
            onClose={() => setModalDelete(false)}
            size='sm'
            modalLabel={`Delete ${product.data?.name}`}
            modalHeading='Confirm delete'
            primaryButtonText='Delete'
            secondaryButtonText='Cancel'
            danger
            onRequestClose={() => setModalDelete(false)}
            onRequestSubmit={handleDelete}
          >
            <p className='text-sm'>
              Deleting <strong>{product.data?.name}</strong> will permanently
              remove it from the system. This action cannot be undone.
            </p>
          </Modal>

          <section className='mb-4 bg-white'>
            <h2 className='border-b border-gray-200 px-4 pb-2 pt-3 text-xl font-medium'>
              Product Details
            </h2>
            <dl className='divide-y divide-gray-200'>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Name
                </dt>
                <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  {product.data?.name}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Description
                </dt>
                <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  {product.data?.description || <FieldEmpty />}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Stock
                </dt>
                <dd className='mt-1 text-lg leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                  {product.data.stock}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Sold
                </dt>
                <dd className='mt-1 text-lg leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                  {product.data.sold}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Price
                </dt>
                <dd className='mt-1 text-lg leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                  {priceFormatter(product.data.price)}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Status
                </dt>
                <dd className='my-1 sm:col-span-2 sm:mt-0'>
                  {product.data.available ? (
                    <Tag
                      id='tag-available'
                      type='green'
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
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Condition
                </dt>
                <dd className='mt-1 text-sm capitalize leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  {product.data.condition}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Category
                </dt>
                <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  <Link to={`/category/${product.data.category.id}`}>
                    {product.data.category.name}
                  </Link>
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Created at
                </dt>
                <dd className='mt-1 text-sm capitalize leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  {dateFormater(product.data.createdAt)}
                </dd>
              </div>
              <div className='px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                <dt className='text-sm font-semibold uppercase leading-6 text-gray-900'>
                  Last updated at
                </dt>
                <dd className='mt-1 text-sm capitalize leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                  {dateFormater(product.data.updatedAt)}
                </dd>
              </div>
            </dl>
          </section>
        </>
      ) : null}
    </main>
  );
};

export default ProductView;
