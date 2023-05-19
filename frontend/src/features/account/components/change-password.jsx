import { useAuth } from '../../auth';
import { Link, useNavigate } from 'react-router-dom';
import API from '../account.api';
import { changePasswordInitial, changePasswordSchema } from '../account.formik';
import { Form, Formik } from 'formik';
import { FieldText } from '../../ui/form';

const ChangePassword = () => {
  const { jwt } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await API.changePassword(jwt, values);
      console.log('Password updated!');
      navigate('/settings');
    } catch (error) {
      console.log('ChangePassword Submit', error);
    }
  };

  return (
    <main className='mx-auto w-full max-w-7xl'>
      <div className='mx-auto h-full max-w-xl'>
        <div className='overflow-hidden sm:mt-5 '>
          <div className='p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Change password
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Actualizar contraseña
            </p>
          </div>
          <Formik
            initialValues={changePasswordInitial}
            validationSchema={changePasswordSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ dirty }) => (
              <Form className='p-4'>
                <div>
                  <FieldText
                    name='oldPassword'
                    label='Old password'
                    placeholder='Your old password'
                    type='password'
                  />
                </div>
                <div className='mt-4'>
                  <FieldText
                    name='newPassword'
                    label='New password'
                    placeholder='Your new password'
                    type='password'
                  />
                </div>
                <div className='mt-4'>
                  <FieldText
                    name='confirmPassword'
                    label='Confirm new password'
                    placeholder='Confirm your new password'
                    type='password'
                  />
                </div>

                <div className='mt-10 flex items-center justify-end gap-x-5'>
                  <Link
                    to='/settings'
                    className='rounded-md px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  >
                    Cancelar
                  </Link>
                  <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-25'
                    disabled={!dirty}
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
