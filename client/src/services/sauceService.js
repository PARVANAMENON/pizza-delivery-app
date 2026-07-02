import API from "./api";

export const getSauces = () => API.get("/sauces");
export const addSauce = (data) => API.post("/sauces", data);
export const updateSauce = (id, data) => API.put(`/sauces/${id}`, data);
export const deleteSauce = (id) => API.delete(`/sauces/${id}`);