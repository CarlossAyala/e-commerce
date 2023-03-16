import { Link } from 'react-router-dom';

const SignInUp = () => {
  return (
    <div className='hidden lg:flex lg:items-center lg:gap-x-1'>
      <Link
        to='signin'
        className='p-2 text-sm font-medium text-gray-700 hover:text-gray-800'
      >
        Sign in
      </Link>
      <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
      <Link
        to='signup'
        className='p-2 text-sm font-medium text-gray-700 hover:text-gray-800'
      >
        Create account
      </Link>
    </div>
  );
};

export default SignInUp;
