import { SellerClient, getToken, urlWithQuery } from "../../api";

const REVIEWS = "reviews";

const API = {
  async getAll(query) {
    const url = urlWithQuery(REVIEWS, query);
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
