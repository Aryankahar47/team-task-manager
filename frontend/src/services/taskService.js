import api from "./api";

// GET tasks
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

// CREATE task
export const createTask = async (data) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

// UPDATE task status
export const updateTaskStatus = async (data) => {
  const res = await api.put("/tasks/status", data);
  return res.data;
};