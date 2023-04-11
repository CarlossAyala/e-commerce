import clsx from 'clsx';
import { useImageOnLoad } from '../../../utils/hooks';

const ProductImage = () => {
  const [onLoad, { thumbnail, fullSize }] = useImageOnLoad();

  return (
    <div className='relative mx-auto h-60 max-w-xs'>
      <img
        src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        onLoad={onLoad}
        className={clsx(thumbnail, 'h-full w-full object-cover object-center')}
      />
      <img
        src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        onLoad={onLoad}
        className={clsx(fullSize, 'h-full w-full object-cover object-center')}
      />
    </div>
  );
};

export default ProductImage;
