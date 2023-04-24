import ItemProfile from './item-profile';
import ItemInfo from './item-info';
import QuantitySelector from './quantity-selector';
import VisibleController from './visible-controller';
import ItemBookmark from './item-bookmark';
import ItemDelete from './item-delete';

const CartItem = ({ item }) => {
  return (
    <li className='grid grid-rows-[1fr_auto] shadow-sm'>
      <div className='flex py-3 px-4'>
        <ItemProfile item={item} />
        <ItemInfo item={item} />
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between border-t border-gray-200 py-3 px-4'>
        <ItemDelete item={item} />
        <div className='flex items-center gap-x-2'>
          <VisibleController item={item} />
          <ItemBookmark item={item} />
        </div>
        <QuantitySelector item={item} />
      </div>
    </li>
  );
};

export default CartItem;
