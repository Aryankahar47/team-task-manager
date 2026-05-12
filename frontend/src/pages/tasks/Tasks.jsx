import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../../services/taskService";

import { getProjects } from "../../services/projectService";

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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // OPTIONAL: you can hardcode projectId for now
  const projectId = "YOUR_PROJECT_ID_HERE";

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.log("Fetch tasks error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
  try {
    if (!title.trim()) return;

    // GET FIRST PROJECT
    const projects = await getProjects();

    if (projects.length === 0) {
      alert("Create a project first");
      return;
    }

    const projectId = projects[0]._id;

    await createTask({
      title,
      description: "Task Description",
      dueDate: new Date(),
      priority: "medium",
      projectId,
      assignedToEmail: "test@gmail.com", // IMPORTANT
    });

    setTitle("");

    fetchTasks();
  } catch (error) {
    console.log("Create task error:", error);
  }
};

  const handleStatus = async (taskId, status) => {
    try {
      await updateTaskStatus({ taskId, status });
      fetchTasks();
    } catch (err) {
      console.log("Update status error:", err);
    }
  };

  const todo = tasks.filter((t) => t.status === "todo");
  const progress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Tasks Board
      </Typography>

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

        <Button variant="contained" onClick={handleCreate}>
          Add
        </Button>
      </Box>

      {/* BOARD */}
      <Box display="flex" gap={2}>
        
        {/* TODO */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">🟡 Todo ({todo.length})</Typography>

          {todo.map((task) => (
            <Card key={task._id} sx={cardStyle}>
              <CardContent>
                <Typography fontWeight="bold">{task.title}</Typography>

                <Button onClick={() => handleStatus(task._id, "in-progress")}>
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
                <Typography fontWeight="bold">{task.title}</Typography>

                <Button onClick={() => handleStatus(task._id, "todo")}>
                  Back
                </Button>

                <Button onClick={() => handleStatus(task._id, "done")}>
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
            <Card key={task._id} sx={{ ...cardStyle, opacity: 0.8 }}>
              <CardContent>
                <Typography fontWeight="bold">{task.title}</Typography>

                <Button onClick={() => handleStatus(task._id, "in-progress")}>
                  Reopen
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

      </Box>
    </Box>
  );
};

export default Tasks;