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

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
