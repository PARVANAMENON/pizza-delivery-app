import api from './api';

export const getPizzas = async () => api.get('/pizzas');
export const createPizza = async (data) => api.post('/pizzas', data);
export const updatePizza = async (id, data) => api.put(`/pizzas/${id}`, data);
export const deletePizza = async (id) => api.delete(`/pizzas/${id}`);
