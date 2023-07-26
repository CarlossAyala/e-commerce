import RatingStatItem from './rating-stat-item';

const N_STATS = 5;

const RatingStat = () => {
  return (
    <ul className='flex flex-col-reverse gap-y-2'>
      {[...Array(N_STATS)].map((item, index) => (
        <RatingStatItem
          index={++index}
          value={Math.floor(Math.random() * 10)}
          key={index}
        />
      ))}
    </ul>
  );
};

export default RatingStat;
