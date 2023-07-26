import { TrashIcon } from '@heroicons/react/24/outline';
import { useRemoveItem } from '../cart.queries';

const ItemDelete = ({ item }) => {
  const removeItem = useRemoveItem();

  return (
    <button
      type='button'
      className='rounded border border-gray-200 p-2 font-medium text-indigo-600 hover:text-indigo-500'
      onClick={() => removeItem.mutate(item.id)}
    >
      <TrashIcon className='h-5 w-5' />
    </button>
  );
};

export default ItemDelete;
