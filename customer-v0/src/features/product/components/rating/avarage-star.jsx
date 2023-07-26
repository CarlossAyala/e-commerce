import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import descompose from '../../utils/descompose';

const AvarageStar = ({ rate, index }) => {
  const [int, float] = descompose(rate);

  let width;
  if (rate > index && int === index && float) width = `${float * 100}%`;
  else if (rate > index) width = '100%';
  else width = '0%';

  return (
    <div className='relative h-6 w-6'>
      <StarOutline className='absolute h-6 w-6 text-indigo-500' />
      <div className='absolute overflow-hidden' style={{ width }}>
        <StarSolid className='h-6 w-6 text-indigo-500' />
      </div>
    </div>
  );
};

export default AvarageStar;
