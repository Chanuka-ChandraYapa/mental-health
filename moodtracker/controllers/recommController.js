const axios = require("axios");
const Answer = require("../models/Answers");

const getRecommendation = (answers) => {
  const recommendations = [];

  answers.answers.forEach((answer) => {
    console.log(answer, answer.question, answer.response);
    switch (answer.question) {
      case "How are you feeling today?":
        if (answer.response.includes("Happy")) {
          recommendations.push(
            "It's great to see that you're feeling happy! Keep engaging in activities that bring you joy. "
          );
        } else if (answer.response.includes("Sad")) {
          recommendations.push(
            "Feeling sad is okay. Consider talking to a friend or engaging in a relaxing activity. "
          );
        } else if (answer.response.includes("Anxious")) {
          recommendations.push(
            "Anxiety can be tough. Try mindfulness exercises or deep breathing to help manage it. "
          );
        } else if (answer.response.includes("Depressed")) {
          recommendations.push(
            "Feeling depressed is serious. Please consider seeking support from a mental health professional. "
          );
        }
        break;

      case "What activities did you enjoy this week?":
        recommendations.push(
          "Engaging in activities like " +
            answer.response.join(", ") +
            " is beneficial for your mental well-being. Keep it up! "
        );
        if (
          answer.response.includes("Exercising") ||
          answer.response.includes("Socializing")
        ) {
          recommendations.push(
            "Further Consider activities like yoga or pilates that combine physical activity with mental relaxation."
          );
        } else if (
          answer.response.includes("Reading") ||
          answer.response.includes("Watching TV")
        ) {
          recommendations.push(
            "Further Try joining a book club or a local group for a TV series to provide social interaction."
          );
        }
        break;

      case "How often have you felt stressed in the past week?":
        if (answer.response.includes("Not at all")) {
          recommendations.push(
            "It's great that you're not feeling stressed. Continue maintaining a balanced lifestyle."
          );
        } else {
          recommendations.push(
            "Stress can accumulate over time. Try to identify stressors and address them through relaxation techniques or time management."
          );
        }
        if (answer.response.includes("Often")) {
          recommendations.push(
            "Using time management tools like planners or apps can help create a more balanced life."
          );
        } else if (answer.response.includes("Always")) {
          recommendations.push(
            "Exploring stress management techniques such as progressive muscle relaxation or guided imagery can be beneficial."
          );
        }
        break;

      case "Do you feel supported by friends and family?":
        if (answer.response.includes("No")) {
          recommendations.push(
            "Consider reaching out to local support groups or counseling services to build a supportive network."
          );
        } else if (answer.response.includes("Sometimes")) {
          recommendations.push(
            "Schedule regular check-ins with friends and family to maintain strong connections."
          );
        } else {
          recommendations.push(
            "Good to hear You are supported by your family and friends. Keep it up and maintain it. You are one of the lucky people out there who have this opportunity"
          );
        }
        break;

      case "How is your sleep quality?":
        if (answer.response.includes("Poor")) {
          recommendations.push(
            "Establish a bedtime routine and create a sleep-friendly environment to improve sleep quality."
          );
        } else {
          recommendations.push(
            "Having a good sleep is always beneficial. At least  spend 5-6 hours for sleeping. It will not reduce your effectiveness but increase it more than you think."
          );
        }
        break;

      case "What helps you relax?":
        if (
          answer.response.includes("Meditation") &&
          answer.response.includes("Exercising")
        ) {
          recommendations.push(
            "Incorporate daily meditation and physical exercise to reduce stress levels."
          );
        } else if (
          answer.response.includes("Reading") &&
          answer.response.includes("Socializing")
        ) {
          recommendations.push(
            "Join a local book club or engage in social activities to unwind and relax."
          );
        }
        break;

      // Add more cases based on the questions and answers
      default:
        break;
    }
  });

  return recommendations.join("\n");
};

exports.getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("sessionid", id);
    const userId = req.user.id; // Assuming userId is passed as a query parameter
    var answers;
    try {
      answers = await Answer.find({ userId: userId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    // const response = await axios.get(
    //   `http://localhost:3303/api/answers?userId=${userId}`
    // );
    // const answers = response.data;
    // console.log(answers.pop());
    const response = await fetch(
      // "https://mental-health-chatbot-dlhq.onrender.com/chatbot",
      "https://mental-health-chatbot-production.up.railway.app/chatbot",
      // "http://127.0.0.1:5000/chatbot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            " Analyze the schema of questions an answers about a person's todays's mental state and give recommendations to the person with 500 word paragraph with no paragraph breaks. Please give only just the plain paragraph do not include text in point forms. No headings. No sub headings" +
            answers.pop().answers,
          sessionId: id,
        }),
      }
    );
    const data = await response.json();
    res.json({ recommendations: data.response });
    console.log("hi");
    // const recommendations = getRecommendation(answers.pop());
    // res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch answers or generate recommendations." });
  }
};
