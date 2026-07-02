import API from "./api";

export const createSingleOrder = (data) => {
  return API.post("/orders/single", data);
};

export const getOrders = () => {
  return API.get("/orders");
};

export const cancelOrder = (id) => {
  return API.put(`/orders/cancel/${id}`);
};