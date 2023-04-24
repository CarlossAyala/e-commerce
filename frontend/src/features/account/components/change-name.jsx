import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { changeNameSchema, changeNameReinitialize } from '../account.formik';
import { useAuth } from '../../auth';
import { FieldText } from '../../ui/form';
import API from '../account.api';

const ChangeName = () => {
  const [resource, setResource] = useState(null);

  const [jwt] = useAuth();
  const navigate = useNavigate();

  const getAccount = async () => {
    try {
      const data = await API.getProfile(jwt);

      // console.log('profile user', data);

      setResource(data);
    } catch (error) {
      console.log('ChangeName GetAccount', error);
    }
  };

  const onSubmit = async (values) => {
    try {
      await API.changeName(jwt, values);
      console.log('Name and LastName updated!');
      navigate('/settings/account');
    } catch (error) {
      console.log('ChangeName Submit', error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <main className='mx-auto w-full max-w-7xl'>
      <div className='mx-auto h-full max-w-xl'>
        <div className='overflow-hidden sm:mt-5 '>
          <div className='p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Actualizar nombre y apellido
            </h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Se actualizaran el nombre y apellido
            </p>
          </div>
          <Formik
            initialValues={changeNameReinitialize(resource)}
            validationSchema={changeNameSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ dirty }) => (
              <Form className='p-4'>
                <div>
                  <FieldText name='name' label='Name' placeholder='Your name' />
                </div>
                <div className='mt-4'>
                  <FieldText
                    name='lastName'
                    label='Last name'
                    placeholder='Your last name'
                  />
                </div>

                <div className='mt-10 flex items-center justify-end gap-x-5'>
                  <Link
                    to='/settings/account'
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

export default ChangeName;