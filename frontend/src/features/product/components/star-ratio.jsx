import { StarIcon } from '@heroicons/react/24/solid';

const StarRatio = ({ stars }) => {
  return (
    <div className='flex items-center gap-x-2'>
      <StarIcon className='h-6 w-6 text-indigo-500' />
      <StarIcon className='h-6 w-6 text-indigo-500' />
      <StarIcon className='h-6 w-6 text-indigo-500' />
      <StarIcon className='h-6 w-6 text-indigo-500' />
      <StarIcon className='h-6 w-6 text-indigo-500' />
    </div>
  );
};

export default StarRatio;
