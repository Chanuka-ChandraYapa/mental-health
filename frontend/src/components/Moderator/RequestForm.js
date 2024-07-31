import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";

const ModeratorRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualifications: "",
    reasons: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: "20px", marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          Moderator Request Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Reasons for Applying"
                name="reasons"
                value={formData.reasons}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit Request
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ModeratorRequestForm;
