import { useParams, NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { SkeletonPlaceholder, SkeletonText } from '@carbon/react';
import {
  useGetCategoryFullList,
  useGetCategory,
  useGetCategoryBestSellers,
  useGetCategoryTopRated,
  useGetCategoryRandom,
  useGetCategoryStores,
} from '../features/category';
import { priceFormatter } from '../utils/formatter';
import { StarIcon } from '@heroicons/react/24/solid';

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

const CarouselBestSellers = ({ products }) => {
  return (
    <div className='no-scrollbar flex w-full gap-4 overflow-auto px-4 py-2'>
      {products.map((product, position) => (
        <Link
          key={product.id}
          className='relative shrink-0 overflow-hidden rounded-md border border-black/10 shadow-md'
          to={`/product/${product.id}/${product.slug}`}
        >
          <div className='absolute left-0 top-0 z-10 rounded-br-md bg-red-600 p-1 text-center'>
            <p className='text-sm font-bold leading-snug tracking-wider text-white'>
              {position + 1}
            </p>
          </div>
          <div className='absolute right-0 top-0 z-10 rounded-bl-md bg-red-600 p-1 text-center'>
            <p className='text-xs font-medium leading-none text-white'>Sold</p>
            <p className='text-sm font-bold leading-none text-white'>
              {product.sold}
            </p>
          </div>
          <CarouselProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

const CarouselProducts = ({ products }) => {
  return (
    <div className='no-scrollbar flex w-full gap-4 overflow-auto px-4 py-2'>
      {products.map((product, position) => (
        <Link
          key={product.id}
          className='relative shrink-0 overflow-hidden rounded-md border border-black/10 shadow-md'
          to={`/product/${product.id}/${product.slug}`}
        >
          <div className='absolute left-0 top-0 z-10 rounded-br-md bg-red-600 p-1 text-center'>
            <p className='text-sm font-bold leading-snug tracking-wider text-white'>
              {position + 1}
            </p>
          </div>
          <CarouselProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

const CarouselTopRated = ({ reviews }) => {
  return (
    <div className='no-scrollbar flex w-full gap-4 overflow-auto px-4 py-2'>
      {reviews.map((review, position) => (
        <Link
          key={review.product.id}
          className='relative shrink-0 overflow-hidden rounded-md border border-black/10 shadow-md'
          to={`/product/${review.product.id}/${review.product.slug}`}
        >
          <div className='absolute left-0 top-0 z-10 rounded-br-md bg-red-600 p-1 text-center'>
            <p className='text-sm font-bold leading-snug tracking-wider text-white'>
              {position + 1}
            </p>
          </div>
          <div className='absolute right-0 top-0 z-10 rounded-bl-md bg-red-600 p-1 text-center'>
            <div className='flex items-center gap-x-1'>
              <StarIcon className='h-3 w-3 text-white' />
              <p className='text-sm font-bold leading-none text-white'>
                {review.avarage}
              </p>
            </div>
          </div>
          <CarouselProductItem product={review.product} />
        </Link>
      ))}
    </div>
  );
};

const CarouselProductItem = ({ product }) => {
  return (
    <article className='w-36'>
      <div className='h-36 w-full overflow-hidden rounded-t-md'>
        <img
          src='https://http2.mlstatic.com/D_NQ_NP_773243-MLA42453247573_072020-V.webp'
          alt={`${product.name} image`}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='border-t border-black/10 p-2'>
        <p className='text-base font-bold leading-snug text-black'>
          {priceFormatter(product.price)}
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
const CarouselStores = ({ stores }) => {
  return (
    <div className='no-scrollbar flex w-full gap-x-4 overflow-auto px-4 py-2'>
      {stores.map((store) => (
        <Link
          key={store.id}
          className='w-full max-w-xs shrink-0 grow'
          to={`/store/${store.slug}/view`}
        >
          <CarouselStoreItem store={store} />
        </Link>
      ))}
    </div>
  );
};
const CarouselStoreItem = ({ store }) => {
  return (
    <article className='flex gap-x-2 rounded-lg border border-black/10 p-2 shadow'>
      <div className='h-20 w-20 shrink-0 overflow-hidden rounded-md'>
        <img
          className='h-full w-full object-cover'
          src='https://http2.mlstatic.com/D_Q_NP_696635-MLA54933285501_042023-G.webp'
          alt={`Profile ${store.name}`}
        />
      </div>
      <div className='grow'>
        <p className='text-base font-semibold leading-tight text-black'>
          {store.name}
        </p>
        <p className='leading-normal text-gray-600'>
          {store.official ? 'Official Store' : 'Non-Official Store'}
        </p>
      </div>
    </article>
  );
};

const CategoryView = () => {
  const { slug } = useParams();
  const category = useGetCategory(slug);
  const categoryList = useGetCategoryFullList(slug);
  const bestSellers = useGetCategoryBestSellers(slug);
  const topRated = useGetCategoryTopRated(slug);
  const randoms = useGetCategoryRandom(slug);
  const stores = useGetCategoryStores(slug);
  // console.log('Category', category);
  // console.log('CategoryList', categoryList);
  // console.log('CategoriesBestSellers', bestSellers);
  // console.log('CategoriesTopRated', topRated);
  // console.log('CategoriesRandom', randoms);
  // console.log('CategoryStores', stores);

  return (
    <main className='flex w-full flex-col space-y-8 overflow-auto bg-white'>
      {category.isFetched && category.data && (
        <section>
          <div className='h-36 w-full'>
            <img
              className='h-full w-full object-cover'
              src='https://http2.mlstatic.com/D_NQ_NP_717127-MLA50424008152_062022-OO.webp'
              alt='Portada'
            />
          </div>
          <div className='px-4 pt-4'>
            <h1 className='text-2xl font-bold uppercase leading-none'>
              {category.data.name}
            </h1>
            <p className='mt-1 text-sm leading-normal text-gray-600'>
              {category.data.description}
            </p>
          </div>
        </section>
      )}

      {randoms.isLoading && <SectionSkeleton />}
      {randoms.isFetched && randoms.data?.length > 0 && (
        <section>
          <h2 className='px-4 text-lg font-semibold leading-none'>Randoms</h2>

          <CarouselProducts products={randoms.data} />
        </section>
      )}

      {bestSellers.isLoading && <SectionSkeleton />}
      {bestSellers.isFetched && bestSellers.data?.length > 0 && (
        <section>
          <h2 className='px-4 text-lg font-semibold leading-none'>
            Best Sellers
          </h2>

          <CarouselBestSellers products={bestSellers.data} />
        </section>
      )}

      {topRated.isLoading && <SectionSkeleton />}
      {topRated.isFetched && topRated.data?.length > 0 && (
        <section>
          <h2 className='px-4 text-lg font-semibold leading-none'>Top Rated</h2>

          <CarouselTopRated reviews={topRated.data} />
        </section>
      )}

      {stores.isFetched && stores.data?.length > 0 && (
        <section>
          <h2 className='px-4 text-lg font-semibold leading-none'>Stores</h2>

          <CarouselStores stores={stores.data} />
        </section>
      )}

      {categoryList.isFetched && categoryList.data && (
        <section className='px-4 pb-4'>
          <NavLink
            to={`/category/${categoryList.data.slug}/view`}
            className={({ isActive }) => {
              return clsx(
                'text-lg font-bold leading-none text-gray-900',
                isActive &&
                  'uppercase underline decoration-indigo-500 decoration-2 underline-offset-2'
              );
            }}
          >
            {categoryList.data.name}
          </NavLink>
          <div className='mt-1'>
            <ol className='columns-2'>
              {categoryList.data.children.map((child) => (
                <li key={child.id}>
                  <NavLink
                    to={`/category/${child.slug}/view`}
                    className={({ isActive }) => {
                      return clsx(
                        'text-sm leading-none text-black',
                        isActive
                          ? 'font-bold uppercase underline decoration-indigo-500 decoration-2 underline-offset-2'
                          : 'font-medium'
                      );
                    }}
                  >
                    {child.name}
                  </NavLink>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryView;
