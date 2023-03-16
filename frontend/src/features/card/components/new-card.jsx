import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from '../../auth';
import cleanFormValues from '../../utils/helpers/cleanFormValues';
import { FieldText } from '../../ui/form';
import * as Card from '..';

const New = () => {
  const [jwt] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const cleanValues = cleanFormValues({ ...values });

    try {
      const response = await Card.API.create(jwt, cleanValues);

      navigate(`/account/card/view/${response.id}`);
    } catch (error) {
      console.log('New Card', error);
    }
  };

  return (
    <section className='mx-auto w-full max-w-7xl p-4'>
      <div className='mx-auto max-w-md'>
        <div>
          <h2 className='text-lg font-medium text-gray-900'>New Card</h2>
          <p className='text-sm text-gray-500'>
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <Formik
          initialValues={Card.Formik.initial}
          validationSchema={Card.Formik.schema}
          onSubmit={handleSubmit}
        >
          <Form className='mt-5 space-y-4'>
            <div className='grid gap-4'>
              {Card.Form.one.map((item, index) => (
                <div key={index}>
                  <FieldText
                    name={item.name}
                    label={item.label}
                    opcional={item.opcional}
                    placeholder={item.placeholder}
                    type={item.type}
                    {...item}
                  />
                </div>
              ))}
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-5'>
              <Link
                to='/account/card'
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

export default New;
