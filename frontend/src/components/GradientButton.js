import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #4beba5 30%, #0bdc84 90%)",
  border: 0,
  borderRadius: 40,
  color: "white",
  height: 48,
  padding: "0 30px",
  fontSize: "1.5rem", // Change text size here
  "&:hover": {
    boxShadow: "0 3px 5px 2px rgba(137, 240, 195, .3)",
  },
}));
