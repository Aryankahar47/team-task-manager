import api from "./api";

// GET ALL PROJECTS
export const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// GET SINGLE PROJECT
export const getProjectById = async (projectId) => {
  const res = await api.get("/projects");

  const project = res.data.find(
    (p) => p._id === projectId
  );

  return project;
};

// CREATE PROJECT
export const createProject = async (projectData) => {
  const res = await api.post("/projects", projectData);
  return res.data;
};


// ADD MEMBER TO PROJECT
export const addMemberToProject = async (
  projectId,
  email
) => {
  const res = await api.put(
    "/projects/add-member",
    {
      projectId,
      email,
    }
  );

  return res.data;
};

export const removeMemberFromProject =
  async (projectId, memberId) => {

    const res = await api.put(
      "/projects/remove-member",
      {
        projectId,
        memberId,
      }
    );

    return res.data;
};