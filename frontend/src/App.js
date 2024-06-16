// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/themes"; // Import your custom theme
import Register from "./components/Register";
import SignIn from "./components/Signin";
import Home from "./components/Home";
import Chat from "./components/Chat";
import NavBar from "./components/NavBar";
import Forum from "./components/Forum/Forum";
import { Box } from "@mui/material";
import Mood from "./components/Mood/Mood";
import Resources from "./components/Resources";
import Blog from "./components/Resources/blog";

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <NavBar />
        <Box sx={{ marginTop: 8 }}></Box>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/support" element={<Forum />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/resources/videos" element={<Resources />} />
          <Route path="/resources/articles" element={<Blog />} />
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
