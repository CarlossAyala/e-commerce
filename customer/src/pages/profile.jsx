import { Form, Formik } from 'formik';
import {
  Button,
  TextInput,
  InlineLoading,
  PasswordInput,
  ToastNotification,
  SkeletonText,
  TextInputSkeleton,
} from '@carbon/react';
import {
  changeNameInitial,
  changeNameSchema,
  changePasswordInitial,
  changePasswordSchema,
  useChangeName,
  useChangePassword,
  useGetProfile,
} from '../auth';
import { useState } from 'react';

const Profile = () => {
  const [success, setSuccess] = useState(false);

  const customer = useGetProfile();
  const changeName = useChangeName();
  const changePassword = useChangePassword();

  const handleChangeName = async (values, actions) => {
    try {
      // sleep
      await new Promise((resolve) => setTimeout(resolve, 5000));

      await changeName.mutateAsync(values);

      setSuccess(true);
    } catch (error) {
      console.log('<Profile />');
      console.log('handleChangeName', error);
    } finally {
      setTimeout(() => {
        actions.setSubmitting(false);
        setSuccess(false);
      }, 1500);
    }
  };

  const handleChangePassword = async (values, actions) => {
    try {
      // sleep
      await new Promise((resolve) => setTimeout(resolve, 5000));

      await changePassword.mutateAsync(values);

      setSuccess(true);
      actions.resetForm();
    } catch (error) {
      console.log('<Profile />');
      console.log('handleChangePassword', error);
    } finally {
      setTimeout(() => {
        actions.setSubmitting(false);
        setSuccess(false);
      }, 1500);
    }
  };

  return (
    <main className='flex w-full flex-col overflow-auto bg-white'>
      <section className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-2xl font-medium leading-none'>Account</h1>
        <h2 className='text-lg font-medium leading-snug text-gray-500'>
          Profile
        </h2>
      </section>

      {customer.isLoading ? (
        <section className='space-y-6'>
          <div className='p-4'>
            <div>
              <div className='w-1/3'>
                <SkeletonText />
              </div>
              <div>
                <SkeletonText width='100%' />
                <SkeletonText width='100%' />
              </div>
            </div>
            <div className='mt-5'>
              <TextInputSkeleton id='change-password-skeleton-1' />
            </div>
          </div>
          <div className='p-4'>
            <div>
              <div className='w-1/3'>
                <SkeletonText />
              </div>
              <div>
                <SkeletonText width='100%' />
                <SkeletonText width='100%' />
              </div>
            </div>
            <div className='mt-5'>
              <TextInputSkeleton id='change-password-skeleton-1' />
            </div>
          </div>
          <div className='p-4'>
            <div>
              <div className='w-1/3'>
                <SkeletonText />
              </div>
              <div>
                <SkeletonText width='100%' />
                <SkeletonText width='100%' />
              </div>
            </div>
            <div className='mt-5'>
              <TextInputSkeleton id='change-password-skeleton-1' />
            </div>
          </div>
        </section>
      ) : (
        <>
          {customer.isSuccess && (
            <section className='space-y-6'>
              <div className='p-4'>
                <h2 className='text-base font-semibold'>
                  Personal Information
                </h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <dl className='mt-4 space-y-3'>
                  <div>
                    <dt className='text-sm font-semibold leading-6 text-gray-900'>
                      Full name
                    </dt>
                    <dd className='text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                      {customer.data.name} {customer.data.lastName}
                    </dd>
                  </div>
                  <div>
                    <dt className='text-sm font-semibold leading-6 text-gray-900'>
                      Email
                    </dt>
                    <dd className='text-sm leading-6 text-gray-600 sm:col-span-2 sm:mt-0'>
                      {customer.data.email}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='p-4'>
                <h2 className='text-base font-semibold'>Change name</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <Formik
                  initialValues={changeNameInitial(customer.data)}
                  validationSchema={changeNameSchema}
                  enableReinitialize
                  onSubmit={handleChangeName}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form className='mt-6 grid gap-6'>
                      <TextInput
                        id='name-input'
                        name='name'
                        labelText='Name'
                        placeholder='Your name'
                        size='md'
                        invalid={errors.name && touched.name}
                        invalidText={errors.name}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />
                      <TextInput
                        id='lastname-input'
                        name='lastName'
                        labelText='Last name'
                        placeholder='Your lastname'
                        size='md'
                        invalid={errors.lastName && touched.lastName}
                        invalidText={errors.lastName}
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                      />

                      {isSubmitting || success ? (
                        <div className='py-2 pl-2'>
                          <InlineLoading
                            description={success ? 'Done!' : 'Submitting...'}
                            status={success ? 'finished' : 'active'}
                          />
                        </div>
                      ) : (
                        <Button type='submit'>Save</Button>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>

              <div className='p-4'>
                <h2 className='text-base font-semibold'>Change password</h2>
                <p className='text-sm leading-tight text-gray-600'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consectetur quaerat.
                </p>

                <Formik
                  initialValues={changePasswordInitial}
                  validationSchema={changePasswordSchema}
                  onSubmit={handleChangePassword}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form className='mt-6'>
                      <div className='grid gap-4'>
                        <PasswordInput
                          id='old-password-input'
                          name='oldPassword'
                          labelText='Old password'
                          placeholder='Your old password'
                          size='md'
                          invalid={errors.oldPassword && touched.oldPassword}
                          invalidText={errors.oldPassword}
                          value={values.oldPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                        <PasswordInput
                          id='new-password-input'
                          name='newPassword'
                          labelText='New password'
                          placeholder='Your new password'
                          size='md'
                          invalid={errors.newPassword && touched.newPassword}
                          invalidText={errors.newPassword}
                          value={values.newPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                        <PasswordInput
                          id='confirm-password-input'
                          name='confirmPassword'
                          labelText='Confirm password'
                          placeholder='Confirm your password'
                          size='md'
                          invalid={
                            errors.confirmPassword && touched.confirmPassword
                          }
                          invalidText={errors.confirmPassword}
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                        />
                      </div>

                      {changePassword.isError && (
                        <div className='mt-6'>
                          <ToastNotification
                            style={{ width: '100%' }}
                            aria-label='closes notification'
                            onCloseButtonClick={() => {}}
                            statusIconDescription='notification'
                            title='Error'
                            subtitle={
                              changePassword.error.response.data.message
                            }
                          />
                        </div>
                      )}

                      <div className='mt-6'>
                        {isSubmitting || success ? (
                          <div className='py-2 pl-2'>
                            <InlineLoading
                              description={success ? 'Done!' : 'Submitting...'}
                              status={success ? 'finished' : 'active'}
                            />
                          </div>
                        ) : (
                          <Button type='submit'>Save</Button>
                        )}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};

export default Profile;
