import { TrashIcon } from '@heroicons/react/24/outline';

const ItemDelete = () => {
  return (
    <button
      type='button'
      className='rounded border border-gray-200 p-2 font-medium text-indigo-600 hover:text-indigo-500'
    >
      <TrashIcon className='h-5 w-5' />
    </button>
  );
};

export default ItemDelete;
