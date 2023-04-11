import * as Yup from 'yup';

const name = Yup.string().min(3).max(255).label('Name');
const lastName = Yup.string().min(3).max(255).label('Last name');

const oldPassword = Yup.string().min(8).max(255).label('Old password');
const newPassword = Yup.string()
  .label('New password')
  .min(8)
  .max(255)
  .notOneOf(
    [Yup.ref('oldPassword')],
    'La nueva contraseña debe ser diferente a Old password'
  );
const passwordConfirmation = Yup.string()
  .label('Confirm new password')
  .min(8)
  .max(255)
  .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden');

export const changeNameSchema = Yup.object({
  name: name.required(),
  lastName: lastName.required(),
});

export const changePasswordSchema = Yup.object({
  oldPassword: oldPassword.required(),
  newPassword: newPassword.required(),
  passwordConfirmation: passwordConfirmation.required(),
});

export const changePasswordInitial = {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

export const changeNameReinitialize = (data) => {
  return {
    name: data?.name ?? '',
    lastName: data?.lastName ?? '',
  };
};
