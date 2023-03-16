import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { Formik, Form } from 'formik';
import cleanFormValues from '../../utils/helpers/cleanFormValues';
import { FieldText, Textarea } from '../../ui/form';
import AddressAPI from '../address.api';
import { AddressFormik, AddressForm } from '..';

const NewAddress = () => {
  const [jwt] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const cleanValues = cleanFormValues({ ...values });

    try {
      const response = await AddressAPI.create(jwt, cleanValues);

      navigate(`/account/address/view/${response.id}`);
    } catch (error) {
      console.log('New Address', error);
    }
  };

  return (
    <section className='mx-auto w-full max-w-7xl flex-1 p-4'>
      <div className='mx-auto max-w-md'>
        <div>
          <h2 className='text-lg font-medium text-gray-900'>New Address</h2>
          <p className='text-sm text-gray-500'>
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <Formik
          initialValues={AddressFormik.initial}
          validationSchema={AddressFormik.schema}
          onSubmit={handleSubmit}
        >
          <Form className='mt-5 mb-10 space-y-4'>
            <div className='grid gap-4'>
              {AddressForm.one.map((item, index) => (
                <div key={index}>
                  <FieldText
                    name={item.name}
                    label={item.label}
                    opcional={item.opcional}
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <p className='mb-2'>¿Entre qué calles está? </p>
                <span className='italic text-gray-400'>Opcional</span>
              </div>
              <div className='grid gap-4 gap-x-5'>
                {AddressForm.two.map((item, index) => (
                  <div key={index}>
                    <FieldText
                      name={item.name}
                      label={item.label}
                      opcional={item.opcional}
                      placeholder={item.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {AddressForm.three.map((item) => (
                <Textarea
                  name={item.name}
                  label={item.label}
                  opcional={item.opcional}
                  placeholder={item.placeholder}
                  key={item.name}
                />
              ))}
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-5'>
              <Link
                to='/account/address'
                className='rounded-md px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              >
                Cancelar
              </Link>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default NewAddress;
