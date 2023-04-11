import API from './account.api';
import View from './components/acount-view';
import Edit from './components/edit-card';
import ChangeName from './components/change-name';
import ChangePassword from './components/change-password';

import { changeNameSchema, changeNameReinitialize } from './account.formik';

export {
  API,
  Edit,
  View,
  ChangeName,
  ChangePassword,
  changeNameSchema,
  changeNameReinitialize,
};
