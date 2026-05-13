import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../../services/taskService";

// import { getProjects } from "../../services/projectService";

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
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");

  // OPTIONAL: you can hardcode projectId for now
  // const projectId = "YOUR_PROJECT_ID_HERE";

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

//   const handleCreate = async () => {
//   try {
//     if (!title.trim()) return;

//     // GET FIRST PROJECT
//     const projects = await getProjects();

//     if (projects.length === 0) {
//       alert("Create a project first");
//       return;
//     }

//     const projectId = projects[0]._id;

//     await createTask({
//       title,
//       description: "Task Description",
//       dueDate: new Date(),
//       priority: "medium",
//       projectId,
//       assignedToEmail: "test@gmail.com", // IMPORTANT
//     });

//     setTitle("");

//     fetchTasks();
//   } catch (error) {
//     console.log("Create task error:", error);
//   }
// };

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
      {/* <Box display="flex" gap={2} mb={3}>
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
      </Box> */}

      {/* BOARD */}
      <Box display="grid"
  gridTemplateColumns={{
    xs: "1fr",
    md: "1fr 1fr 1fr",
  }}
  gap={2}>
        
        {/* TODO */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">🟡 Todo ({todo.length})</Typography>
         



{todo.length === 0 && (
  <Typography
    variant="body2"
    color="text.secondary"
    mt={2}
  >
    No tasks
  </Typography>
)}

          {todo.map((task) => (
           <Card key={task._id} sx={cardStyle}>
  <CardContent>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Chip
        label={task.priority || "medium"}
        color={
          task.priority === "high"
            ? "error"
            : task.priority === "low"
            ? "success"
            : "warning"
        }
        size="small"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {task.project?.name}
      </Typography>
    </Stack>


    

    <Typography
      variant="h6"
      fontWeight="bold"
      mb={1}
    >
      {task.title}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      mb={2}
    >
      {task.description || "No description"}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Stack spacing={1}>
      <Typography variant="caption">
        Assigned To:
        {" "}
        <strong>
          {task.assignedTo?.name || "Unknown"}
        </strong>
      </Typography>

      <Typography variant="caption">
        Due:
        {" "}
        {task.dueDate
          ? new Date(task.dueDate)
              .toLocaleDateString()
          : "No due date"}
      </Typography>
    </Stack>

    <Button
      variant="contained"
      size="small"
      sx={{ mt: 2 }}
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

          {progress.length === 0 && (
  <Typography
    variant="body2"
    color="text.secondary"
    mt={2}
  >
    No tasks
  </Typography>
)}

          {progress.map((task) => (
            <Card key={task._id} sx={cardStyle}>
  <CardContent>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Chip
        label={task.priority || "medium"}
        color={
          task.priority === "high"
            ? "error"
            : task.priority === "low"
            ? "success"
            : "warning"
        }
        size="small"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {task.project?.name}
      </Typography>
    </Stack>

    <Typography
      variant="h6"
      fontWeight="bold"
      mb={1}
    >
      {task.title}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      mb={2}
    >
      {task.description || "No description"}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Stack spacing={1}>
      <Typography variant="caption">
        Assigned To:
        {" "}
        <strong>
          {task.assignedTo?.name || "Unknown"}
        </strong>
      </Typography>

      <Typography variant="caption">
        Due:
        {" "}
        {task.dueDate
          ? new Date(task.dueDate)
              .toLocaleDateString()
          : "No due date"}
      </Typography>
    </Stack>

    {/* <Button
      variant="contained"
      size="small"
      sx={{ mt: 2 }}
      onClick={() =>
        handleStatus(task._id, "in-progress")
      }
    >
      Start
    </Button> */}



    <Stack direction="row" spacing={1} mt={2}>
  <Button
    variant="outlined"
    size="small"
    onClick={() =>
      handleStatus(task._id, "todo")
    }
  >
    Back
  </Button>

  <Button
    variant="contained"
    size="small"
    onClick={() =>
      handleStatus(task._id, "done")
    }
  >
    Done
  </Button>
</Stack>

  </CardContent>
</Card>
          ))}
        </Box>






        {/* DONE */}
        <Box sx={columnStyle}>
          <Typography fontWeight="bold">
            🟢 Done ({done.length})
          </Typography>

          {done.length === 0 && (
  <Typography
    variant="body2"
    color="text.secondary"
    mt={2}
  >
    No tasks
  </Typography>
)}

          {done.map((task) => (
            <Card
  key={task._id}
  sx={{
    ...cardStyle,
    opacity: 0.8,
  }}
>
  <CardContent>

    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Chip
        label={task.priority || "medium"}
        color={
          task.priority === "high"
            ? "error"
            : task.priority === "low"
            ? "success"
            : "warning"
        }
        size="small"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        {task.project?.name}
      </Typography>
    </Stack>

    <Typography
      variant="h6"
      fontWeight="bold"
      mb={1}
    >
      {task.title}
    </Typography>

    <Typography
      variant="body2"
      color="text.secondary"
      mb={2}
    >
      {task.description || "No description"}
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <Stack spacing={1}>
      <Typography variant="caption">
        Assigned To:
        {" "}
        <strong>
          {task.assignedTo?.name || "Unknown"}
        </strong>
      </Typography>

      <Typography variant="caption">
        Due:
        {" "}
        {task.dueDate
          ? new Date(task.dueDate)
              .toLocaleDateString()
          : "No due date"}
      </Typography>
    </Stack>

    <Button
  variant="outlined"
  size="small"
  sx={{ mt: 2 }}
  onClick={() =>
    handleStatus(task._id, "in-progress")
  }
>
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