import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NavBar = ({ unreadCount, setUnreadCount, isTokenValid }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Use the hook
  const { token } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setValue(0);
    navigate("/");
    window.location.reload();
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleClose();
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
      case 7:
        navigate("/profile");
        break;
      case 8:
        navigate("/notifications");
        setUnreadCount(0);
        break;
      default:
        break;
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVideos = () => {
    setValue(4);
    navigate(`/resources/videos`);
    setAnchorEl(null);
  };

  const handleArticles = () => {
    setValue(4);
    navigate(`/resources/articles`);
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => handleChange(null, 0)}>
          <ListItemText primary="Home" />
        </ListItem>
        {isTokenValid && (
          <>
            <ListItem button onClick={() => handleChange(null, 1)}>
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 2)}>
              <ListItemText primary="Mood" />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 3)}>
              <ListItemText primary="Recommendations" />
            </ListItem>
            <ListItem button onClick={handleMenu}>
              <ListItemText primary="Resources" />
            </ListItem>
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
            <ListItem button onClick={() => handleChange(null, 5)}>
              <ListItemText primary="Support" />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 6)}>
              <ListItemText primary="Therapists" />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 7)}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 8)}>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button onClick={() => handleLogOut()}>
              <ListItemText primary="Log Out" />
            </ListItem>
          </>
        )}
        {!isTokenValid && (
          <>
            <ListItem button onClick={() => handleSignIn()}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => handleRegister()}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <AppBar
      position="fixed"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(63, 81, 181, 0))",
          height: "64px", // Adjust this to your AppBar height
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mental Bloom
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {menuItems}
            </Drawer>
          </>
        ) : (
          <>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" />
              {isTokenValid && <Tab label="Chat" />}
              {isTokenValid && <Tab label="Mood" />}
              {isTokenValid && <Tab label="Recommendations" />}
              {isTokenValid && (
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
              {isTokenValid && <Tab label="Support" />}
              {isTokenValid && <Tab label="Therapists" />}
              {/* {token && <Tab label="Profile" />} */}
              {isTokenValid && (
                <Tab icon={<AccountCircleIcon />} aria-label="Profile" />
              )}
              {isTokenValid && (
                <Tab
                  icon={
                    <Badge badgeContent={unreadCount} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  }
                  arial-label="Notifications"
                />
              )}
            </Tabs>
            {isTokenValid ? (
              <Button color="inherit" onClick={handleLogOut}>
                Log Out
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignIn}>
                Sign In
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
