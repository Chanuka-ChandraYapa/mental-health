import React, { useEffect, useState } from "react";
import { getAnswers } from "./QuestionaireService";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"];

const MoodRatingPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answers = await getAnswers();
        const ratingCounts = answers.reduce((acc, answer) => {
          acc[answer.rating] = (acc[answer.rating] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.entries(ratingCounts).map(
          ([key, value]) => ({
            name: key,
            value,
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch answers", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MoodRatingPieChart;
