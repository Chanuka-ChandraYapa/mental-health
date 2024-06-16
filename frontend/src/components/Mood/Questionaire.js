// src/components/Questionnaire.js
import React, { useState } from "react";
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
} from "@mui/material";
import { saveAnswers } from "./QuestionaireService";

import { questions } from "./questions";

const Questionaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState([]);

  const handleNext = () => {
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
  };

  const handleBack = () => {
    setCurrentAnswer(answers[currentQuestion - 1].response);
    setAnswers(answers.slice(0, -1));
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      await saveAnswers(answers);
      alert("Answers submitted successfully");
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

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Card bgcolor="background.default">
        <CardContent>
          <FormControl component="fieldset">
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
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
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
            <div style={{ marginTop: "20px" }}>
              {currentQuestion > 0 && (
                <Button
                  variant="contained"
                  onClick={handleBack}
                  style={{ marginRight: "10px" }}
                >
                  Back
                </Button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </div>
          </FormControl>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Questionaire;
