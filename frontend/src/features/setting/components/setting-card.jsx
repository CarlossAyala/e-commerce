import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const SettingCard = ({ setting }) => {
  return (
    <li>
      <Link
        className='group flex flex-col rounded-md border border-gray-200 p-3 shadow-md'
        to={setting.to}
      >
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-medium text-gray-800 group-hover:text-blue-600'>
              {setting.label}
            </h3>
            <p className='text-sm text-gray-500'>{setting.description}</p>
          </div>
          <div>
            <ChevronRightIcon className='h-5 w-5 text-gray-500' />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default SettingCard;
