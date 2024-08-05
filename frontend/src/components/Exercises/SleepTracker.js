// src/SleepTracker.js

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SleepTracker = () => {
  const [sleepData, setSleepData] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSleep = () => {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const duration = (end - start) / (1000 * 60 * 60); // duration in hours

    setSleepData([
      ...sleepData,
      {
        date: new Date().toLocaleDateString(),
        duration,
      },
    ]);

    setStartTime("");
    setEndTime("");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" mt={4}>
        Sleep Tracker
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom align="center">
          Enter Sleep Data
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TextField
            type="time"
            label="Sleep Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="time"
            label="Sleep End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={handleAddSleep}>
            Add Sleep Data
          </Button>
        </Box>
      </Paper>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={sleepData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="duration" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default SleepTracker;
