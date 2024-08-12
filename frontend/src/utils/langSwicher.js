import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fab, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div style={{ position: "fixed", top: 64, right: 16, zIndex: 100 }}>
      <Fab
        color="primary"
        aria-label="language"
        onClick={handleClick}
        size="small"
      >
        <LanguageIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "150px",
            marginTop: "10px",
          },
        }}
      >
        <MenuItem onClick={() => handleChangeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("si")}>සිංහල</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("ta")}>தமிழ்</MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
