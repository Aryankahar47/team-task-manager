import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../../services/taskService";

import { getProjectById,  addMemberToProject, } from "../../services/projectService";

import { Snackbar, Alert } from "@mui/material";


const columnStyle = {
  flex: 1,
  background: "#f4f6f8",
  borderRadius: 3,
  padding: 2,
  minHeight: "75vh",
};

const cardStyle = {
  borderRadius: 2,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  mb: 2,
  transition: "0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
};

const ProjectDetails = () => {

  const [errorMsg, setErrorMsg] = useState("");

  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [project, setProject] = useState(null);

const [assignedToEmail, setAssignedToEmail] = useState("");

const [memberDialog, setMemberDialog] = useState(false);

const [memberEmail, setMemberEmail] = useState("");

  // FETCH PROJECT TASKS
  const fetchTasks = async () => {
    try {
      const data = await getTasks(projectId);
      setTasks(data);
    } catch (err) {
      console.log("Fetch tasks error:", err);
    }
  };

  // FETCH PROJECT DETAILS
const fetchProject = async () => {
  try {
    const data = await getProjectById(projectId);

    setProject(data);

    // Default assignee
    if (data?.members?.length > 0) {
      setAssignedToEmail(data.members[0].email);
    }
  } catch (error) {
    console.log("Project fetch error:", error);
  }
};

  useEffect(() => {
  fetchTasks();
  fetchProject();
}, [projectId]);

  // CREATE TASK
  const handleCreate = async () => {
  try {
    if (!title.trim()) return;

    await createTask({
      title,
      description,
      dueDate: new Date(),
      priority: "medium",
      projectId,
      assignedToEmail,
    });

    setTitle("");
    setDescription("");
    fetchTasks();

  } catch (error) {
    setErrorMsg(
      error?.response?.data?.message ||
      "Only admin can assign tasks"
    );
  }
};


  // ADD MEMBER
const handleAddMember = async () => {
  try {
    await addMemberToProject(
      projectId,
      memberEmail
    );

    setMemberDialog(false);

    setMemberEmail("");

    fetchProject();
  } catch (error) {
    console.log("Add member error:", error);
  }
};


  // UPDATE TASK STATUS
  const handleStatus = async (taskId, status) => {
    try {
      await updateTaskStatus({ taskId, status });

      fetchTasks();
    } catch (err) {
      console.log("Update status error:", err);
    }
  };

  const todo = tasks.filter((t) => t.status === "todo");

  const progress = tasks.filter(
    (t) => t.status === "in-progress"
  );

  const done = tasks.filter((t) => t.status === "done");

  

  return (
    <Box sx={{ p: 3 }}>
     <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  mb={3}
>
  <Box>
    <Typography
      variant="h4"
      fontWeight="bold"
    >
      {project?.name || "Project Workspace"}
    </Typography>

    <Typography color="text.secondary">
      Team collaboration workspace
    </Typography>
  </Box>

  <Button
    variant="contained"
    onClick={() => setMemberDialog(true)}
  >
    Add Member
  </Button>
</Box>


<Stack
  direction="row"
  spacing={1}
  mb={3}
  flexWrap="wrap"
>
  {project?.members?.map((member) => (
    <Chip
      key={member._id}
      label={member.name}
      color="primary"
      variant="outlined"
    />
  ))}
</Stack>

      {/* CREATE TASK */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
  select
  fullWidth
  label="Assign To"
  value={assignedToEmail}
  onChange={(e) =>
    setAssignedToEmail(e.target.value)
  }
>
  {project?.members?.map((member) => (
    <MenuItem
      key={member._id}
      value={member.email}
    >
      {member.name} ({member.email})
    </MenuItem>
  ))}
</TextField>

        <Button
          variant="contained"
          onClick={handleCreate}
        >
          Add
        </Button>
      </Box>

      {/* BOARD */}
      <Box display="flex" gap={2}>
        
        {/* TODO */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">
            🟡 Todo ({todo.length})
          </Typography>

          {todo.map((task) => (
            <Card key={task._id} sx={cardStyle}>
              <CardContent>
                <Typography fontWeight="bold">
                  {task.title}
                </Typography>

                <Typography
  variant="body2"
  color="text.secondary"
  mb={2}
>
  {task.description}
</Typography>

<Stack direction="row" mt={1}>
  <Chip
    label={
      task.assignedTo?.name || "Unassigned"
    }
    size="small"
    color="primary"
  />
</Stack>

                <Button
                  onClick={() =>
                    handleStatus(task._id, "in-progress")
                  }
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* IN PROGRESS */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">
            🔵 In Progress ({progress.length})
          </Typography>

          {progress.map((task) => (
            <Card key={task._id} sx={cardStyle}>
              <CardContent>
                <Typography fontWeight="bold">
                  {task.title}
                </Typography>

                <Typography
  variant="body2"
  color="text.secondary"
  mb={2}
>
  {task.description}
</Typography>

<Stack direction="row" mt={1}>
  <Chip
    label={
      task.assignedTo?.name || "Unassigned"
    }
    size="small"
    color="primary"
  />
</Stack>
                <Button
                  onClick={() =>
                    handleStatus(task._id, "todo")
                  }
                >
                  Back
                </Button>

                <Button
                  onClick={() =>
                    handleStatus(task._id, "done")
                  }
                >
                  Done
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* DONE */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">
            🟢 Done ({done.length})
          </Typography>

          {done.map((task) => (
            <Card
              key={task._id}
              sx={{
                ...cardStyle,
                opacity: 0.8,
              }}
            >
              <CardContent>
                <Typography fontWeight="bold">
                  {task.title}
                </Typography>

               <Typography
  variant="body2"
  color="text.secondary"
  mb={2}
>
  {task.description}
</Typography>

<Stack direction="row" mt={1}>
  <Chip
    label={
      task.assignedTo?.name || "Unassigned"
    }
    size="small"
    color="primary"
  />
</Stack>

                <Button
                  onClick={() =>
                    handleStatus(
                      task._id,
                      "in-progress"
                    )
                  }
                >
                  Reopen
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Box>

      <Dialog
  open={memberDialog}
  onClose={() => setMemberDialog(false)}
  fullWidth
>
  <DialogTitle>
    Add Team Member
  </DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      margin="normal"
      label="Member Email"
      value={memberEmail}
      onChange={(e) =>
        setMemberEmail(e.target.value)
      }
    />
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() =>
        setMemberDialog(false)
      }
    >
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleAddMember}
    >
      Add Member
    </Button>
  </DialogActions>
</Dialog>


<Snackbar
  open={!!errorMsg}
  autoHideDuration={3000}
  onClose={() => setErrorMsg("")}
>
  <Alert
    severity="error"
    onClose={() => setErrorMsg("")}
  >
    {errorMsg}
  </Alert>
</Snackbar>


    </Box>
  );
};

export default ProjectDetails;