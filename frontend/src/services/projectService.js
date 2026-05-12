import api from "./api";

// GET PROJECTS
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// CREATE PROJECT
export const createProject = async (projectData) => {
  const res = await api.post("/projects", projectData);
  return res.data;
};