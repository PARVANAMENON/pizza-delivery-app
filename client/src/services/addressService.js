import API from "./api";

// Get all addresses
export const getAddresses = (token) => {
  return API.get("/address", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add address
export const addAddress = (token, addressData) => {
  return API.post("/address", addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update address
export const updateAddress = (token, id, addressData) => {
  return API.put(`/address/${id}`, addressData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete address
export const deleteAddress = (token, id) => {
  return API.delete(`/address/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};