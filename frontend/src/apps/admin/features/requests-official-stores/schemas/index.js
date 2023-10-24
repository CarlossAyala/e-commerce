import { object, string } from "yup";
import { parseString } from "../../../../../utils";
import { requestOfficialStoreStatus } from "../utils";

const { approved, rejected } = requestOfficialStoreStatus;

const response = string()
  .label("Response")
  .transform(parseString)
  .min(3)
  .max(255)
  .default("")
  .required();
const status = string()
  .label("Action")
  .transform(parseString)
  .oneOf([approved, rejected])
  .default("")
  .required();

export const requestOfficialStoreSchema = object({
  response,
  status,
});

export const requestOfficialStoreInitial =
  requestOfficialStoreSchema.getDefault();
