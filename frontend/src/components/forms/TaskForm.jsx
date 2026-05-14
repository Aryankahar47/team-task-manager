import { useEffect, useState } from "react";
import { Box, TextField, Button, MenuItem, Stack } from "@mui/material";

const TaskForm = ({ initialData, onSubmit, onCancel, members = [] }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate || "",
assignedTo: initialData.assignedTo?._id || "",      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>

        <TextField
          name="title"
          label="Title"
          value={form.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          name="description"
          label="Description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          name="priority"
          select
          label="Priority"
          value={form.priority}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
  name="dueDate"
  type="date"
  fullWidth
  value={form.dueDate}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
/>
        <TextField
  select
  name="assignedTo"
  label="Assign To"
  value={form.assignedTo}
  onChange={handleChange}
  fullWidth
>
  {members.map((member) => (
<MenuItem key={member._id} value={member._id}>      {member.name} ({member.email})
    </MenuItem>
  ))}
</TextField>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>

          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>

      </Stack>
    </Box>
  );
};

export default TaskForm;