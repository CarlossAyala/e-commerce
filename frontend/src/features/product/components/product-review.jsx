import { HandThumbUpIcon, StarIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import StarRatio from './star-ratio';

const ProductReview = () => {
  const [more, setMore] = useState(false);

  const text =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem vel reiciendis unde tempora error quasi odit explicabo, culpa dictacorporis placeat, voluptate ipsum sed numquam amet id aliquam veroconsectetur.';

  return (
    <div className='grid divide-y divide-gray-200'>
      {/* Stars points */}
      <div className='grid grid-cols-2 p-4'>
        <div className='flex flex-col items-start space-y-2'>
          {/* Number promedio Stars */}
          <div>
            <p className='text-4xl font-medium lining-nums text-indigo-500'>
              4.6
            </p>
          </div>
          <div className='space-y-2'>
            {/* Number Stars */}
            <StarRatio />
            {/* Total reviews */}
            <p className='text-sm font-light text-gray-600'>
              <span className='lining-nums'>1.596</span> calificaciones
            </p>
          </div>
        </div>
        <div>
          <ul className='space-y-1'>
            <li className='flex items-center gap-x-2'>
              <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
                <div className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400' />
              </div>
              <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
                <span className='leading-none'>5</span>
                <StarIcon className='h-3 w-3 text-neutral-400' />
              </div>
            </li>
            <li className='flex items-center gap-x-2'>
              <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
                <div className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400' />
              </div>
              <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
                <span className='leading-none'>4</span>
                <StarIcon className='h-3 w-3 text-neutral-400' />
              </div>
            </li>
            <li className='flex items-center gap-x-2'>
              <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
                <div className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400' />
              </div>
              <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
                <span className='leading-none'>3</span>
                <StarIcon className='h-3 w-3 text-neutral-400' />
              </div>
            </li>
            <li className='flex items-center gap-x-2'>
              <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
                <div className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400' />
              </div>
              <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
                <span className='leading-none'>2</span>
                <StarIcon className='h-3 w-3 text-neutral-400' />
              </div>
            </li>
            <li className='flex items-center gap-x-2'>
              <div className='relative h-1 w-full rounded-r-full bg-gray-200'>
                <div className='absolute inset-0 w-4/5 rounded-r-full bg-gray-400' />
              </div>
              <div className='flex items-center gap-x-1 lining-nums text-neutral-400'>
                <span className='leading-none'>1</span>
                <StarIcon className='h-3 w-3 text-neutral-400' />
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Reviews */}
      <div className='space-y-1 divide-y divide-gray-200 px-4'>
        <article className='py-4'>
          {/* Stars - Date */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-px'>
              <StarIcon className='h-4 w-4 text-indigo-500' />
              <StarIcon className='h-4 w-4 text-indigo-500' />
              <StarIcon className='h-4 w-4 text-indigo-500' />
              <StarIcon className='h-4 w-4 text-indigo-500' />
              <StarIcon className='h-4 w-4 text-indigo-500' />
            </div>
            <div>
              <p className='text-sm font-light tracking-tight text-gray-500'>
                21 mar 2023
              </p>
            </div>
          </div>
          {/* Text Review */}
          <div className='mt-2'>
            <p className='font-light leading-tight text-black'>
              {more ? text : `${text.slice(0, 100)}...`}
            </p>
            {text.length >= 100 && (
              <button
                className='mb-2 text-indigo-600'
                onClick={() => setMore((curr) => !curr)}
              >
                {more ? 'Leer menos' : 'Leer más'}
              </button>
            )}
          </div>
          {/* Likes, Dislikes */}
          <div className='flex items-center gap-x-2 text-sm text-gray-500'>
            {/* Like */}
            <button
              className='flex items-center gap-x-1 rounded-full border border-gray-400 px-3 py-1 leading-none'
              type='button'
            >
              <span>Es útil</span>
              <HandThumbUpIcon className='h-4 w-4 text-gray-400' />
              <span className='lining-nums'>100</span>
            </button>
            <button
              className='flex items-center gap-x-2 rounded-full border border-gray-400 p-1 leading-none'
              type='button'
            >
              <HandThumbUpIcon className='h-4 w-4 text-gray-400' />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProductReview;
