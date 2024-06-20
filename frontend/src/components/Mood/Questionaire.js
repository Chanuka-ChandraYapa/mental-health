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
} from "@mui/material";
import { saveAnswers } from "./QuestionaireService";
import { questions } from "./questions";

const Questionnaire = ({ setStep }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [fadeIn, setFadeIn] = useState(true);
  const [isAnswerValid, setIsAnswerValid] = useState(false);

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

  const handleSubmit = async () => {
    try {
      await saveAnswers(answers);
      alert("Answers submitted successfully");
      setStep(3);
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
        </div>
      </Fade>
    </Container>
  );
};

export default Questionnaire;
