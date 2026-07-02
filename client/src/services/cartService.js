import API from "./api";

export const addToCart = (data) => {
  return API.post("/cart", data);
};

export const getCartItem = (id) => {
  return API.get(`/cart/${id}`);
};

export const getCart = () => {
  return API.get("/cart");
};

export const removeCartItem = (id) => {
  return API.delete(`/cart/${id}`);
};

export const clearCart = () => {
  return API.delete("/cart");
};