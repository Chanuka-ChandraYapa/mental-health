import { createTheme } from "@mui/material/styles";
import { useState } from "react";

const useCustomTheme = () => {
  const [selectedRating, setSelectedRating] = useState(5);

  const ratingColors = {
    1: "#f44336", // Very Dissatisfied - red
    2: "#ff5722", // Dissatisfied - orange
    3: "#ffc107", // Neutral - yellow
    4: "#8bc34a", // Satisfied - light green
    5: "#0bdc84", // Very Satisfied - green
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #272727 inset",
                WebkitTextFillColor: "default",
              },
            },
          },
        },
      },
    },
    palette: {
      mode: "dark",
      background: {
        main: "#272727",
        default: "#121212", // Set a dark background color
        paper: "#1e1e1e", // Set a slightly lighter color for paper surfaces
      },
      primary: {
        main: ratingColors[selectedRating],
      },
      secondary: {
        main: "#89f0c3", // Change this to your preferred secondary color
      },
    },
  });

  theme.typography.h3 = {
    fontFamily: "Lato , sans-serif",
    fontSize: "0.5rem",
    "@media (min-width:300px)": {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4.4rem",
    },
  };
  theme.typography.h4 = {
    fontFamily: "Lato , sans-serif",
    fontSize: "0.5rem",
    "@media (min-width:300px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };
  theme.typography.h5 = {
    fontFamily: "Lato , sans-serif",
    fontSize: "0.5rem",
    "@media (min-width:300px)": {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.7rem",
    },
  };

  return { theme, selectedRating, setSelectedRating };
};

export default useCustomTheme;
