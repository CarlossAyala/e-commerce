import { useImageOnLoad } from '../../../utils/hooks';

const ProductImage = () => {
  const [onLoad, styles] = useImageOnLoad();

  return (
    <div className='relative mx-auto h-60 max-w-xs'>
      <img
        src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        onLoad={onLoad}
        style={styles.thumbnail}
        className='h-full w-full object-cover object-center'
      />
      <img
        src='https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        onLoad={onLoad}
        style={styles.fullSize}
        className='h-full w-full object-cover object-center'
      />
    </div>
  );
};

export default ProductImage;
