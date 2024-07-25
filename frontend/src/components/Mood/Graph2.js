import React, { useEffect, useState } from "react";
import { getAnswers } from "./QuestionaireService";
import { HeatMapGrid } from "react-grid-heatmap";

const MoodRatingHeatmap = () => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const answers = await getAnswers();
        // Assume answers have createdAt field
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

        const heatmapData = Array.from({ length: days.length }, () =>
          Array(times.length).fill(0)
        );

        answers.forEach((answer) => {
          const date = new Date(answer.date);
          const day = date.getDay();
          const hour = date.getHours();
          heatmapData[day][hour]++;
        });

        setData(heatmapData);
        setXLabels(times);
        setYLabels(days);
      } catch (error) {
        console.error("Failed to fetch answers", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <HeatMapGrid
        data={data}
        xLabels={xLabels}
        yLabels={yLabels}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgba(12, 160, 44, ${1 - (max - value) / (max - min)})`,
          fontSize: "0.8rem",
          color: "#444",
        })}
        cellHeight="2rem"
        xLabelsPos="bottom"
        yLabelsPos="right"
      />
    </div>
  );
};

export default MoodRatingHeatmap;
