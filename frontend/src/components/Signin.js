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
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const sessionId = localStorage.getItem("sessionId") || uuidv4();
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId", sessionId);
    }
    try {
      await dispatch(login({ email, password, sessionId }));
    } catch (e) {
      // setLoading(false);
    }
    console.log("yay..", token);
    console.log(message);
    setLoading(false);
    if (localStorage.getItem("token")) {
      // navigate("/"); // Navigate to the home page
      window.location.href = "/";
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
            {t("login")}
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
              label={t("email")}
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label={t("password")}
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
                {!loading ? t("login") : ""}
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
                  {t("Don't have an account?")}
                </Typography>
                <Typography
                  variant="body1"
                  onClick={() => {
                    navigate("/register");
                  }}
                  sx={{ marginLeft: 1, cursor: "pointer" }}
                  color="primary.main"
                >
                  {t("signup")}
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
