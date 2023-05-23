import { Formater } from '../../../utils/helpers';

const ProductPrice = ({ price }) => {
  return (
    <p className='text-3xl tracking-tight text-gray-900'>
      {Formater.price(price)}
    </p>
  );
};

export default ProductPrice;
