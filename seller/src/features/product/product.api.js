import { SellerClient, getToken, urlWithQuery } from "../../api";

const PRODUCTS = "products";

const API = {
  async stockAlert() {
    const url = `${PRODUCTS}/stock-alert`;
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
  async getProduct(productId) {
    const url = `${PRODUCTS}/${productId}`;
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
  async getProducts(query) {
    const url = urlWithQuery(`${PRODUCTS}`, query);
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
  async createProduct(values) {
    const url = `${PRODUCTS}`;
    const token = getToken();
    const { data } = await SellerClient.request({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });
    return data;
  },
  async updateProduct(productId, values) {
    const url = `${PRODUCTS}/${productId}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "PUT",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: values,
    });

    return data;
  },
  async deleteProduct(productId) {
    const url = `${PRODUCTS}/${productId}`;
    const token = getToken();

    const { data } = await SellerClient.request({
      method: "DELETE",
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
