import { StarIcon } from '@heroicons/react/24/solid';

const RatingStatItem = ({ index, value }) => {
  return (
    <li className='flex items-center gap-x-2'>
      <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
        <div
          className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400'
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
        <span className='leading-none'>{index}</span>
        <StarIcon className='h-3 w-3 text-neutral-400' />
      </div>
    </li>
  );
};

export default RatingStatItem;
