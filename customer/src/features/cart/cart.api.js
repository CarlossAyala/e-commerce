import { CustomerClient, getToken } from "../../api";

const CART = "cart";

const API = {
  async getCart(queries) {
    const url = `/${CART}${queries ? `?${queries}` : ""}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async addToCart(productId, quantity) {
    const url = `/${CART}/${productId}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        quantity,
      },
    });

    return data;
  },
  async removeFromCart(id) {
    const url = `/${CART}/${id}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: "DELETE",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async updateItemCart(id, quantity) {
    const url = `/${CART}/${id}`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: "PATCH",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { quantity },
    });

    return data;
  },
  async changeVisibility(id) {
    const url = `/${CART}/${id}/visibility`;
    const token = getToken();

    const { data } = await CustomerClient.request({
      method: "PATCH",
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
  async clearCart() {
    const url = `/${CART}/clear`;
    const token = getToken();

    const { data } = await CustomerClient.request({
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
