import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
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
      const data = await getDashboardStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {[
          { label: "Total Tasks", value: stats?.totalTasks },
          { label: "Todo", value: stats?.todoTasks },
          { label: "In Progress", value: stats?.inProgressTasks },
          { label: "Completed", value: stats?.doneTasks },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
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
    </Box>
  );
};

export default Dashboard;