import formateDate from '../../utils/formate-date';

const d = new Date();

const ReviewDate = () => {
  return (
    <div>
      <p className='text-sm font-light tracking-tight text-gray-500'>
        {formateDate(d)}
      </p>
    </div>
  );
};

export default ReviewDate;
