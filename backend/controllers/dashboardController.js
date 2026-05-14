const Task = require("../models/Task");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    const baseFilter = {
      $or: [
        { assignedTo: userId },
        { createdBy: userId },
      ],
    };

    const totalTasks = await Task.countDocuments(baseFilter);

    const todoTasks = await Task.countDocuments({
      ...baseFilter,
      status: "todo",
    });

    const inProgressTasks = await Task.countDocuments({
      ...baseFilter,
      status: "in-progress",
    });

    const doneTasks = await Task.countDocuments({
      ...baseFilter,
      status: "done",
    });

    const overdueTasks = await Task.countDocuments({
      ...baseFilter,
      dueDate: { $lt: new Date() },
      status: { $ne: "done" },
    });

    const tasksPerUser = await Task.aggregate([
      { $match: baseFilter },

      {
        $group: {
          _id: "$assignedTo",
          totalTasks: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $project: {
          totalTasks: 1,
          userName: "$user.name",
          userEmail: "$user.email",
        },
      },
    ]);

   const recentTasks = await Task.find(baseFilter)
  .sort({ createdAt: -1 })
  .limit(5)
  .select(
    "title description status createdAt"
  );


    res.json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      overdueTasks,
      tasksPerUser,
      recentTasks,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData };