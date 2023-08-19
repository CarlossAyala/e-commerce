import { SellerClient, getToken, urlWithQuery } from "../../api";

const SALES = "sales";

const API = {
  async get(orderId) {
    const url = `${SALES}/${orderId}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async getAll(query) {
    const url = urlWithQuery(SALES, query);
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};

export default API;
