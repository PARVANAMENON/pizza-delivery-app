import API from "./api";

export const getBases = () => API.get("/bases");

export const addBase = (data) => API.post("/bases", data);

export const updateBase = (id, data) =>
  API.put(`/bases/${id}`, data);

export const deleteBase = (id) =>
  API.delete(`/bases/${id}`);