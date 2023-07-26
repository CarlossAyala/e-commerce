import { HandThumbUpIcon } from '@heroicons/react/24/outline';

const ReviewLike = () => {
  return (
    <button
      className='flex items-center gap-x-1 rounded-full border border-gray-400 px-3 py-1 leading-none'
      type='button'
    >
      <span>Es útil</span>
      <HandThumbUpIcon className='h-4 w-4 text-gray-400' />
      <span className='lining-nums'>100</span>
    </button>
  );
};

export default ReviewLike;
