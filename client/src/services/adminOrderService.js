import API from "./api";

export const getAllOrders = () => {
  return API.get("/orders/admin");
};

export const updateOrderStatus = (id, orderStatus) => {
  return API.put(`/orders/${id}`, { orderStatus });
};