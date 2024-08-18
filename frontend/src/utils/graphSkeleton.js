import React from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const isMobile = window.innerWidth < 600;

const renderSkeleton = () => (
  <>
    <Container maxWidth={!isMobile && "md"} sx={{ paddingTop: "20px" }}>
      <Skeleton
        height={350}
        width="100%"
        style={{ marginBottom: "10px" }}
        baseColor="#333" // Darker base color for dark theme
        highlightColor="#444" // Slightly lighter highlight color
      />
    </Container>
  </>
);

export default renderSkeleton;
