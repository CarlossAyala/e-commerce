import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useUpdateVisibility } from '../cart.queries';

const VisibleController = ({ item }) => {
  const updateVisibility = useUpdateVisibility();

  return (
    <div className='inline-block'>
      <button
        type='button'
        className={clsx(
          item.visible ? 'bg-white' : 'bg-indigo-500',
          'rounded border border-gray-200 p-2 font-medium'
        )}
        onClick={() => updateVisibility.mutate(item.id)}
      >
        {item.visible ? (
          <EyeIcon className='h-5 w-5 text-indigo-600' />
        ) : (
          <EyeSlashIcon className='h-5 w-5 text-white' />
        )}
      </button>
    </div>
  );
};

export default VisibleController;
