const Task = require("../models/Task");

const getDashboardData = async (req, res) => {
  try {
    // Total tasks
    const totalTasks = await Task.countDocuments();

    // Tasks by status
    const todoTasks = await Task.countDocuments({
      status: "To Do",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const doneTasks = await Task.countDocuments({
      status: "Done",
    });

    // Overdue tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });

    res.status(200).json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};