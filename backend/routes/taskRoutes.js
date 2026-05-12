const express = require("express");

const { createTask, updateTaskStatus, getTasks} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/status", protect, updateTaskStatus);

module.exports = router;