import { SellerClient } from "../../lib/axios";
import { urlWithQuery } from "../../utils/url";

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
  async getAll(query) {
    const url = urlWithQuery(`/${CATEGORIES}`, query);

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
