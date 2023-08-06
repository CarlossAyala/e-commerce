import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { CheckmarkFilled, Event } from '@carbon/icons-react';
import { SkeletonPlaceholder, SkeletonText } from '@carbon/react';
import { useGetStore, useGetStoreProducts } from '../features/store';
import { joinedAt, priceFormater } from '../utils/formater';

const SectionSkeleton = () => {
  return (
    <section className=''>
      <div className='mx-4 w-1/3 overflow-hidden rounded'>
        <SkeletonText
          style={{
            margin: 0,
          }}
        />
      </div>

      <div className='mt-2 flex gap-x-4 overflow-auto px-4 py-2'>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  );
};
const ProductCardSkeleton = () => {
  return (
    <article className='h-48 w-36 overflow-hidden rounded-md shadow-md'>
      <SkeletonPlaceholder
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </article>
  );
};

const ProductItem = ({ product }) => {
  return (
    <article className=''>
      <div className='h-40 w-full overflow-hidden rounded-md p-2'>
        <img
          src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
          alt={`${product.name} image`}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='border-t border-black/10 p-2'>
        <p className='text-base font-bold leading-snug text-black'>
          {priceFormater(product.price)}
        </p>
        <p
          className={clsx(
            'rounded-md text-sm font-semibold capitalize leading-snug',
            product.condition === 'new' && 'text-green-700',
            product.condition === 'used' && 'text-violet-700',
            product.condition === 'reconditioned' && 'text-blue-700'
          )}
        >
          {product.condition}
        </p>
        <p className='line-clamp-2 text-sm font-medium leading-snug text-black'>
          {product.name}
        </p>
      </div>
    </article>
  );
};

const StoreView = () => {
  const { slug } = useParams();

  const store = useGetStore(slug);
  // console.log('Store', store);
  const products = useGetStoreProducts(slug);
  console.log('Products', products);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      {store.isFetched && store.data && (
        <section className='border-b border-black/10'>
          <div className='relative h-32'>
            <img
              className='h-full w-full object-fill'
              src='https://http2.mlstatic.com/D_NQ_NP_609646-MLA50448869195_062022-OO.webp'
              alt='Testing'
            />
            <div className='absolute bottom-0 left-0 ml-4 h-28 w-28 translate-y-8 overflow-hidden rounded-full border-4 border-white'>
              <img
                className='h-full w-full object-cover'
                src={store.data.profile}
                alt={store.data.name}
              />
            </div>
          </div>
          <div className='px-4 pb-4 pt-8'>
            <div>
              <h1 className='text-2xl font-semibold leading-none text-gray-800'>
                {store.data.name}
              </h1>
              {store.data.official && (
                <div className='mt-0.5 flex items-center text-blue-500'>
                  <CheckmarkFilled size='20' />
                  <p className='ml-0.5 text-base font-bold leading-none'>
                    Official Store
                  </p>
                </div>
              )}
              <div className='my-1.5 flex flex-wrap gap-x-2'>
                <div className='flex items-center text-gray-500'>
                  <Event size='16' />
                  <p className='ml-0.5 text-sm font-medium leading-none'>
                    Se unió en{' '}
                    <span className='capitalize'>
                      {joinedAt(store.data.createdAt)}
                    </span>
                  </p>
                </div>
              </div>
              <p className='text-sm leading-tight text-black'>
                {store.data.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TODO: Add Search, Filters and Pagination */}
      {products.isLoading && <SectionSkeleton />}
      {products.isFetched && products.data?.rows.length === 0 && (
        <section className='p-4'>
          <p className='text-base leading-tight text-gray-600'>
            No hay productos en esta tienda
          </p>
        </section>
      )}
      {products.isFetched && products.data?.rows.length > 0 && (
        <section className='p-4'>
          <h2 className='text-lg font-semibold leading-none'>Products</h2>

          <div className='mt-2 grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4'>
            {products.data.rows.map((product) => (
              <Link
                key={product.id}
                className='relative overflow-hidden rounded-md border border-black/10 shadow'
                to={`/product/${product.id}/${product.slug}`}
              >
                <ProductItem product={product} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default StoreView;
