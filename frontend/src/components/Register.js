import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { TextField, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "./GradientButton";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the hook
  const { token, message } = useSelector((state) => state.user);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register({ name, email, password }));
    console.log(token);
    console.log(message);
    if (localStorage.getItem("token")) {
      navigate("/login"); // Navigate to the home page
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url('/register.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Change this to adjust the overlay opacity
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="primary.main"
          mb={5}
        >
          Register
        </Typography>
        <form
          onSubmit={onSubmit}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={name}
            onChange={onChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            sx={{ marginBottom: 5 }}
          />
          <div align="center">
            <GradientButton variant="contained" type="submit">
              Register
            </GradientButton>
          </div>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
