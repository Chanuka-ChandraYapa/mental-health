import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Set a dark background color
      paper: "#1e1e1e", // Set a slightly lighter color for paper surfaces
    },
    primary: {
      main: "#90caf9", // Change this to your preferred primary color
    },
    secondary: {
      main: "#f48fb1", // Change this to your preferred secondary color
    },
  },
});

export default theme;
