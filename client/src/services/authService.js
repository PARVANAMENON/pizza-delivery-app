import API from "./api";

// Register
export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

// Login
export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};

// Forgot Password
export const forgotPassword = (emailData) => {
  return API.post("/auth/forgot-password", emailData);
};

// Reset Password
export const resetPassword = (token, passwordData) => {
  return API.post(`/auth/reset-password/${token}`, passwordData);
};

// Verify Email
export const verifyEmail = (token) => {
  return API.get(`/auth/verify-email/${token}`);
};

// Get Profile
export const getProfile = (token) => {
  return API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};