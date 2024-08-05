import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Card,
  Typography,
  Box,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Backdrop,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Questionaire from "./Questionaire";
import { GradientButton } from "../GradientButton";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Footer from "../Footer";
import MoodRatingGraph from "./Graph";
import MoodHistoryGraph2 from "./Graph2";
import MoodRatingPieChart from "./Graph3";
import Journal from "./Journal";
import useCustomTheme from "../../utils/customTheme";
import BreathingExercise from "../Exercises/Breating";
import Exercise from "../Exercises";
import SleepTracker from "../Exercises/SleepTracker";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

export default function Mood() {
  const theme = useTheme();
  const { selectedRating, setSelectedRating } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [step, setStep] = React.useState(1);
  const [openQuestionnaire, setOpenQuestionnaire] = React.useState(false);
  const navigate = useNavigate();

  const handleYes = () => {
    setOpenQuestionnaire(true);
  };

  const handleQuestionnaireClose = () => {
    setOpenQuestionnaire(false);
  };

  const handleOk = () => {
    setStep(1);
    navigate("/recommendations");
  };

  const getTimer = () => {
    var hours = 24; // to clear the localStorage after 1 hour
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
      setStep(3);
    }
    // if (localStorage.getItem("recommondations")) {
    //   setStep(3);
    // }
  });

  const customIcons = {
    1: {
      icon: (
        <SentimentVeryDissatisfiedIcon
          color="error"
          style={{ fontSize: isMobile ? "4rem" : "7rem" }}
        />
      ),
      label: "Very Dissatisfied",
    },
    2: {
      icon: (
        <SentimentDissatisfiedIcon
          color="error"
          style={{ fontSize: isMobile ? "4rem" : "7rem" }}
        />
      ),
      label: "Dissatisfied",
    },
    3: {
      icon: (
        <SentimentSatisfiedIcon
          color="warning"
          style={{ fontSize: isMobile ? "4rem" : "7rem" }}
        />
      ),
      label: "Neutral",
    },
    4: {
      icon: (
        <SentimentSatisfiedAltIcon
          color="success"
          style={{ fontSize: isMobile ? "4rem" : "7rem" }}
        />
      ),
      label: "Satisfied",
    },
    5: {
      icon: (
        <SentimentVerySatisfiedIcon
          color="success"
          style={{ fontSize: isMobile ? "4rem" : "7rem" }}
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

  const handleRatingChange = (event, newValue) => {
    setSelectedRating(newValue);
  };

  return (
    <>
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
          <Typography
            variant="h4"
            gutterBottom
            color="text.primary"
            align="center"
          >
            How was your Day so far?
          </Typography>
          <StyledRating
            name="highlight-selected-only"
            defaultValue={3}
            IconContainerComponent={IconContainer}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
            fontSize="15rem"
            onChange={handleRatingChange}
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleYes}
                sx={{ marginTop: 3 }}
              >
                Yes. Let's Go!
              </Button>
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
        <MoodRatingGraph openQuestionnaire={openQuestionnaire} />
        <Journal />
        <Exercise />
        {/* <SleepTracker /> */}
      </Box>
      <Footer />
      <Backdrop
        open={openQuestionnaire}
        onClick={handleQuestionnaireClose}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          blur: "5px",
        }}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            maxWidth: "sm",
            width: "100%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Questionaire
            setStep={setStep}
            setOpenQuestionnaire={setOpenQuestionnaire}
          />
        </Box>
      </Backdrop>
    </>
  );
}
