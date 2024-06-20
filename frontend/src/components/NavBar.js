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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Use the hook
  const { token } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
        {token && (
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
          </>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
