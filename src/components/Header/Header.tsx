import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  container,
  goBackBtn,
  secondaryContainer,
  titleStyle,
} from "./Header.styles";

function Header({ goBackButton = false }) {
  const router = useRouter();

  if (goBackButton)
    return (
      <Box sx={container}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={goBackBtn}
        >
          Back
        </Button>

        <Searchbar />
      </Box>
    );

  return (
    <Box sx={secondaryContainer}>
      <Typography variant="h1" sx={titleStyle}>
        Gaming Haven Z
      </Typography>

      <Searchbar />
    </Box>
  );
}

export default Header;
