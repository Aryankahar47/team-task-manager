import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import {
  getProjects,
  createProject,
} from "../../services/projectService";





const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log("Projects fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // CREATE PROJECT
  const handleCreateProject = async () => {
    try {
      await createProject({
        name,
        description,
      });

      setOpen(false);

      setName("");
      setDescription("");

      fetchProjects();
    } catch (error) {
      console.log("Create project error:", error);
    }
  };

  const handleOpenProject = (projectId) => {
  console.log("OPENING PROJECT:", projectId);

  localStorage.setItem("projectId", projectId);

  navigate(`/projects/${projectId}`);
};

const ProjectPage = ({ projectId }) => {

  const handleCreateTask = async (data) => {
    await createTask({
      ...data,
      projectId, // IMPORTANT
    });

    console.log("Task created");
  };

  return (
    <TaskForm
      onSubmit={handleCreateTask}
    />
  );
};

  return (
    <Box sx={{ p: 4, background: "#f6f7fb", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box >
          <Typography variant="h4" fontWeight={700}>
            Projects
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, mb: 3 }} >
            Manage all your projects in one place
          </Typography>
        </Box>

        <Button
  variant="contained"
  onClick={() => setOpen(true)}
  sx={{
    borderRadius: 3,
    textTransform: "none",
    px: 3,
    height: "32px",
    fontSize: "0.8rem",
    lineHeight: 1,
  }}
>
  + Create Project
</Button>
      </Stack>

      {/* EMPTY STATE */}
      {projects.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">
            No projects found
          </Typography>

          <Typography variant="body2">
            Create your first project
          </Typography>
        </Box>
      )}

      {/* PROJECT GRID */}
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {project.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                  mb={3}
                >
                  {project.description}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`Members: ${
                      project.members?.length || 0
                    }`}
                    size="small"
                  />

                  <Chip
                    label="Active"
                    size="small"
                    color="success"
                  />
                </Stack>

               <Button
  variant="contained"
  fullWidth
  sx={{
    mt: 3,
    borderRadius: 2,
    textTransform: "none",
  }}
  onClick={() => handleOpenProject(project._id)}
>
  Open Project
</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CREATE PROJECT DIALOG */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Create Project</DialogTitle>

        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCreateProject}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;