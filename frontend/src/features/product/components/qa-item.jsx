import { ChevronDownIcon } from '@heroicons/react/24/outline';

const QAItem = ({ qa }) => {
  return (
    <div>
      {/* Question */}
      <div className='break-words'>
        <p className='font-light text-black'>Es rico?</p>
      </div>
      {/* Answer */}
      <div className='mt-1 flex items-start'>
        <div className='mr-1'>
          <ChevronDownIcon className='h-6 w-6 rotate-45 text-slate-300' />
        </div>
        <div className='break-words'>
          <p className='font-light text-gray-600'>{qa.answer.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QAItem;
