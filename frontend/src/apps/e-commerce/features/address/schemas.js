import { string, object } from "yup";
import { parseString } from "../../../../utils/schema";

const name = string()
  .label("Name")
  .transform(parseString)
  .min(3)
  .max(100)
  .default("")
  .required();
const phone = string()
  .label("Phone")
  .transform(parseString)
  .min(6)
  .max(20)
  .default("")
  .required();
const zipCode = string()
  .label("Zip code")
  .transform(parseString)
  .min(4)
  .max(5)
  .default("")
  .required();
const province = string()
  .label("Province")
  .transform(parseString)
  .min(3)
  .max(50)
  .default("")
  .required();
const city = string()
  .label("City")
  .transform(parseString)
  .min(3)
  .max(50)
  .default("")
  .required();
const street = string()
  .label("Street")
  .transform(parseString)
  .min(3)
  .max(100)
  .default("")
  .required();
const apartmentNumber = string()
  .label("Apartment number")
  .transform(parseString)
  .min(1)
  .max(5)
  .default("")
  .required();
const indications = string().label("Indications").max(255).default("");

export const addressSchema = object({
  name,
  phone,
  zipCode,
  province,
  city,
  street,
  apartmentNumber,
  indications,
});

export const addressInitial = addressSchema.getDefault();

export const addressDefault = (values) => {
  return {
    name: values?.name ?? addressInitial.name,
    phone: values?.phone ?? addressInitial.phone,
    zipCode: values?.zipCode ?? addressInitial.zipCode,
    province: values?.province ?? addressInitial.province,
    city: values?.city ?? addressInitial.city,
    street: values?.street ?? addressInitial.street,
    apartmentNumber: values?.apartmentNumber ?? addressInitial.apartmentNumber,
    indications: values?.indications ?? addressInitial.indications,
  };
};
