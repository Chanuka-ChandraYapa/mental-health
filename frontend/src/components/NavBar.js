import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Button,
  Link,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Use the hook
  const { token } = useSelector((state) => state.user);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setValue(0);
    navigate("/");
    window.location.reload();
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/chat");
        break;
      case 2:
        navigate("/mood");
        break;
      case 3:
        navigate("/recommendations");
        break;
      case 4:
        navigate("/resources");
        break;
      case 5:
        navigate("/support");
        break;
      case 6:
        navigate("/therapists");
        break;
      default:
        break;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVideos = (event) => {
    setValue(4);
    navigate(`/resources/videos`);
    setAnchorEl(null);
  };

  const handleArticles = (event) => {
    setValue(4);
    navigate(`/resources/articles`);
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mental Health Platform
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" />
          {token && <Tab label="Chat" />}
          {token && <Tab label="Mood" />}
          {token && <Tab label="Recommendations" />}
          {token && (
            <>
              <Tab label="Resources" onClick={handleMenu} />
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleVideos}>Videos</MenuItem>
                <MenuItem onClick={handleArticles}>Articles</MenuItem>
              </Menu>
            </>
          )}
          {token && <Tab label="Support" />}
          {token && <Tab label="Therapists" />}
        </Tabs>
        {token ? (
          <Button color="inherit" onClick={handleLogOut}>
            Log Out
          </Button>
        ) : (
          <Button color="inherit" onClick={handleSignIn}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
