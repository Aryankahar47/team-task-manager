import api from "./api";

// fetch dashboard stats
export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};