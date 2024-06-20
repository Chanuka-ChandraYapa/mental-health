import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Card, Typography, Box, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Questionaire from "./Questionaire";
import { GradientButton } from "../GradientButton";
import { useNavigate } from "react-router-dom";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: (
      <SentimentVeryDissatisfiedIcon
        color="error"
        style={{ fontSize: "7rem" }}
      />
    ),
    label: "Very Dissatisfied",
  },
  2: {
    icon: (
      <SentimentDissatisfiedIcon color="error" style={{ fontSize: "7rem" }} />
    ),
    label: "Dissatisfied",
  },
  3: {
    icon: (
      <SentimentSatisfiedIcon color="warning" style={{ fontSize: "7rem" }} />
    ),
    label: "Neutral",
  },
  4: {
    icon: (
      <SentimentSatisfiedAltIcon color="success" style={{ fontSize: "7rem" }} />
    ),
    label: "Satisfied",
  },
  5: {
    icon: (
      <SentimentVerySatisfiedIcon
        color="success"
        style={{ fontSize: "7rem" }}
      />
    ),
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function Mood() {
  const [step, setStep] = React.useState(1);
  const navigate = useNavigate();
  const handleYes = () => {
    setStep(2);
  };
  const handleOk = () => {
    setStep(1);
    navigate("/recommendations");
  };
  const getTimer = () => {
    var hours = 24; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem("setupTime");
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.removeItem("step");
        localStorage.setItem("setupTime", now);
        localStorage.removeItem("recommondations");
      }
    }
  };
  React.useEffect(() => {
    getTimer();
    if (localStorage.getItem("step") === 3) {
      // setStep(3);
    }
    if (localStorage.getItem("recommondations")) {
      setStep(3);
    }
  });

  return (
    <Box bgcolor="background.default" pb={10} minHeight="100vh">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={4}
        mb={4}
        padding={10}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          How was your Day so far?
        </Typography>
        <StyledRating
          name="highlight-selected-only"
          defaultValue={3}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          size="10rem"
        />
      </Box>
      {step === 1 ? (
        <>
          <Typography
            variant="h5"
            gutterBottom
            color="text.primary"
            align="center"
          >
            Feel like answering some questions? We like to know you Better.
          </Typography>
          <div align="center">
            <GradientButton
              variant="contained"
              color="primary"
              onClick={handleYes}
              sx={{ marginTop: 3 }}
            >
              Yes. Let's Go!
            </GradientButton>
          </div>
        </>
      ) : step === 2 ? (
        <Questionaire setStep={setStep} />
      ) : (
        <>
          <Typography
            variant="h6"
            gutterBottom
            color="text.primary"
            align="center"
          >
            Thank You for the responses. Would you like to check out our
            Recommendations for you considering your responses?
          </Typography>
          <div align="center">
            <GradientButton
              variant="contained"
              color="primary"
              onClick={handleOk}
              sx={{ marginTop: 3 }}
            >
              Ok
            </GradientButton>
          </div>
        </>
      )}
    </Box>
  );
}
