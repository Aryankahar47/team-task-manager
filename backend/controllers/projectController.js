const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const User = require("../models/User");

const addMember = async (req, res) => {
  try {
    const { projectId, email } = req.body;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check admin
    if (project.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Only admin can add members",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check already member
    if (project.members.includes(user._id)) {
      return res.status(400).json({
        message: "User already a member",
      });
    }

    // Add member
    project.members.push(user._id);

    await project.save();

   const updatedProject =
  await Project.findById(projectId)
    .populate("admin", "name email")
    .populate("members", "name email");

res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user._id,
    })
      .populate("admin", "name email")
      .populate("members", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeMemberFromProject = async (req, res) => {
  try {
    const { projectId, memberId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ONLY ADMIN CAN REMOVE
    if (
      project.admin.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only admin can remove members",
      });
    }

    // CANNOT REMOVE ADMIN
    if (
      project.admin.toString() === memberId
    ) {
      return res.status(400).json({
        message: "Admin cannot be removed",
      });
    }

    project.members = project.members.filter(
      (member) =>
        member.toString() !== memberId
    );

    await project.save();

    const updatedProject =
  await Project.findById(projectId)
    .populate("admin", "name email")
    .populate("members", "name email");

    res.status(200).json(updatedProject);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  addMember,
  getProjects,
  removeMemberFromProject
};