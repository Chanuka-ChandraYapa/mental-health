// src/components/EditPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async () => {
    const newArticle = {
      title,
      content,
      imageUrl,
    };

    try {
      const response = await axios.post(
        "http://localhost:3004/createArticle",
        newArticle
      );
      //   onArticleAdded(response.data);
      navigate("/resources/articles");
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };
  const handleSave = () => {
    // Save the story (e.g., send to an API endpoint)
    const newStory = { title, content };
    console.log("Saving story", newStory);
    // Redirect to the previous page or a confirmation page
    navigate("/resources/articles");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      //   justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={5}
      bgcolor="background.default"
      color="text.primary"
    >
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["link", "image"],
            ["clean"], // remove formatting button
          ],
        }}
        style={{ height: "60vh", marginBottom: "60px", width: "100%" }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Story
      </Button>
    </Box>
  );
};

export default EditPage;
