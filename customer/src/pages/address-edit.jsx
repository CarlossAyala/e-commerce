import { Form, Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAddress,
  useUpdateAddress,
  validationSchema,
  withInitialValues,
} from "../features/address";
import { Button, SkeletonText, TextArea, TextInput } from "@carbon/react";
import { nonEmptyValues } from "../../../seller/src/utils/form/non-empty-values";

const ListInformationSkeleton = () => {
  return (
    <div className="p-4">
      <div className="w-1/3">
        <SkeletonText />
      </div>
      <div className="w-full">
        <SkeletonText style={{ margin: "0" }} />
      </div>
    </div>
  );
};

const AddressEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const address = useGetAddress(id);
  const updateAddress = useUpdateAddress();

  const handleSubmit = async (values) => {
    try {
      console.log("Values", values);
      const cleaned = nonEmptyValues(values);
      console.log("Cleaned  Values", cleaned);
      const updated = await updateAddress.mutateAsync([id, cleaned]);
      console.log("Updated Address", updated);
      navigate(`/account/address/${updated.id}/view`);
    } catch (error) {
      console.log("AddressEdit");
      console.log("handleSubmit", error);
    }
  };

  return (
    <main className="flex w-full flex-col bg-white">
      <section className="border-b border-gray-200 px-4 pb-4 pt-3">
        <h1 className="text-2xl leading-none">Address</h1>
        <h2 className="mt-1 text-base leading-none tracking-wide text-gray-600">
          Edit
        </h2>
      </section>

      {address.isLoading ? (
        <div className="mt-4">
          <div className="flex flex-col px-4">
            <div className="w-1/3">
              <SkeletonText />
            </div>
            <div className="w-3/4">
              <SkeletonText />
            </div>
          </div>
          <div className="divide-y divide-gray-100 border-y border-gray-100">
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
            <ListInformationSkeleton />
          </div>
        </div>
      ) : null}
      {!id || (address.isFetched && !address.data) ? (
        <section className="mt-4 px-4">
          <div className="bg-gray-100 p-4">
            <p className="mb-2 text-base font-semibold leading-none text-gray-900">
              Address not found
            </p>
            <p className="text-sm leading-none text-gray-800">
              Please check the address ID and try again.
            </p>
            <div className="mt-4">
              <Link to="/account/address/list">
                <Button size="md">Go back to the list</Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
      {address.isFetched && address.data ? (
        <section className="px-4 py-2">
          <h3 className="text-xl font-semibold text-gray-900">Edit address</h3>
          <p className="text-sm text-gray-800">
            Será usadas como destino de envío.
          </p>
          <Formik
            initialValues={withInitialValues(address.data)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="mt-4">
                <div className="space-y-4">
                  <TextInput
                    id="address-name"
                    name="name"
                    labelText="Full name"
                    placeholder="Your full name"
                    invalidText={errors.name}
                    invalid={errors.name && touched.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <TextInput
                    id="address-phone"
                    name="phone"
                    labelText="Phone"
                    placeholder="Your phone number"
                    invalidText={errors.phone}
                    invalid={errors.phone && touched.phone}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    id="address-zip-code"
                    name="zipCode"
                    labelText="Zip code"
                    placeholder="Zip code"
                    invalidText={errors.zipCode}
                    invalid={errors.zipCode && touched.zipCode}
                    value={values.zipCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    id="address-province"
                    name="province"
                    labelText="Province"
                    placeholder="Your province"
                    invalidText={errors.province}
                    invalid={errors.province && touched.province}
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    id="address-city"
                    name="city"
                    labelText="City"
                    placeholder="Your city"
                    invalidText={errors.city}
                    invalid={errors.city && touched.city}
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    id="address-street"
                    name="street"
                    labelText="Street"
                    placeholder="Street"
                    invalidText={errors.street}
                    invalid={errors.street && touched.street}
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextInput
                    id="address-apartment-number"
                    name="apartmentNumber"
                    labelText="Apartment number"
                    placeholder="Apartment number"
                    invalidText={errors.apartmentNumber}
                    invalid={errors.apartmentNumber && touched.apartmentNumber}
                    value={values.apartmentNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextArea
                    id="address-indications"
                    name="indications"
                    labelText="Indications information"
                    placeholder="Indications information"
                    maxCount={255}
                    enableCounter={true}
                    invalidText={errors.indications}
                    invalid={errors.indications && touched.indications}
                    value={values.indications}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="mt-8 flex justify-end gap-x-px">
                  <Link to={`/account/address/${id}/view`}>
                    <Button type="button" kind="secondary" size="lg">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" kind="primary" size="lg">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      ) : null}
    </main>
  );
};

export default AddressEdit;
