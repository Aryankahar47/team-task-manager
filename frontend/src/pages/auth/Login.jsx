import { useState } from "react";
import { loginUser } from "../../services/authService";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const Login = () => {

  const { login, token} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  if (token) {
    navigate("/dashboard");
  }
}, [token, navigate]);
  // state for controlled inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);

    localStorage.setItem("token", res.data.token);

console.log("LOGIN RESPONSE:", res.data);

    login(res.data); // store auth globally

    navigate("/dashboard"); // 🔥 redirect after login

    console.log("Login Successful");
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            padding: 4,
          }}
        >
          {/* Heading */}
          <Typography
  variant="h4"
  gutterBottom
  sx={{ textAlign: "center" }}
>
            Team Task Manager
          </Typography>

          {/* Subheading */}
          <Typography
  variant="body1"
  color="text.secondary"
  mb={4}
  sx={{ textAlign: "center" }}
>
            Login to manage your projects and tasks
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Box>

          {/* Signup Link */}
          <Typography
  variant="body2"
  mt={3}
  sx={{ textAlign: "center" }}
>
            Don’t have an account?{" "}
            <Link href="/signup" underline="hover">
              Signup
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;