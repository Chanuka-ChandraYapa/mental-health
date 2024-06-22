import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import the hook
import { GradientButton } from "./GradientButton";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the hook
  const { token, message } = useSelector((state) => state.user);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(login({ email, password }));
    console.log("yay..", token);
    console.log(message);
    setLoading(false);
    if (localStorage.getItem("token")) {
      navigate("/"); // Navigate to the home page
    }
  };

  return (
    <Slide direction="right" in={true} timeout={250}>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: `url('/signin.jpeg')`,
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
            Sign In
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
              <GradientButton
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : null
                }
              >
                {!loading ? "Sign In" : ""}
              </GradientButton>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                align="center"
                mt={2}
              >
                <Typography variant="body1" gutterBottom color="text.primary">
                  Don't have an account?
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => {
                    navigate("/register");
                  }}
                  sx={{ marginLeft: 1, cursor: "pointer" }}
                  color="primary.main"
                >
                  Register
                </Typography>
              </Box>
            </div>
          </form>
        </Container>
      </Box>
    </Slide>
  );
};

export default SignIn;
