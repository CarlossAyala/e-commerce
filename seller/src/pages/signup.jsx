import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { TextInput, Button, PasswordInput, Loading } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { signupInitial, signupSchema, useSignup } from '../auth';

const Signup = () => {
  const signup = useSignup();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await signup.mutateAsync(values);

      navigate('/signin');
    } catch (error) {
      console.log('<Signup />', error);
    }
  };

  return (
    <div className='grid min-h-screen grid-cols-1'>
      <div className='flex flex-col items-center justify-center px-4'>
        {signup.isLoading && (
          <Loading withOverlay description='Creating your account' />
        )}
        {/* Header */}
        <div className='mb-4 w-full'>
          <h1>Sign up</h1>
          <p className='mt-1'>
            Have an account? <Link to='/signin'>Sign in</Link>
          </p>
        </div>
        {/* TODO: Alerts? */}
        {/* Form */}
        <Formik
          initialValues={signupInitial}
          validationSchema={signupSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='w-full'>
              <div className='mb-8 mt-4 space-y-5'>
                <TextInput
                  id='name'
                  name='name'
                  labelText='Name'
                  type='text'
                  placeholder='Your name'
                  size='lg'
                  invalidText={errors.name}
                  invalid={errors.name && touched.name}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='lastname'
                  name='lastName'
                  labelText='Last Name'
                  type='text'
                  placeholder='Your last name'
                  size='lg'
                  invalidText={errors.lastName}
                  invalid={errors.lastName && touched.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id='Email'
                  name='email'
                  labelText='Email'
                  type='email'
                  placeholder='Your email'
                  size='lg'
                  invalidText={errors.email}
                  invalid={errors.email && touched.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PasswordInput
                  id='Password'
                  labelText='Password'
                  type='password'
                  name='password'
                  placeholder='Your password'
                  size='lg'
                  invalidText={errors.password}
                  invalid={errors.password && touched.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <PasswordInput
                  id='confirm-password'
                  labelText='Confirm Password'
                  type='password'
                  name='confirmPassword'
                  placeholder='Confirm password'
                  size='lg'
                  invalidText={errors.confirmPassword}
                  invalid={errors.confirmPassword && touched.confirmPassword}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button
                renderIcon={(props) => <ArrowRight size={24} {...props} />}
                iconDescription='Rigth Icon'
                kind='primary'
                type='submit'
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className='hidden'>Img</div>
    </div>
  );
};

export default Signup;
