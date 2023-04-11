import { Link } from 'react-router-dom';
import { Formater } from '../../utils/helpers';
import { useImageOnLoad } from '../../utils/hooks';
import clsx from 'clsx';

const fakeUrl =
  'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg';

const ProductCard = ({ product }) => {
  const [onLoad, { thumbnail, fullSize }] = useImageOnLoad();

  return (
    <Link to={`/p/${product.id}/${product.slug}`}>
      <div className='rounded-md border py-2 px-3 shadow'>
        <div className='relative overflow-hidden'>
          <img
            src={fakeUrl}
            onLoad={onLoad}
            className={clsx(
              thumbnail,
              'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
            )}
          />
          <img
            src={fakeUrl}
            onLoad={onLoad}
            className={clsx(
              fullSize,
              'h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-125'
            )}
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
