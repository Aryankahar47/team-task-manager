const express = require("express");

const { createProject, addMember } = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createProject);
router.put("/add-member", protect, addMember);

module.exports = router;