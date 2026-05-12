const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      projectId,
      assignedToEmail,
    } = req.body;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check if user is project member
    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({
        message: "Not a project member",
      });
    }

    // Find assigned user
    const assignedUser = await User.findOne({
      email: assignedToEmail,
    });

    if (!assignedUser) {
      return res.status(404).json({
        message: "Assigned user not found",
      });
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status:"todo",
      project: projectId,
      assignedTo: assignedUser._id,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

res.status(500).json({
  message: error.message,
  error,
});
  }
};



const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    // Find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check permission
    if (
      task.assignedTo.toString() !== req.user._id.toString() &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to update task",
      });
    }

    // Update status
    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    // Base query
    let query = {
      $or: [
        { assignedTo: req.user._id },
        { createdBy: req.user._id },
      ],
    };

    // If projectId exists, filter by project
    if (projectId) {
      query.project = projectId;
    }

    const tasks = await Task.find(query)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  updateTaskStatus,
  getTasks
};