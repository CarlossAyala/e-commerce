import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth';
import { API } from '..';

const View = () => {
  const [account, setAccount] = useState(null);

  const [jwt] = useAuth();

  const getAccount = async () => {
    try {
      const data = await API.getProfile(jwt);

      // console.log('Profile', data);

      setAccount(data);
    } catch (error) {
      console.log('Card', error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <main className='mx-auto w-full max-w-7xl'>
      <div className='mx-auto h-full max-w-xl'>
        <div className='overflow-hidden bg-white shadow sm:mt-5 sm:rounded-md sm:border sm:border-gray-200'>
          <div className='p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Mi cuenta
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Personal details and application.
            </p>
          </div>
          <div className='border-t border-gray-200'>
            <dl>
              <div className='p-4'>
                <dt className='font-medium text-gray-800'>Name</dt>
                <div className='mt-1 flex items-center justify-between'>
                  <dd className='text-gray-500'>{account?.name}</dd>
                  <Link
                    to='/settings/change-name'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Update
                  </Link>
                </div>
              </div>
              <div className='p-4'>
                <dt className='font-medium text-gray-800'>Last name</dt>
                <div className='mt-1 flex items-center justify-between'>
                  <dd className='text-gray-500'>{account?.lastName}</dd>
                  <Link
                    to='/settings/change-name'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Update
                  </Link>
                </div>
              </div>
              <div className='p-4'>
                <dt className='font-medium text-gray-800'>E-mail</dt>
                <dd className='mt-1 text-gray-500'>{account?.email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
};

// bg-gray-100 bg-white

export default View;
