import React, { useEffect, useState } from "react";
import { getAnswers } from "./QuestionaireService"; // Adjust the path to your API file
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  CircularProgress,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { set } from "react-hook-form";
import renderSkeleton from "../../utils/graphSkeleton";

const MoodRatingGraph = ({ openQuestionnaire }) => {
  const [data, setData] = useState([]);
  const [moodRating, setMoodRating] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        setError(false);
        const answers = await getAnswers();
        const formattedData = answers.map((answer) => ({
          rating: parseFloat(answer.rating).toFixed(2),
          date: new Date(answer.date).toLocaleDateString(),
        }));
        setData(formattedData);
        setLoading(false);
        setMoodRating(formattedData[formattedData.length - 1].rating);
      } catch (error) {
        console.error("Error fetching answers", error);
        setLoading(false);
        setError(true);
      }
    };

    fetchAnswers();
  }, [openQuestionnaire]);

  const getProgressColor = (rating) => {
    if (rating >= 75) return "#0bdc84";
    if (rating >= 65) return "#89f0c3";
    if (rating >= 50) return "#FED053";
    if (rating >= 25) return "#f77f00";
    return "#d62828";
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        maxHeight={310}
        // bgcolor="background.default"
        color="text.primary"
        p={10}
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
        color="text.primary"
        minHeight={370}
        px={2}
      >
        <Typography variant="h6" color="primary.main" align="center">
          Something Went Wrong! Please Try Reloading
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <Box sx={{ marginTop: 4, height: 350 }}>
        {moodRating && (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" mb="2vh" gutterBottom>
              Your Mood Rating: {moodRating} %
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
                value={moodRating}
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
        )}
      </Box>
      <Box sx={{ height: 400 }}>
        {!loading && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{
                // top: 5,
                right: 50,
                // left: 20,
                // bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="6 1" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#0bdc84"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Container>
  );
};

export default MoodRatingGraph;
