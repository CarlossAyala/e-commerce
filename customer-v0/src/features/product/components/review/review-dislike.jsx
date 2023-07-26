import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const ReviewDislike = () => {
  return (
    <button
      className='flex items-center gap-x-2 rounded-full border border-gray-400 p-1 leading-none'
      type='button'
    >
      <HandThumbUpIcon className='h-4 w-4 text-gray-400' />
    </button>
  );
};

export default ReviewDislike;
