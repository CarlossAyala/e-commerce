import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';

const MAX_STARS = 5;
const score = 3;

const ReviewScore = () => {
  return (
    <div className='flex items-center gap-px'>
      {[...Array(MAX_STARS)].map((_, index) => {
        return score > index ? (
          <StarSolid className='h-4 w-4 text-indigo-500' key={index} />
        ) : (
          <StarOutline className='h-4 w-4 text-indigo-500' key={index} />
        );
      })}
    </div>
  );
};

export default ReviewScore;
