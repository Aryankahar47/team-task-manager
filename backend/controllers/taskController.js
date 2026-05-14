const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

// const createTask = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       dueDate,
//       priority,
//       projectId,
//       assignedToEmail,
//     } = req.body;

//     // Find project
//     const project = await Project.findById(projectId);

//     if (!project) {
//       return res.status(404).json({
//         message: "Project not found",
//       });
//     }

//     // ADD THIS CHECK (IMPORTANT)
// const isAdmin =
//   project.admin.toString() === req.user._id.toString();

// if (!isAdmin) {
//   return res.status(403).json({
//     message: "Only admin can assign tasks",
//   });
// }

//     // Check if user is project member
//     const isMember = project.members.some(
//   (member) =>
//     member.toString() ===
//     req.user._id.toString()
// );

// if (!isMember) {
//       return res.status(403).json({
//         message: "Not a project member",
//       });
//     }

//     // ONLY ADMIN CAN CREATE TASKS
// if (project.admin.toString() !== req.user._id.toString()) {
//   return res.status(403).json({
//     message: "Only admin can create or assign tasks",
//   });
// }

//     // Find assigned user
//     const assignedUser = await User.findOne({
//       email: assignedToEmail,
//     });

//     if (!assignedUser) {
//       return res.status(404).json({
//         message: "Assigned user not found",
//       });
//     }

//     // CHECK IF ASSIGNED USER IS PART OF PROJECT
// // const isAssignedMember = project.members.some(
// //   (memberId) =>
// //     memberId.toString() === assignedUser._id.toString()
// // );

// // if (!isAssignedMember) {
// //   return res.status(403).json({
// //     message: "Assigned user is not a project member",
// //   });
// // }

    

//     // Create task
//     const task = await Task.create({
//   title,
//   description,
//   dueDate,
//   priority,
//   status: "todo",
//   project: projectId,
//   assignedTo: assignedUser._id,
//   createdBy: req.user._id,
// });

//    const populatedTask = await Task.findById(task._id)
//   .populate("assignedTo", "name email");

// res.status(201).json(populatedTask);
//   } catch (error) {
//     console.log(error);

// res.status(500).json({
//   message: error.message,
//   error,
// });
//   }
// };



const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      projectId,
      // assignedToEmail,
      assignedTo
    } = req.body;

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ✅ CHECK ADMIN ONLY (FINAL FIX)
    const isAdmin =
      project.admin.toString() === req.user._id.toString();

    if (!isAdmin) {
      return res.status(403).json({
        message: "Only admin can create or assign tasks",
      });
    }

    // Check assigned user
   const assignedUser = await User.findById(assignedTo);

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
      status: "todo",
      project: projectId,
      assignedTo: assignedUser._id,
      createdBy: req.user._id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email");

    res.status(201).json(populatedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
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

const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ONLY CREATOR CAN DELETE
    if (
      task.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to delete",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const updateTask = async (req, res) => {

  try {

    const {
      title,
      description,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    task.title =
      title || task.title;

    task.description =
      description || task.description;

    task.priority =
      priority || task.priority;

    task.dueDate =
      dueDate || task.dueDate;

    const updatedTask =
      await task.save();

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


const getTasks = async (req, res) => {
  try {
    const { projectId } = req.query;

    // =====================================
    // CASE 1 → GLOBAL TASKS (Task Page)
    // =====================================
    if (!projectId) {

      const tasks = await Task.find({
        $or: [
          { assignedTo: req.user._id },
          { createdBy: req.user._id },
        ],
      })
        .populate("assignedTo", "name email")
        .populate("project", "name");

      return res.json(tasks);
    }

    // =====================================
    // CASE 2 → PROJECT TASKS (Project Page)
    // =====================================

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const isMember = project.members.some(
      (m) => m.toString() === req.user._id.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        message: "Not authorized for this project",
      });
    }

    let tasks;

    if (project.admin.toString() === req.user._id.toString()) {

      tasks = await Task.find({
        project: projectId,
      })
        .populate("assignedTo", "name email")
        .populate("project", "name");

    } else {

      tasks = await Task.find({
        project: projectId,
        $or: [
          { assignedTo: req.user._id },
          { createdBy: req.user._id },
        ],
      })
        .populate("assignedTo", "name email")
        .populate("project", "name");
    }

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  updateTaskStatus,
  getTasks,
  deleteTask,
   updateTask,
};