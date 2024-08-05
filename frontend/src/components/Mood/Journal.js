import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Pagination,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import config from "../../config";

const API_URL = `${config.moodtracker}`;

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const entriesPerPage = 5;

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL}/journal`, config);
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "http://localhost:3003/api/journal",
        {
          entry: journalEntry,
        },
        config
      );
      setJournalEntry("");
      fetchEntries();
    } catch (error) {
      console.error("Error saving entry", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.delete(`http://localhost:3003/api/journal/${id}`, config);
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate pagination details
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  // Check if there is an entry for today
  const today = new Date().toISOString().split("T")[0];
  const hasEntryForToday = entries.some(
    (entry) => entry.date.split("T")[0] === today
  );

  return (
    <Container maxWidth="md" sx={{ padding: "20px", minHeight: "100vh" }}>
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Your Journal Entries
          <IconButton
            color="primary"
            onClick={() => setShowEntryForm((prev) => !prev)}
            sx={{ marginLeft: "20px", top: -4 }}
          >
            <AddIcon />
          </IconButton>
        </Typography>
        {showEntryForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Write your journal entry here..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Save Entry
            </Button>
          </form>
        )}
        <Divider />
        {entries.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body1" sx={{ marginTop: "20px" }}>
              Looks like a Deserted. Let's Fill it up.
            </Typography>
            <img
              src="/emptyspace.png"
              style={{ width: "150px", padding: "80px" }}
              alt="Robot"
            />
          </Box>
        ) : (
          <>
            {!hasEntryForToday && (
              <Typography
                variant="h5"
                sx={{ marginTop: "20px" }}
                color="primary.main"
                align="center"
              >
                What did you do today?
              </Typography>
            )}
            <List>
              {currentEntries.map((entry) => (
                <ListItem key={entry._id} alignItems="flex-start">
                  <ListItemText
                    primary={entry.entry}
                    secondary={new Date(entry.date).toLocaleString()}
                    sx={{ wordWrap: "break-word" }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(entry._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Journal;
