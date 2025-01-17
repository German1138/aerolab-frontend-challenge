"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid2,
  IconButton,
  Slide,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  btnStyle,
  iconButtonStyles,
  imageStyle,
  subContainer,
} from "./GameCard.style";

import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { IGameCard } from "@/app/interfaces";
import Image from "next/image";
import Link from "next/link";
import { TransitionProps } from "@mui/material/transitions";
import { Trash } from "lucide-react";
import customImageUrl from "@/utils/customImageUrl";
import handleLS from "@/utils/handleLS";
import { loadInitialData } from "./GameCardContainer";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GameCard({
  game,
  filter = "last-added",
  setGames,
  disableIconButton = false,
}: IGameCard) {
  const isNotMobile = useMediaQuery("(min-width:768px)");

  const [clicked, setClicked] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setClicked((prev) => !prev);
    setOpen(handleLS(game));
    if (setGames) {
      loadInitialData(setGames, filter);
    }
  }, [game, filter, setGames]);

  const gameImageUrl = useCallback(
    () => customImageUrl("cover_big", game.cover?.image_id),
    [game.cover?.image_id]
  );

  return (
    <Grid2 size={isNotMobile ? 3 : 4} key={game.id}>
      <Box sx={subContainer}>
        <Link href={`/detail/${game.slug}`} passHref>
          <Image
            src={gameImageUrl()}
            width={isNotMobile ? 170 : 114}
            height={isNotMobile ? 226 : 152}
            layout="responsive"
            alt={`${game.name} cover`}
            style={imageStyle}
          />
        </Link>

        {!disableIconButton && (
          <IconButton
            aria-label="Delete game"
            focusVisibleClassName="focus-visible"
            onClick={() => setOpenDialog(true)}
            sx={iconButtonStyles}
          >
            <Trash size={16} color="#000000" />
          </IconButton>
        )}
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            sx={{ textWrap: "balance", padding: "15px", color: "#1e1e1e" }}
          >{`You're removing "${game.name}"`}</DialogTitle>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: "grey" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleClick()}
              sx={btnStyle}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <CustomSnackbar
          game={game}
          clicked={clicked}
          open={open}
          setOpen={setOpen}
        />
      </Box>
    </Grid2>
  );
}

export default GameCard;
