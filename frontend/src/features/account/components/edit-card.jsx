import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useAuth } from '../../auth';
import cleanFormValues from '../../utils/helpers/cleanFormValues';
import { FieldText } from '../../ui/form';
import * as Card from '..';

const Edit = () => {
  const [resource, setResource] = useState(null);
  const [jwt] = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const getInfoResource = async () => {
    try {
      const info = await Card.API.getOne(jwt, id);

      console.log('EditCard getInfoAddress', info);

      setResource(info);
    } catch (error) {
      console.log('EditCard', error);
    }
  };

  const handleSubmit = async (values) => {
    const cleanValues = cleanFormValues({ ...values });

    try {
      console.log({ jwt, id, cleanValues });
      await Card.API.update(jwt, id, cleanValues);

      console.log('Saved');
      navigate(`/account/card/view/${id}`);
    } catch (error) {
      console.log('New Card', error);
    }
  };

  useEffect(() => {
    getInfoResource();
  }, []);

  if (!resource) return <h1>No card</h1>;

  return (
    <section className='mx-auto w-full max-w-7xl p-4'>
      <div className='mx-auto max-w-md'>
        <div>
          <h2 className='text-lg font-medium text-gray-900'>Edit Card</h2>
          <p className='text-sm text-gray-500'>
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <Formik
          initialValues={Card.Formik.withData(resource)}
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

export default Edit;
