import { Link } from 'react-router-dom';
import { priceFormater } from '../utils/formater';
import { useGetHistory } from '../features/history';
import clsx from 'clsx';
import { useGetBookmarks } from '../features/bookmark';
import { useGetCategories } from '../features/category/category.queries';
import { useSearchProducts } from '../features/product';

const CarouselProducts = ({ title, link, products }) => {
  return (
    <section>
      <div className='flex items-center justify-between px-4'>
        <h2 className='text-xl font-medium leading-normal'>{title}</h2>
        <Link to={link.to} className='text-md font-normal leading-snug'>
          {link.text}
        </Link>
      </div>

      <div className='no-scrollbar flex w-full gap-4 overflow-auto px-4 pb-4 pt-2'>
        {products.map((product) => (
          <CarouselProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const CarouselProductItem = ({ product }) => {
  return (
    <article className='w-36 shrink-0 overflow-hidden rounded-md border border-black/10 shadow-md'>
      <Link to={`/product/${product.id}/${product.slug}`}>
        <div className='h-36 w-full  bg-gray-200'>
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
      </Link>
    </article>
  );
};

const CarouselCategories = ({ title, link, categories }) => {
  return (
    <section>
      <div className='flex items-center justify-between px-4'>
        <h2 className='text-xl font-medium leading-normal'>{title}</h2>
        <Link to={link.to} className='text-md font-normal leading-snug'>
          {link.text}
        </Link>
      </div>

      <div className='grid grid-cols-2 gap-4 px-4 pb-4 pt-2'>
        {categories.map((category) => (
          <CarouselCategoryItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

const CarouselCategoryItem = ({ category }) => {
  return (
    <article className='shrink-0 overflow-hidden rounded-md border border-black/10 shadow-md'>
      <Link to={`/category/${category.slug}/view`}>
        <div className='h-36 w-full  bg-gray-200'>
          <img
            src='https://http2.mlstatic.com/D_NQ_NP_610174-MLA53970594239_022023-O.webp'
            alt={`${category.name} image`}
            className='h-full w-full object-cover'
          />
        </div>
        <div className='border-t border-black/10 p-2'>
          <p className='text-base font-bold leading-snug text-black'>
            {category.name}
          </p>
        </div>
      </Link>
    </article>
  );
};

const Home = () => {
  const history = useGetHistory();
  const bookmarks = useGetBookmarks();
  const categories = useGetCategories();
  const products = useSearchProducts();
  // console.log('History', history);
  // console.log('Bookmarks', bookmarks);
  // console.log('Categories', categories);
  // console.log('Products', products);

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-3'>
        <h1 className='text-2xl font-medium leading-none'>Home</h1>
      </section>

      <div className='space-y-6 py-3'>
        {history.isFetched && history.data?.rows.length > 0 && (
          <CarouselProducts
            title='Your history'
            link={{
              to: '/history/list',
              text: 'View history',
            }}
            products={history.data.rows.map((row) => row.product)}
          />
        )}

        {bookmarks.isFetched && bookmarks.data?.rows.length > 0 && (
          <CarouselProducts
            title='Your bookmarks'
            link={{
              to: '/bookmark/list',
              text: 'View bookmarks',
            }}
            products={bookmarks.data.rows.map((row) => row.product)}
          />
        )}

        {categories.isFetched && categories.data?.length > 0 && (
          <CarouselCategories
            title='Main Categories'
            link={{
              to: '/category/list',
              text: 'View all',
            }}
            categories={categories.data.slice(0, 10)}
          />
        )}

        {products.isFetched && products.data?.rows.length > 0 && (
          <CarouselProducts
            title='Products'
            link={{
              to: '/product/future',
              text: 'View more',
            }}
            products={products.data.rows.map((row) => row)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
