import { Link } from 'react-router-dom';
import ProductCard from '../../product/components/product-card';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled#return_value
// status value reason

const ListProducts = ({ products }) => {
  const { status, value, reason } = products;
  // console.log('ListProducts', products);

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-gray-900'>Best Products</h3>
        <Link to='products' className='text-sm text-indigo-500'>
          Show more
        </Link>
      </div>
      <div className='mt-3 grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-5'>
        {value.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default ListProducts;

// <Link to={`/p/${product.slug}/${product.id}`} key={index}>
