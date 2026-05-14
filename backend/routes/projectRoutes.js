const express = require("express");

const { createProject, addMember, getProjects, removeMemberFromProject, } = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getProjects);

router.post("/", protect, createProject);
router.put("/add-member", protect, addMember);

router.put(
  "/remove-member",
  protect,
  removeMemberFromProject
);

module.exports = router;