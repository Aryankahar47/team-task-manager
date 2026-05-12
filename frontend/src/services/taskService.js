import api from "./api";

// GET tasks
export const getTasks = async (projectId = "") => {
  const res = await api.get("/tasks", {
    params: {
      projectId,
    },
  });

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