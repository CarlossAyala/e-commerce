import ReviewComment from './review-comment';
import ReviewDate from './review-date';
import ReviewDislike from './review-dislike';
import ReviewLike from './review-like';
import ReviewScore from './review-score';

const Review = () => {
  const text =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem vel reiciendis unde tempora error quasi odit explicabo, culpa dictacorporis placeat, voluptate ipsum sed numquam amet id aliquam veroconsectetur.';

  return (
    <article className='py-4'>
      <div className='flex items-center justify-between'>
        <ReviewScore />
        <ReviewDate />
      </div>
      <ReviewComment text={text} />
      <div className='mt-2 flex items-center gap-x-2 text-sm text-gray-500'>
        <ReviewLike />
        <ReviewDislike />
      </div>
    </article>
  );
};

export default Review;
