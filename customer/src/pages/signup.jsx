import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import {
  TextInput,
  Button,
  PasswordInput,
  Loading,
  InlineNotification,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { initialValues, validationSchema, useSignup } from '../features/signup';

const Signup = () => {
  const mutation = useSignup();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await mutation.mutateAsync(values);

      resetForm();

      console.log(data);
    } catch (error) {
      console.log('Signup', error);
    }
  };

  return (
    <div className='grid grid-cols-1 min-h-screen'>
      <div className='flex flex-col items-center justify-center px-4'>
        {mutation.isLoading && (
          <Loading withOverlay description='Creating your account' />
        )}
        {/* Header */}
        <div className='w-full mb-4'>
          <h1>Sign up</h1>
          <p className='mt-1'>
            Have an account? <Link to='/signin'>Sign in</Link>
          </p>
        </div>
        {/* TODO: Alerts? */}
        {mutation.isError && (
          <div className='w-full'>
            <InlineNotification
              title='Notification Error'
              subtitle={mutation.error.response.data.message}
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}
        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className='w-full'>
              <div className='space-y-5 mt-4 mb-8'>
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
