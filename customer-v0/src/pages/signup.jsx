import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { Form, Formik } from 'formik';
import { FieldText } from '../features/ui/form';
import { initialValues, schema, useSignup } from '../features/signup';

const Signup = () => {
  const { jwt, user } = useAuth();

  const { mutate } = useSignup();

  const onSubmit = async (values) => {
    try {
      mutate(values);
    } catch (error) {
      console.log('Signup onSubmit', error);
    }
  };

  if (jwt && user) return <Navigate to='/' replace={true} />;

  return (
    <div className='bg-white dark:bg-gray-900'>
      <div className='flex h-screen items-center justify-center'>
        <div className='mx-auto flex w-full max-w-md items-center px-6 lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                Sign up
              </h1>
            </div>

            <div className='mt-8'>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form className='grid gap-3'>
                    <div>
                      <FieldText
                        label='First name'
                        name='name'
                        placeholder='Your first name'
                      />
                    </div>
                    <div>
                      <FieldText
                        name='lastName'
                        label='Last name'
                        placeholder='Your last name'
                      />
                    </div>
                    <div>
                      <FieldText
                        label='Email'
                        name='email'
                        placeholder='Email'
                        type='email'
                      />
                    </div>
                    <div>
                      <FieldText
                        label='Password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        autoComplete='new-password'
                      />
                    </div>
                    <div>
                      <FieldText
                        label='Confirm password'
                        name='confirmPassword'
                        placeholder='Confirm password'
                        autoComplete='new-password'
                        type='password'
                      />
                    </div>

                    <div className='mt-6'>
                      <button
                        type='submit'
                        className='w-full transform rounded-lg bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                      >
                        Sign up
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className='mt-6 text-center text-sm text-gray-400'>
                Already have an account?{' '}
                <Link
                  to='/signin'
                  className='text-blue-500 hover:underline focus:underline focus:outline-none'
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
