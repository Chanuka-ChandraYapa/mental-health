import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
} from "@mui/material";
import config from "../../config";
import axios from "axios";

const API_URL = `${config.backend}`;

export const PersonalInfo = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    PersonalityType: user.personality,
    bio: user.bio,
    interests: user.interests,
    password: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      // Create an object with the updated user information
      const updatedUser = {
        name: formData.name,
        bio: formData.bio,
        personality: formData.PersonalityType,
        interests: formData.interests,
      };

      // Update user information in localStorage
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const userId = currentUser.id; // Get the current user's ID from localStorage

      // Make API call to update user information
      await axios.put(
        `${API_URL}/api/users/update`, // The endpoint to update user information
        { userId, ...updatedUser }, // Send the updated information and userId
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token for authentication
          },
        }
      );

      // If password is provided, make an API call to update the password
      if (formData.password) {
        await axios.put(
          `${API_URL}/api/users/update-password`, // The endpoint to update the password
          { userId, password: formData.password }, // Send the userId and new password
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token for authentication
            },
          }
        );
      }

      // Update localStorage with the new user information
      setUser({ ...currentUser, ...updatedUser });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, ...updatedUser })
      );

      // Close the dialog
      setOpen(false);
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      <Card sx={{ height: 500, overflow: "auto" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile Picture"
              sx={{ width: 100, height: 100, marginRight: "20px" }}
            />
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1">{user.email}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                sx={{ marginTop: "10px" }}
              >
                Edit
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" mb={1}>
              <strong>Username:</strong> {user.name}
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Member Since:</strong> January 1, 2020
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Personality Type:</strong> {user.personality}
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Bio:</strong> {user.bio}
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Interests:</strong> {user.interests}
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Role:</strong> User
            </Typography>
            <Divider />
            <Typography variant="body1" mb={1}>
              <strong>Last Login:</strong> July 25, 2024
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.bio}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="interests"
            label="Interests"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.interests}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="PersonalityType"
            label="Personality Type"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.PersonalityType}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
