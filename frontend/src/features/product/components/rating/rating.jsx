import RatingAvarage from './rating-avarage';
import RatingAvarageStar from './rating-avarage-star';
import RatingStat from './rating-stat';
import RatingTotal from './rating-total';

const rating = {
  avarage: 4.45,
};

const Rating = () => {
  return (
    <div className='grid grid-cols-2'>
      <div className='flex flex-col justify-between'>
        <RatingAvarage rating={rating.avarage} />
        <RatingAvarageStar rating={rating.avarage} />
        <RatingTotal />
      </div>
      <div>
        <RatingStat />
      </div>
    </div>
  );
};

export default Rating;
