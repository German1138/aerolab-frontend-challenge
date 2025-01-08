import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import {
  buttonsMobileContainer,
  container,
  goBackBtn,
  logoContainer,
  logoMobileContainer,
  logoSubContainer,
  secondaryContainer,
  secondarySubContainer,
  subContainer,
  titleStyle,
} from "./Header.styles";
import { redirect, useRouter } from "next/navigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Swords } from "lucide-react";

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
      <Box sx={logoContainer} onClick={() => redirect("/")}>
        <Box sx={logoSubContainer}>
          <Swords color="#3C1661" size="16px" style={{ zIndex: 1300 }} />
        </Box>
      </Box>
    );
  };

  const handleGoBack = () => {
    if (window.history.length <= 1) {
      router.push("/");
    } else {
      router.back();
    }
  };

  if (goBackButton)
    return (
      <Box sx={container}>
        <Box sx={subContainer}>
          <Box sx={buttonsMobileContainer}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => handleGoBack()}
              sx={goBackBtn}
            >
              Back
            </Button>
            {!isNotMobile && <Box sx={logoMobileContainer}>{pageLogo()}</Box>}
          </Box>

          <Searchbar />

          {isNotMobile && pageLogo()}
        </Box>
        {handleImage()}
      </Box>
    );

  return (
    <Box sx={secondaryContainer}>
      <Box sx={secondarySubContainer} onClick={() => redirect("/")}>
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
