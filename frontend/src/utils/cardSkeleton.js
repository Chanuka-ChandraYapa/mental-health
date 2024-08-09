import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const renderSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from(new Array(9)).map((_, index) => (
      <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
        <Card
          style={{
            height: "300px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Skeleton
            height={200}
            width="100%"
            style={{ marginBottom: "10px" }}
            baseColor="#333" // Darker base color for dark theme
            highlightColor="#444" // Slightly lighter highlight color
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Skeleton
              height={30}
              width="80%"
              style={{ marginBottom: "10px" }}
              baseColor="#333" // Darker base color for dark theme
              highlightColor="#444" // Slightly lighter highlight color
            />
            <Skeleton
              height={20}
              width="60%"
              style={{ marginBottom: "10px" }}
              baseColor="#333" // Darker base color for dark theme
              highlightColor="#444" // Slightly lighter highlight color
            />
            <Skeleton height={15} width="40%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default renderSkeleton;
