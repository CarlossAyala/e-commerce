import { API_COMMON } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";

const ENDPOINT = `${API_COMMON}/stores`;

export const findById = (storeId) => {
  const url = `${ENDPOINT}/${storeId}/by-id`;

  return fetcher(url);
};
