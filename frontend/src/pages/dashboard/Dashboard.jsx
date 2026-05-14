import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
} from "@mui/material";

import { getDashboardStats } from "../../services/dashboardService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const cardStyle = {
  borderRadius: 3,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
  },
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  console.log(stats);

  useEffect(() => {
   const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchStats();
}, []);


const chartData = [
  {
    name: "Todo",
    value: stats?.todoTasks || 0,
  },
  {
    name: "In Progress",
    value: stats?.inProgressTasks || 0,
  },
  {
    name: "Done",
    value: stats?.doneTasks || 0,
  },
];

const COLORS = [
  "#fbc02d",
  "#1976d2",
  "#2e7d32",
];





  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh", mt: 1, mb: 1 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dashboard Overview
      </Typography>

      {!stats && (
  <Typography sx={{ mt: 3, mb: 3 }} >
    Loading dashboard...
  </Typography>
)}

      <Grid container spacing={3} sx={{ mt: 3, mb: 3 }}>
        {[
  {
    label: "Total Tasks",
    value: stats?.totalTasks,
  },
  {
    label: "Todo",
    value: stats?.todoTasks,
  },
  {
    label: "In Progress",
    value: stats?.inProgressTasks,
  },
  {
    label: "Completed",
    value: stats?.doneTasks,
  },
  {
    label: "Overdue Tasks",
    value: stats?.overdueTasks,
  },
].map((item, i) => (
<Grid item xs={12} sm={6} md={4} lg={2.4} key={i} >
              <Card sx={cardStyle}>
              <CardContent>
                <Typography color="text.secondary" fontSize={14}>
                  {item.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>
                  {item.value || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, mb: 6 }}>

  <Typography
    variant="h5"
    fontWeight="bold"
    mb={3} sx={{ mt: 2, mb: 3 }}
  >
    Tasks Per User
  </Typography>

  <Grid container spacing={5}>

    {stats?.tasksPerUser?.map(
      (user, index) => (

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
        >

          <Card sx={cardStyle}>

            <CardContent>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >

                <Typography fontWeight="bold">
                  {user.userName}
                </Typography>

                <Chip
                  label={`${user.totalTasks} Tasks`}
                  color="primary"
                />

              </Stack>

              <Typography
                mt={2}
                color="text.secondary"
              >
                {user.userEmail}
              </Typography>

            </CardContent>

          </Card>

        </Grid>

      )
    )}

  </Grid>

</Box>

<Box sx={{ mt: 8, mb: 6 }}>
    <Grid container spacing={30}>

    {/* CHART */}
    <Grid item xs={12} md={8}>
      <Card sx={cardStyle}>
        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Task Status Overview
          </Typography>

          <Box height={400}>

            <ResponsiveContainer
  width="100%"
  height={300}
>
  <PieChart>

    <Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={90}
  label
>
  {chartData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

    <Tooltip />

    <Legend />

  </PieChart>
</ResponsiveContainer>

          </Box>

        </CardContent>
      </Card>
    </Grid>

    {/* RECENT TASKS */}
    <Grid item xs={12} md={4}>
      <Card sx={cardStyle}>
        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            Recent Activity
          </Typography>

          <Stack spacing={2}>

            {stats?.recentTasks?.length > 0 ? (

              stats.recentTasks.map((task) => (

                <Card
                  key={task._id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >

                  <Typography
                    fontWeight="bold"
                  >
                    {task.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                  >
                    {task.description ||
                      "No description"}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mt={2}
                  >

                    <Chip
                      label={task.status}
                      color={
                        task.status === "done"
                          ? "success"
                          : task.status ===
                            "in-progress"
                          ? "primary"
                          : "warning"
                      }
                      size="small"
                    />

                    <Typography
                      variant="caption"
                    >
                      {new Date(
                        task.createdAt
                      ).toLocaleDateString()}
                    </Typography>

                  </Stack>

                </Card>

              ))

            ) : (

              <Typography color="text.secondary">
                No recent tasks
              </Typography>

            )}

          </Stack>

        </CardContent>
      </Card>
    </Grid>

  </Grid>
</Box>




    </Box>
  );
};

export default Dashboard;