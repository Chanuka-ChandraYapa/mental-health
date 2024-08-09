import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Badge,
  Tooltip,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import renderSkeleton from "../../utils/cardSkeleton";
import config from "../../config";

const MediumEmbed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [option, setOption] = useState("");
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const searchInputRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${config.resources}/medium-feed`);
        setArticles(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Medium articles", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchArticles();
  }, [dialogOpen]);

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const titleMatch =
        article.title &&
        article.title.toLowerCase().includes(search.toLowerCase());
      const contentMatch =
        article.content &&
        article.content.toLowerCase().includes(search.toLowerCase());
      const linkMatch =
        article.link &&
        article.link.toLowerCase().includes(search.toLowerCase());
      const authorMatch =
        article.author &&
        article.author.toLowerCase().includes(search.toLowerCase());

      return titleMatch || contentMatch || linkMatch || authorMatch;
    });
    const sortedArticles = [...filtered].sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    setFilteredArticles(sortedArticles);
  }, [search, articles]);

  // useEffect(() => {
  //   const handleKeyPress = (e) => {
  //     const activeElement = document.activeElement;
  //     if (activeElement && activeElement.tagName === "TEXTAREA") {
  //       return;
  //     }
  //     if (searchInputRef.current) {
  //       searchInputRef.current.focus();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, []);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setOption("");
    setUrl("");
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    if (option === "post-url") {
      try {
        const response = await axios.get(`${config.resources}/extract`, {
          params: { url },
        });
        handleDialogClose();
      } catch (error) {
        console.error("Error extracting URL data", error);
        // Optionally, handle the error in the UI
      }
    } else if (option === "create-story") {
      // Navigate to the edit page
      navigate("/edit");
      handleDialogClose();
    }
  };

  const handleSummary = async (url) => {
    try {
      const response = await axios.get(`${config.resources}/summary`, {
        params: { url },
      });
      articles.map((article) => {
        console.log("hello");
        if (article.link === url) {
          article.summary = response.data.data.sm_api_content;
        }
      });

      setSummary(response.data.data.sm_api_content);
      console.log(url);
    } catch (error) {
      console.error("Error extracting URL data", error);
      // Optionally, handle the error in the UI
    }
  };
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      position: "relative",
      // color: "rgba(0, 0, 0, 0.87)",
      // border: "1px solid #dadde9",
      backgroundColor: "transparent",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#272727",
        opacity: 0.8,
        filter: "blur(2px)",
        zIndex: -1,
      },
    },
  }));

  const mainContentStyle = {
    filter: dialogOpen ? "blur(5px)" : "none",
    transition: "filter 0.3s ease-in-out",
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        p={4}
        mt={4}
      >
        {/* <CircularProgress /> */}
        {renderSkeleton()}
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        px={2}
      >
        <Typography variant="h4" color="primary.main" align="center">
          Something Went Wrong! Please Try Reloading
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        // justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
        color="text.primary"
        p={5}
        style={mainContentStyle}
      >
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputRef={searchInputRef}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={3}>
          {filteredArticles.map((article) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={article.guid}>
              <Card
                onClick={() => handleSummary(article.link)}
                style={{
                  height: "300px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <Badge
                  sx={{
                    position: "absolute",
                    top: 20,
                    left: 35,
                  }}
                  badgeContent={
                    article.link !== ""
                      ? article.link.includes("medium.com")
                        ? "Medium"
                        : "Other"
                      : "Original"
                  }
                  color="primary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                />
                <HtmlTooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  // title={article.summary}
                  title={
                    <React.Fragment>
                      {/* <Typography color="primary.main">TLDR</Typography> */}
                      <Typography fontSize={12}>
                        {article.summary
                          ? article.summary
                          : "Click to generate TLDR"}
                      </Typography>
                    </React.Fragment>
                  }
                  placement="left-start"
                >
                  <Badge
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 35,
                    }}
                    badgeContent="TLDR"
                    color="background"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  />
                </HtmlTooltip>

                <div style={{ height: "300px", overflow: "hidden" }}>
                  <img
                    src={article.image ? article.image : "/noimage.jpg"}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                  >
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="secondary"
                    style={{ fontSize: "14px", marginTop: "10px" }}
                  >
                    {article.author}
                  </Typography>
                  <div style={{ marginTop: "10px" }}>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        component="href"
                        color="primary"
                        style={{
                          textDecoration: "none",
                          color: "primary.main",
                          fontWeight: "bold",
                          display: "inline-block",
                        }}
                      >
                        Read More...
                      </Typography>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "160px", right: "20px" }}
        onClick={handleDialogOpen}
        disabled={user.role == "moderator" ? false : true}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Content</DialogTitle>
        <DialogContent>
          <RadioGroup row value={option} onChange={handleOptionChange}>
            <FormControlLabel
              value="create-story"
              control={<Radio color="primary" />}
              label="Create a Story"
            />
            <FormControlLabel
              value="post-url"
              control={<Radio color="primary" />}
              label="Post a URL"
            />
          </RadioGroup>
          {option === "post-url" && (
            <TextField
              label="Enter URL"
              value={url}
              onChange={handleUrlChange}
              fullWidth
              margin="normal"
            />
          )}
          {/* Add more fields as needed for creating a story */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!option}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default MediumEmbed;
