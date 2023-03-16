import { Link } from 'react-router-dom';
import { Formater } from '../../utils/helpers';
import { useImageOnLoad } from '../../utils/hooks';

const fakeUrl =
  'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg';

const ProductCard = ({ product }) => {
  const [onLoad, styles] = useImageOnLoad();

  return (
    <Link to={`/p/${product.id}/${product.slug}`} className='block w-44'>
      <div className='rounded-md border p-3 shadow'>
        <div className='relative mx-auto overflow-hidden rounded-md'>
          <img
            src={fakeUrl}
            onLoad={onLoad}
            style={styles.thumbnail}
            className='h-full w-full object-cover object-center'
          />
          <img
            src={fakeUrl}
            onLoad={onLoad}
            style={styles.fullSize}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='flex flex-col'>
          <h3 className='text-gray-500'>{product.name}</h3>
          <p className='text-lg font-semibold text-black '>
            {Formater.price(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
