import api from "./api";

// Signup
export const signupUser = (data) => {
  return api.post("/api/auth/signup", data);
};

// Login
export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};