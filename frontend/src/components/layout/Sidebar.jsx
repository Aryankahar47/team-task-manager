import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        padding: 2
      }}
    >
      <List>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/projects")}>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/tasks")}>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );
};

export default Sidebar;