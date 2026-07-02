import API from "./api";

export const getVeggies = () => API.get("/veggies");
export const addVeggie = (data) => API.post("/veggies", data);
export const updateVeggie = (id, data) => API.put(`/veggies/${id}`, data);
export const deleteVeggie = (id) => API.delete(`/veggies/${id}`);