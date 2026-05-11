const express = require("express");

const { createTask, updateTaskStatus } = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTask);

router.put("/status", protect, updateTaskStatus);

module.exports = router;