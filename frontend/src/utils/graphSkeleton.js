import React from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const renderSkeleton = () => (
  <>
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <Card
        style={{
          marginBottom: "20px",
          width: "100%",
          padding: "20px",
          height: 350,
          //   backgroundColor: "#424242", // Dark background color for dark theme
        }}
      >
        <CardContent>
          <Skeleton
            height={30}
            width="40%"
            style={{ marginBottom: "10px" }}
            baseColor="#333" // Darker base color for dark theme
            highlightColor="#444" // Slightly lighter highlight color
          />
          <Skeleton
            height={15}
            width="100%"
            style={{ marginBottom: "10px" }}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            height={150}
            width="30%"
            style={{
              marginBottom: "10px",
              alignSelf: "center",
              justifySelf: "center",
              alignItems: "center",
            }}
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
    </Container>
  </>
);

export default renderSkeleton;
