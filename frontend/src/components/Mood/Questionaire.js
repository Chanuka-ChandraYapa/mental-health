import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  FormGroup,
  Card,
  CardContent,
  Typography,
  Container,
  Fade,
  Box,
  Paper,
  LinearProgress,
} from "@mui/material";
import { saveAnswers } from "./QuestionaireService";
import { questions } from "./questions";
import { scores } from "./scores";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const Questionnaire = ({ setStep }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [isAnswerValid, setIsAnswerValid] = useState(false);
  const [moodRating, setMoodRating] = useState(null);

  useEffect(() => {
    setIsAnswerValid(currentAnswer.length > 0);
  }, [currentAnswer]);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setAnswers([
        ...answers,
        {
          question: questions[currentQuestion].question,
          response: currentAnswer,
          multiple: questions[currentQuestion].multiple,
        },
      ]);
      setCurrentAnswer([]);
      setCurrentQuestion((prev) => prev + 1);
      setFadeIn(true);
    }, 500);
  };

  const handleBack = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentAnswer(answers[currentQuestion - 1].response);
      setAnswers(answers.slice(0, -1));
      setCurrentQuestion((prev) => prev - 1);
      setFadeIn(true);
    }, 500);
  };
  const calculateMoodRating = (answers) => {
    let totalScore = 0;
    let maxScore = 0;
    let minScore = 0;

    answers.forEach((answerObj, index) => {
      const { response, multiple } = answerObj;
      if (multiple) {
        response.forEach((answer) => {
          totalScore += scores[index][answer];
        });

        maxScore += Object.values(scores[index])
          .filter((value) => value > 0)
          .reduce((acc, value) => acc + value, 0);

        minScore += Object.values(scores[index])
          .filter((value) => value < 0)
          .reduce((acc, value) => acc + value, 0);
      } else {
        totalScore += scores[index][response[0]];

        maxScore += Math.max(0, ...Object.values(scores[index]));
        minScore += Math.min(0, ...Object.values(scores[index]));
      }
    });

    // Scale totalScore to a percentage between 0 and 100
    const scaledScore = ((totalScore - minScore) / (maxScore - minScore)) * 100;
    return scaledScore;
  };

  const handleSubmit = async () => {
    try {
      const rating = calculateMoodRating(answers);
      setMoodRating(rating);
      await saveAnswers(answers, rating);
      alert("Answers submitted successfully");
      // setStep(3);
      localStorage.setItem("step", 3);
      localStorage.setItem("setupTime", new Date().getTime());
    } catch (error) {
      console.error(error);
      alert("Failed to submit answers");
    }
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (questions[currentQuestion].multiple) {
      if (checked) {
        setCurrentAnswer([...currentAnswer, value]);
      } else {
        setCurrentAnswer(currentAnswer.filter((answer) => answer !== value));
      }
    } else {
      setCurrentAnswer([value]);
    }
  };

  const handleKeyPress = (event) => {
    if (
      event.key === "Enter" &&
      currentQuestion < questions.length - 1 &&
      isAnswerValid
    ) {
      handleNext();
    } else if (currentQuestion >= questions.length - 1 && isAnswerValid) {
      handleSubmit();
    }
  };

  const getProgressColor = (rating) => {
    if (rating >= 75) return "#0bdc84";
    if (rating >= 65) return "#89f0c3";
    if (rating >= 50) return "#FED053";
    if (rating >= 25) return "#f77f00";
    return "#d62828";
  };
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Fade in={fadeIn} timeout={500}>
        <div>
          <Card bgcolor="background.default">
            <CardContent>
              <FormControl component="fieldset" fullWidth>
                <Typography
                  variant="h6"
                  component="legend"
                  sx={{ fontSize: "1.5rem", marginBottom: "10px" }}
                >
                  {questions[currentQuestion].question}
                </Typography>
                {questions[currentQuestion].multiple ? (
                  <FormGroup>
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={currentAnswer.includes(option)}
                            onChange={handleChange}
                            value={option}
                            onKeyPress={handleKeyPress}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} // Increase checkbox size
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: "1.25rem" }}>
                            {option}
                          </Typography>
                        }
                      />
                    ))}
                  </FormGroup>
                ) : (
                  <RadioGroup
                    value={currentAnswer[0] || ""}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={option}
                        control={
                          <Radio
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          />
                        } // Increase radio button size
                        label={
                          <Typography sx={{ fontSize: "1.25rem" }}>
                            {option}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                )}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {currentQuestion > 0 && (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      style={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {currentQuestion < questions.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      style={{ fontSize: "1rem", color: "white" }}
                      disabled={!isAnswerValid}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      style={{ fontSize: "1rem", color: "white" }}
                      disabled={!isAnswerValid}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </FormControl>
            </CardContent>
          </Card>
          {moodRating !== null && (
            <Box sx={{ marginTop: 4 }}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h5" mb="2vh" gutterBottom>
                  Your Mood Rating: {moodRating.toFixed(2)} %
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={moodRating}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "lightgray",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: getProgressColor(moodRating),
                    },
                  }}
                />
                <div align="center">
                  <Gauge
                    value={moodRating.toFixed(2)}
                    width={200}
                    height={200}
                    startAngle={-110}
                    endAngle={110}
                    sx={{
                      [`& .${gaugeClasses.valueArc}`]: {
                        fill: `${getProgressColor(moodRating)}`,
                      },
                    }}
                    text={({ value, valueMax }) => `${value} / ${valueMax}`}
                  />
                </div>
                <Typography variant="body1" align="center">
                  {moodRating >= 75
                    ? "We are happy that You are feeling great! 💚"
                    : moodRating >= 50
                    ? "You are doing okay. Keep it up 💛"
                    : "We all have bad days. You might need some support. But remember, It too shall pass ❤️"}
                </Typography>
                {/* <Gauge width={100} height={100} value={60} /> */}
              </Paper>
            </Box>
          )}
        </div>
      </Fade>
    </Container>
  );
};

export default Questionnaire;
