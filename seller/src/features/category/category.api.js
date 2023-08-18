import { SellerClient, urlWithQuery } from "../../api";

const CATEGORIES = "categories";

const API = {
  async get(categoryId) {
    const url = `${CATEGORIES}/${categoryId}`;

    const { data } = await SellerClient.request({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  },
  async getAll(params) {
    const url = urlWithQuery(`/${CATEGORIES}`, params);

    const { data } = await SellerClient.request({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  },
};

export default API;
