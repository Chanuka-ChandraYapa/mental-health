import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/themes"; // Import your custom theme
import useCustomTheme from "./utils/customTheme";
import Register from "./components/Register";
import SignIn from "./components/Signin";
import Home from "./components/Home";
import Chat from "./components/Chat/Chat";
import NavBar from "./components/NavBar";
import Forum from "./components/Forum/Forum";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import Mood from "./components/Mood/Mood";
import Resources from "./components/Resources";
import Blog from "./components/Resources/blog";
import Recommendation from "./components/Recommendations/Recomm";
import RobotAnimation from "./components/robot/Robot";
import PostDetails from "./components/Forum/PostDetails";
import EditPage from "./components/Resources/editor";
import TherapistMap from "./components/Therapists/Therapists";
import ModeratorRequestForm from "./components/Moderator/RequestForm";
import Dashboard from "./components/Profile/profile";
import Notification from "./components/Notifications/client";
import Notifications from "./components/Notifications/Notifications";
import ChatDrawer from "./components/Chat/ChatDrawer";
import ChatPage from "./components/Chat/ChatPage";
import Login from "./components/Music/auth";
import Callback from "./components/Music/callback";
import Music from "./components/Music/music";
import checkToken from "./utils/checkToken";
import LanguageSwitcher from "./utils/langSwicher";

const AppContent = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const isValid = await checkToken();
      setIsTokenValid(isValid);
      setLoading(false);
    };

    validateToken();
  }, [location]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4001/notifications");

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userId = currentUser.id;

      if (userId === notification.userId) {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
        setUnreadCount((prev) => prev + 1);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <NavBar
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
        isTokenValid={isTokenValid}
      />
      <Box mt={isMobile ? 0 : 0}></Box>
      {!isMobile && !isAuthPage && <ChatDrawer />}
      {!isAuthPage && <Music />}
      <LanguageSwitcher />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={isTokenValid ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/support"
          element={isTokenValid ? <Forum /> : <Navigate to="/login" />}
        />
        <Route
          path="/support/:id"
          element={isTokenValid ? <PostDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/mood"
          element={isTokenValid ? <Mood /> : <Navigate to="/login" />}
        />
        <Route
          path="/resources/videos"
          element={isTokenValid ? <Resources /> : <Navigate to="/login" />}
        />
        <Route
          path="/resources/articles"
          element={isTokenValid ? <Blog /> : <Navigate to="/login" />}
        />
        <Route
          path="/recommendations"
          element={isTokenValid ? <Recommendation /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit"
          element={isTokenValid ? <EditPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/therapists"
          element={isTokenValid ? <TherapistMap /> : <Navigate to="/login" />}
        />
        <Route
          path="/moderator"
          element={
            isTokenValid ? <ModeratorRequestForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={isTokenValid ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={
            isTokenValid ? (
              <Notifications
                setUnreadCount={setUnreadCount}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notification"
          element={isTokenValid ? <Notification /> : <Navigate to="/login" />}
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/music"
          element={isTokenValid ? <Music /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AppContent />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
