import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import {
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GradientButton } from "./GradientButton";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const Register = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, message } = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onFormSubmit = async (data) => {
    setLoading(true);
    await dispatch(register(data));
    setLoading(false);

    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  return (
    <Slide direction="left" in={true} timeout={250}>
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
            backgroundColor: "rgba(0, 0, 0, 0.9)",
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
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  sx={{ marginBottom: 2 }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  sx={{ marginBottom: 5 }}
                />
              )}
            />
            <div align="center">
              <GradientButton
                variant="contained"
                type="submit"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : null
                }
              >
                {!loading ? "Register" : ""}
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
                  Already have an account?
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => {
                    navigate("/login");
                  }}
                  sx={{ marginLeft: 1, cursor: "pointer" }}
                  color="primary.main"
                >
                  Login
                </Typography>
              </Box>
            </div>
          </form>
        </Container>
      </Box>
    </Slide>
  );
};

export default Register;
