import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
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
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
