import React from "react";
import { Box, Slide, Snackbar, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IGame, ISimilarGames } from "@/app/interfaces";
import {
  messageStyle,
  snackbarContainer,
  titleContainer,
  titleStyle,
} from "./CustomSnackbar.styles";

interface ISnackbarProps {
  game: IGame | ISimilarGames;
  clicked: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomSnackbar({ game, clicked, open, setOpen }: ISnackbarProps) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  const borderColor = clicked ? "#67C076" : "#D23F63";
  const message = clicked
    ? "has been added to your collection"
    : "has been removed from your collection";

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Box
        sx={{
          ...snackbarContainer,
          border: `1px solid ${borderColor}`,
        }}
      >
        <Box sx={titleContainer}>
          {clicked ? (
            <CheckCircleOutlineIcon style={{ color: "#67C076" }} />
          ) : (
            <ErrorOutlineIcon style={{ color: "#D23F63" }} />
          )}
          <Typography sx={titleStyle}>
            {clicked ? "Game collected" : "Game removed"}
          </Typography>
        </Box>
        <Typography sx={messageStyle}>
          {game.name} {message}
        </Typography>
      </Box>
    </Snackbar>
  );
}

export default CustomSnackbar;
