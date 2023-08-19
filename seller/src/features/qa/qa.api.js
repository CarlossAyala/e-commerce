import { SellerClient, getToken, urlWithQuery } from "../../api";

const QA = "qa";

const API = {
  async get(productId) {
    const url = `${QA}/${productId}`;
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
  async getList(productId) {
    const url = `${QA}/${productId}/list`;
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
    const url = urlWithQuery(`${QA}/all`, query);
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
  async reply(questionId, reply) {
    const url = `${QA}/${questionId}/reply`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "POST",
      url,
      data: reply,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async reject(questionId) {
    const url = `${QA}/${questionId}/reject`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "PATCH",
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
