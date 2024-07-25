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
import { Container } from "@mui/material";

const MoodRatingGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const answers = await getAnswers();
        const formattedData = answers.map((answer) => ({
          date: new Date(answer.date).toLocaleDateString(),
          rating: answer.rating,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching answers", error);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#0bdc84"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default MoodRatingGraph;
