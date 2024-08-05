import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const BreathingExercise = ({ onClose }) => {
  const inhaleTime = 4 * 10; // 4 seconds
  const holdTime = 7 * 10; // 7 seconds
  const exhaleTime = 8 * 10; // 8 seconds
  const totalTime = inhaleTime + holdTime + exhaleTime;
  const [elapsedTime, setElapsedTime] = useState(0);
  const [phase, setPhase] = useState("inhale");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => (prevElapsedTime + 1) % totalTime);
      }, 100);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, elapsedTime]);

  useEffect(() => {
    if (elapsedTime < inhaleTime) {
      setPhase("inhale");
    } else if (elapsedTime < inhaleTime + holdTime) {
      setPhase("hold");
    } else {
      setPhase("exhale");
    }
  }, [elapsedTime]);

  const phaseTimeLeft = () => {
    if (phase === "inhale") return inhaleTime - elapsedTime;
    if (phase === "hold") return inhaleTime + holdTime - elapsedTime;
    return totalTime - elapsedTime;
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="300px"
        border={1}
        borderColor="grey.500"
        borderRadius={5}
        padding={3}
      >
        <Typography variant="h5">
          {phase.charAt(0).toUpperCase() + phase.slice(1)}
        </Typography>
        <Typography variant="h3">{Math.ceil(phaseTimeLeft() / 10)}</Typography>
        <LinearProgress
          variant="determinate"
          value={(elapsedTime / totalTime) * 100}
          sx={{ width: "100%", marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (isRunning) {
              setIsRunning(false);
            } else {
              setElapsedTime(0);
              setPhase("inhale");
              setIsRunning(true);
            }
          }}
          sx={{ marginTop: 3 }}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
      </Box>
    </Container>
  );
};

const BreathingExerciseDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        fullWidth
      >
        Open Breathing Exercise
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        borderRadius={5}
      >
        <DialogTitle>Breathing Exercise</DialogTitle>
        <DialogContent>
          <BreathingExercise onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BreathingExerciseDialog;
