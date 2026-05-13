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

  useEffect(() => {
  const fetchStats = async () => {
    const projectId = localStorage.getItem("projectId");

    console.log("PROJECT ID IN DASHBOARD:", projectId);

    if (!projectId) return;

    const data = await getDashboardStats(projectId);
    setStats(data);
  };

  fetchStats();
}, []);



  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dashboard Overview
      </Typography>

      {!stats && (
  <Typography>
    Loading dashboard...
  </Typography>
)}

      <Grid container spacing={3}>
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
<Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
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

      <Box mt={5}>
  <Typography
    variant="h5"
    fontWeight="bold"
    mb={3}
  >
    Tasks Per User
  </Typography>

  <Grid container spacing={3}>
    {stats?.tasksPerUser?.map((user, index) => (
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
    ))}
  </Grid>
</Box>


    </Box>
  );
};

export default Dashboard;