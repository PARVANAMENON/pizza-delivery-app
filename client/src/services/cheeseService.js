import API from "./api";

export const getCheeses = () => API.get("/cheeses");
export const addCheese = (data) => API.post("/cheeses", data);
export const updateCheese = (id, data) => API.put(`/cheeses/${id}`, data);
export const deleteCheese = (id) => API.delete(`/cheeses/${id}`);