// console.log("TASKS COMPONENT LOADED");
import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  Button,
} from "@mui/material";

import {
  DndContext,
  closestCorners,
    DragOverlay,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  getTasks,
  updateTaskStatus,
  deleteTask,
   updateTask,
} from "../../services/taskService";


import {
  useDroppable,
} from "@dnd-kit/core";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

const columnStyle = {
  background: "#f4f6f8",
  borderRadius: 3,
  padding: 2,
  minHeight: "75vh",
};

const cardStyle = {
  borderRadius: 3,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  mb: 2,
  transition: "0.2s",
  cursor: "grab",

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
};

const TaskCard = ({ task, handleStatus, handleDelete,  handleEditClick }) => {

  const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
   isDragging,
} = useSortable({
  id: task._id,
});

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};



  return (
    <Card
      ref={setNodeRef}
      style={style}
      // {...listeners}
      // {...attributes}
      sx={{
  ...cardStyle,
  opacity: isDragging
    ? 0.4
    : task.status === "done"
    ? 0.8
    : 1,
}}
    >
      <CardContent>

        <Box
  {...listeners}
  {...attributes}
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    cursor: "grab",
    color: "text.secondary",
    touchAction: "none",
  }}
>
  <DragIndicatorIcon />
</Box>

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

        {task.status === "todo" && (

          <Stack direction="row" spacing={1} mt={2}>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 2 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() =>
              handleStatus(task._id, "in-progress")
            }
          >
            Start
          </Button>

          <Button
      color="error"
      size="small"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() =>
        handleDelete(task._id)
      }
    >
      Delete
    </Button>

    <Button
  variant="outlined"
  size="small"
  onPointerDown={(e) => e.stopPropagation()}
  onClick={() => handleEditClick(task)}
>
  Edit
</Button>


          </Stack>






        )}

        {task.status === "in-progress" && (
          <Stack direction="row" spacing={1} mt={2}>
            
            <Button
              variant="outlined"
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() =>
                handleStatus(task._id, "todo")
              }
            >
              Back
            </Button>

            <Button
              variant="contained"
              size="small"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() =>
                handleStatus(task._id, "done")
              }
            >
              Done
            </Button>

             <Button
  color="error"
  size="small"
  onClick={() =>
    handleDelete(task._id)
  }
>
  Delete
</Button>

<Button
  variant="outlined"
  size="small"
  onPointerDown={(e) => e.stopPropagation()}
  onClick={() => handleEditClick(task)}
>
  Edit
</Button>
          </Stack>
        )}

        {task.status === "done" && (

           <Stack direction="row" spacing={1} mt={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() =>
              handleStatus(task._id, "in-progress")
            }
          >
            Reopen
          </Button>

           <Button
      color="error"
      size="small"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() =>
        handleDelete(task._id)
      }
    >
      Delete
    </Button>

    <Button
  variant="outlined"
  size="small"
  onPointerDown={(e) => e.stopPropagation()}
  onClick={() => handleEditClick(task)}
>
  Edit
</Button>

          </Stack>
        )}

      </CardContent>
    </Card>
  );
};

const DragPreviewCard = ({ task }) => {
  return (
    <Card
      sx={{
        ...cardStyle,
        rotate: "3deg",
        opacity: 0.95,
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

      </CardContent>
    </Card>
  );
};


const DroppableColumn = ({
  column,
  children,
}) => {

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={columnStyle}
    >
      <Typography fontWeight="bold">
        {column.title}
        {" "}
        ({column.tasks.length})
      </Typography>

      {column.tasks.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
        >
          No tasks
        </Typography>
      )}

      {children}
    </Box>
  );
};

