import React from "react";
import { Card, CardContent } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const renderSkeleton = () => (
  <>
    {Array.from(new Array(2)).map((_, index) => (
      <Card
        key={index}
        style={{
          marginBottom: "20px",
          width: "100%",
          padding: "20px",
          //   backgroundColor: "#424242", // Dark background color for dark theme
        }}
      >
        <CardContent>
          <Skeleton
            height={30}
            width="60%"
            style={{ marginBottom: "10px" }}
            baseColor="#333" // Darker base color for dark theme
            highlightColor="#444" // Slightly lighter highlight color
          />
          <Skeleton
            height={20}
            width="90%"
            style={{ marginBottom: "10px" }}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            height={20}
            width="85%"
            style={{ marginBottom: "10px" }}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            height={20}
            width="80%"
            baseColor="#333"
            highlightColor="#444"
          />
        </CardContent>
      </Card>
    ))}
  </>
);

export default renderSkeleton;
