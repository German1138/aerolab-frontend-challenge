import { CircularProgress, Container } from "@mui/material";

import React from "react";
import { container } from "./LoadingSpinner.styles";

function LoadingSpinner() {
  return (
    <Container sx={container}>
      <CircularProgress style={{ color: "#3C1661" }} />
    </Container>
  );
}

export default LoadingSpinner;
