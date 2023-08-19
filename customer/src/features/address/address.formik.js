import * as Yup from "yup";

const name = Yup.string().label("Full name").min(3).max(100).required();
const phone = Yup.string().label("Phone number").min(6).max(20).required();
const zipCode = Yup.string().label("Zip code").min(4).max(5).required();
const province = Yup.string().label("Province").min(3).max(50).required();
const city = Yup.string().label("City").min(3).max(50).required();
const street = Yup.string().label("Street").min(3).max(100).required();
const apartmentNumber = Yup.string()
  .label("Apartment number")
  .min(1)
  .max(5)
  .required();
const indications = Yup.string().label("Indications").max(255);

export const validationSchema = Yup.object({
  name,
  phone,
  zipCode,
  province,
  city,
  street,
  apartmentNumber,
  indications,
});

export const initialValues = {
  name: "",
  phone: "",
  zipCode: "",
  province: "",
  city: "",
  street: "",
  apartmentNumber: "",
  indications: "",
};

export const withInitialValues = (values) => {
  return {
    name: values.name ?? "",
    phone: values.phone ?? "",
    zipCode: values.zipCode ?? "",
    province: values.province ?? "",
    city: values.city ?? "",
    streetName: values.streetName ?? "",
    street: values.street ?? "",
    apartmentNumber: values.apartmentNumber ?? "",
    indications: values.indications ?? "",
  };
};
