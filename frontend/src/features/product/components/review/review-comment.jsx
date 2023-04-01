import { useState } from 'react';

const WORDS_LIMIT = 300;

const ReviewComment = ({ text }) => {
  const [more, setMore] = useState(false);

  return (
    <div className='mt-2'>
      <p className='font-light leading-tight text-black'>
        {text.length >= WORDS_LIMIT ? `${text.slice(0, WORDS_LIMIT)}...` : text}
      </p>
      {text.length >= WORDS_LIMIT && (
        <button
          className='mb-2 text-indigo-600'
          onClick={() => setMore((curr) => !curr)}
        >
          {more ? 'Leer menos' : 'Leer más'}
        </button>
      )}
    </div>
  );
};

export default ReviewComment;
