import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginInitialValues, loginSchema } from '../features/login';
import { useAuth, AccountAPI } from '../features/auth';

const Signup = () => {
  const [jwt, , handlers] = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (jwt) handlers.getProfile(jwt, from);
  }, []);

  const onSubmit = async ({ email, password }) => {
    try {
      const data = await AccountAPI.signin({ email, password });

      // console.log('Login onSubmite', data);

      handlers.signin(data);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
        Login
      </h2>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className='mt-8 grid w-full max-w-sm gap-5'>
            <div>
              <label
                htmlFor='email'
                className='block text-base font-medium text-gray-700'
              >
                Email
              </label>
              <Field
                name='email'
                type='email'
                placeholder='Email Address'
                className='mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-base font-medium text-gray-700'
              >
                Password
              </label>
              <Field
                name='password'
                type='password'
                placeholder='Password'
                className='mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-base'
              />
            </div>
            <button
              type='submit'
              className='relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
