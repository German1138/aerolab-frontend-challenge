import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import {
  container,
  goBackBtn,
  logoContainer,
  logoSubContainer,
  secondaryContainer,
  secondarySubContainer,
  subContainer,
  titleStyle,
} from "./Header.styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Swords } from "lucide-react";
import { useRouter } from "next/navigation";

function Header({ goBackButton = false }) {
  const router = useRouter();
  const isNotMobile = useMediaQuery("(min-width:768px)");

  const handleImage = () => {
    if (isNotMobile) {
      return (
        <Image
          src="/wasd-desktop.svg"
          alt="wasd header decoration"
          width={1390.8}
          height={176.79}
          layout="responsive"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      );
    } else {
      return (
        <Image
          src="/wasd-mobile.svg"
          alt="wasd header decoration"
          width={196.21}
          height={73.9}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      );
    }
  };

  const pageLogo = () => {
    return (
      <Box sx={logoContainer}>
        <Box sx={logoSubContainer}>
          <Swords color="#3C1661" size="16px" style={{ zIndex: 1300 }} />
        </Box>
      </Box>
    );
  };

  if (goBackButton)
    return (
      <Box sx={container}>
        <Box sx={subContainer}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={goBackBtn}
          >
            Back
          </Button>
          <Searchbar />
        </Box>
        {handleImage()}
      </Box>
    );

  return (
    <Box sx={secondaryContainer}>
      <Box sx={secondarySubContainer}>
        {pageLogo()}
        <Typography variant="h1" sx={titleStyle}>
          Gaming Haven Z
        </Typography>
      </Box>
      <Searchbar />

      {handleImage()}
    </Box>
  );
}

export default Header;
