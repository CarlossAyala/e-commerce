import * as Yup from 'yup';

// const id = Yup.string().uuid();
const name = Yup.string().min(2);
const contactName = Yup.string().min(3).max(50);
const contactPhone = Yup.string().min(9);
const zipCode = Yup.string().min(1).max(4);
const province = Yup.string().max(50);
const city = Yup.string().max(50);
const street = Yup.string().max(100);
const streetNumber = Yup.string().max(4);
const apartmentNumber = Yup.string().max(4);
const streetOne = Yup.string().max(100);
const streetTwo = Yup.string().max(100);
const aditional = Yup.string().max(255);

export const schema = Yup.object().shape({
  name: name.required('Name is required'),
  contactName: contactName.required('Fullname is required'),
  contactPhone: contactPhone.required('Phone is required'),
  zipCode: zipCode.required('Zip Code is required'),
  province: province.required('Province is required'),
  city: city.required('City is required'),
  street: street.required('Street/Avenue is required'),
  streetNumber,
  apartmentNumber,
  streetOne,
  streetTwo,
  aditional,
});

export const initial = {
  name: '',
  contactName: '',
  contactPhone: '',
  zipCode: '',
  province: '',
  city: '',
  street: '',
  streetNumber: '',
  apartmentNumber: '',
  streetOne: '',
  streetTwo: '',
  aditional: '',
};

export const withData = (data) => {
  return {
    name: data?.name ?? '',
    contactName: data?.contactName ?? '',
    contactPhone: data?.contactPhone ?? '',
    zipCode: data?.zipCode ?? '',
    province: data?.province ?? '',
    city: data?.city ?? '',
    street: data?.street ?? '',
    streetNumber: data?.streetNumber ?? '',
    apartmentNumber: data?.apartmentNumber ?? '',
    streetOne: data?.streetOne ?? '',
    streetTwo: data?.streetTwo ?? '',
    aditional: data?.aditional ?? '',
  };
};
