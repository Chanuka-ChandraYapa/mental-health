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
import { useTranslation } from "react-i18next";

const NavBar = ({ unreadCount, setUnreadCount, isTokenValid }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate(); // Use the hook
  const { token } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

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
          <ListItemText primary={t("home")} />
        </ListItem>
        {isTokenValid && (
          <>
            <ListItem button onClick={() => handleChange(null, 1)}>
              <ListItemText primary={t("chat")} />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 2)}>
              <ListItemText primary={t("mood")} />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 3)}>
              <ListItemText primary={t("recommendations")} />
            </ListItem>
            <ListItem button onClick={handleMenu}>
              <ListItemText primary={t("resources")} />
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
              <MenuItem onClick={handleVideos}>{t("videos")}</MenuItem>
              <MenuItem onClick={handleArticles}>{t("articles")}</MenuItem>
            </Menu>
            <ListItem button onClick={() => handleChange(null, 5)}>
              <ListItemText primary={t("support")} />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 6)}>
              <ListItemText primary={t("therapists")} />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 7)}>
              <ListItemText primary={t("profile")} />
            </ListItem>
            <ListItem button onClick={() => handleChange(null, 8)}>
              <ListItemText primary={t("notifications")} />
            </ListItem>
            <ListItem button onClick={() => handleLogOut()}>
              <ListItemText primary={t("logout")} />
            </ListItem>
          </>
        )}
        {!isTokenValid && (
          <>
            <ListItem button onClick={() => handleSignIn()}>
              <ListItemText primary={t("login")} />
            </ListItem>
            <ListItem button onClick={() => handleRegister()}>
              <ListItemText primary={t("signup")} />
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
              <Tab label={t("home")} />
              {isTokenValid && <Tab label={t("chat")} />}
              {isTokenValid && <Tab label={t("mood")} />}
              {isTokenValid && <Tab label={t("recommendations")} />}
              {isTokenValid && (
                <>
                  <Tab label={t("resources")} onClick={handleMenu} />
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
                    <MenuItem onClick={handleVideos}>{t("videos")}</MenuItem>
                    <MenuItem onClick={handleArticles}>
                      {t("articles")}
                    </MenuItem>
                  </Menu>
                </>
              )}
              {isTokenValid && <Tab label={t("support")} />}
              {isTokenValid && <Tab label={t("therapists")} />}
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
                {t("logout")}
              </Button>
            ) : (
              <Button color="inherit" onClick={handleSignIn}>
                {t("login")}
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
