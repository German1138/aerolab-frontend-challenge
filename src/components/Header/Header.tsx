import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import {
  container,
  goBackBtn,
  secondaryContainer,
  titleStyle,
} from "./Header.styles";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import React from "react";
import Searchbar from "../Searchbar/Searchbar";
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

  if (goBackButton)
    return (
      <Box
        sx={{
          background: "linear-gradient(#FF00AE29, #FFFFFF )",
          padding: "30px 15px 50px 15px",
          width: "100%",
          display: { xs: "block", sm: "flex" },
          justifyContent: "center",
        }}
      >
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
        {handleImage()}
      </Box>
    );

  return (
    <Box
      sx={{
        ...secondaryContainer,
        background: "linear-gradient(#FF00AE29, #FFFFFF )",
        padding: "30px 15px 50px 15px",
      }}
    >
      <Typography variant="h1" sx={titleStyle}>
        Gaming Haven Z
      </Typography>
      <Searchbar />

      {handleImage()}
    </Box>
  );
}

export default Header;
