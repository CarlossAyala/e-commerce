import { Link } from 'react-router-dom';
import { Formater } from '../../utils/helpers';
import CartUtils from '../cart.utils';

const ItemInfo = ({ item }) => {
  const price = +item.product.price;
  const quantity = item.quantity;

  const total = CartUtils.getTotalItem(price, quantity);

  return (
    <div className='ml-4 flex flex-1 flex-col'>
      <h3 className='line-clamp-1'>
        <Link to={item.href}>{item.product.name}</Link>
      </h3>
      <div className='flex flex-col justify-between text-base font-normal text-gray-900'>
        <p className='text-sm text-gray-500'>
          Stock <span className='text-indigo-500'>{item.product.stock}</span>
        </p>
        <p className='text-sm text-gray-500'>
          U/P{' '}
          <span className='text-indigo-500'>
            {Formater.price(item.product.price)}
          </span>
        </p>
      </div>
      <div className='flex flex-1 items-end justify-between text-sm'>
        <p className='text-base font-medium'>{total}</p>
      </div>
    </div>
  );
};

export default ItemInfo;
