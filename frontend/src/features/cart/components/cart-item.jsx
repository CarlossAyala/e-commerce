import ItemProfile from './item-profile';
import ItemInfo from './item-info';
import ItemQuantitySelector from './item-quantity-selector';
import ItemVisibleController from './item-visible-controller';
import ItemBookmark from './item-bookmark';
import ItemDelete from './item-delete';

const CartItem = ({ item, handlers }) => {
  return (
    <li className='grid grid-rows-[1fr_auto] shadow-sm'>
      <div className='flex py-3 px-4'>
        <ItemProfile item={item} />

        <ItemInfo item={item} handlers={handlers} />
      </div>

      {/* Actions */}
      <div className='flex items-center justify-between border-t border-gray-200 py-3 px-4'>
        <ItemQuantitySelector item={item} handlers={handlers} />
        <ItemVisibleController item={item} handlers={handlers} />
        <div className='flex items-center gap-x-2'>
          <ItemBookmark />
          <ItemDelete />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
