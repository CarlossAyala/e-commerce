import { API_SHARED } from "../../../../configs";
import { fetcher } from "../../../../libs/utils";

const ENDPOINT = `${API_SHARED}/stores`;

export const findById = (storeId) => {
  const url = `${ENDPOINT}/${storeId}/by-id`;

  return fetcher(url);
};
