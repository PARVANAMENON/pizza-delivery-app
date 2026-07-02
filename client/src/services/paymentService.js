import API from "./api";

export const createPayment = (data) => {
  return API.post("/payment/create", data);
};

export const verifyPayment = (data) => {
  return API.post("/payment/verify", data);
};