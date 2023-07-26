import AvarageStar from './avarage-star';

const NUM_STARS = 5;

const RatingAvarageStar = ({ rating }) => {
  return (
    <div className='flex items-center gap-x-2'>
      {[...Array(NUM_STARS)].map((_, index) => (
        <AvarageStar rate={rating} index={index} key={index} />
      ))}
    </div>
  );
};

export default RatingAvarageStar;
