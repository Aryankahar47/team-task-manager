const express = require("express");

const { createProject, addMember, getProjects } = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getProjects);

router.post("/", protect, createProject);
router.put("/add-member", protect, addMember);

module.exports = router;