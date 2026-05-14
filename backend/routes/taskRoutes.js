const express = require("express");

const { createTask, updateTaskStatus, getTasks,  deleteTask,  updateTask,} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/status", protect, updateTaskStatus);

router.delete("/:id", protect, deleteTask);

router.put("/:id", protect, updateTask);

module.exports = router;