const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [activeTask, setActiveTask] = useState(null);

  const [openEdit, setOpenEdit] =
  useState(false);

  const [selectedTask, setSelectedTask] =
  useState(null);

  const [editData, setEditData] =
  useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatus = async (taskId, status) => {
    try {
      await updateTaskStatus({
        taskId,
        status,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, status }
            : task
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (taskId) => {

  try {

    await deleteTask(taskId);

    setTasks((prev) =>
      prev.filter(
        (task) => task._id !== taskId
      )
    );

  } catch (error) {

    console.log(error);

  }
 };


  const handleDragStart = (event) => {

  const task = tasks.find(
    (t) => t._id === event.active.id
  );

  setActiveTask(task);
 };


  const handleDragEnd = async (event) => {

  const { active, over } = event;

  if (!over) return;

  const taskId = active.id;

  // FIND TARGET COLUMN
  let newStatus;

  if (over.id === "todo") {
    newStatus = "todo";
  }

  else if (over.id === "in-progress") {
    newStatus = "in-progress";
  }

  else if (over.id === "done") {
    newStatus = "done";
  }

  else {

    // IF DROPPED OVER A TASK
    const targetTask = tasks.find(
      (t) => t._id === over.id
    );

    if (!targetTask) return;

    newStatus = targetTask.status;
  }

  await handleStatus(taskId, newStatus);

  setActiveTask(null);
 };


  const todo = tasks.filter(
    (t) => t.status === "todo"
  );

  const progress = tasks.filter(
    (t) => t.status === "in-progress"
  );

  const done = tasks.filter(
    (t) => t.status === "done"
  );

  const columns = [
    {
      id: "todo",
      title: "🟡 Todo",
      tasks: todo,
    },
    {
      id: "in-progress",
      title: "🔵 In Progress",
      tasks: progress,
    },
    {
      id: "done",
      title: "🟢 Done",
      tasks: done,
    },
  ];

  const handleEditClick = (task) => {

  setSelectedTask(task);

  setEditData({
    title: task.title || "",
    description:
      task.description || "",
    priority:
      task.priority || "medium",
  });

  setOpenEdit(true);
 };

 const handleEditSave = async () => {
  try {
    await updateTask(selectedTask._id, editData);

    await fetchTasks(); // safest approach

    setOpenEdit(false);
  } catch (error) {
    console.log(error);
  }
};

  

  


 

  return (
    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Tasks Board
      </Typography>

      <DndContext
        collisionDetection={closestCorners}
         onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "1fr 1fr 1fr",
          }}
          gap={2}
          
          
        >

          {columns.map((column) => (

            <DroppableColumn
           column={column}
           >

             

              <SortableContext
                items={column.tasks.map(
                  (task) => task._id
                )}
                strategy={
                  verticalListSortingStrategy
                }
              >

                {column.tasks.map((task) => (
                  <Box
                    key={task._id}
                    sx={{ mt: 3, mb: 3 }}
                    
                  >
                    <TaskCard
                      task={task}
                      handleStatus={handleStatus}
                       handleDelete={handleDelete}
                       handleEditClick={handleEditClick}
                    />
                  </Box>
                ))}

              </SortableContext>

           </DroppableColumn>
          ))}

        </Box>

        <DragOverlay>

  {activeTask ? (
    <Box sx={{ width: 320 }} >

      

     

     <DragPreviewCard task={activeTask} />

    </Box>
  ) : null}

</DragOverlay>

      </DndContext>

      <Dialog
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  fullWidth
>

  {/* <TaskForm
  initialData={selectedTask}
  onSubmit={handleEditSave}
  onCancel={() => setOpenEdit(false)}
/> */}


  <DialogTitle>Edit Task</DialogTitle>

  <DialogContent>
    <TextField
      fullWidth
      label="Title"
      margin="dense"
      value={editData.title}
      onChange={(e) =>
        setEditData({
          ...editData,
          title: e.target.value,
        })
      }
    />

    <TextField
      fullWidth
      label="Description"
      margin="dense"
      multiline
      rows={3}
      value={editData.description}
      onChange={(e) =>
        setEditData({
          ...editData,
          description: e.target.value,
        })
      }
    />

    <TextField
      select
      fullWidth
      label="Priority"
      margin="dense"
      value={editData.priority}
      onChange={(e) =>
        setEditData({
          ...editData,
          priority: e.target.value,
        })
      }
    >
      <MenuItem value="low">Low</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="high">High</MenuItem>
    </TextField>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenEdit(false)}>
      Cancel
    </Button>

    <Button
      variant="contained"
      onClick={handleEditSave}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

      

    </Box>

    
  );
};

export default Tasks;