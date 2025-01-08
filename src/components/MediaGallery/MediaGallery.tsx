import {
  Box,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  btn,
  mediaContainer,
  modalStyles,
  modalSubContainer,
  subTitle,
} from "./MediaGallery.styles";

import CloseIcon from "@mui/icons-material/Close";
import { IGameProps } from "@/app/interfaces";
import Image from "next/image";
import customImageUrl from "@/utils/customImageUrl";

function MediaGallery({ game }: IGameProps) {
  const isNotMobile = useMediaQuery("(min-width:1024px)");
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false);

  const desktop = useMediaQuery("(min-width:1024px)");
  const mobile = useMediaQuery("(max-width:425px)");

  const handleScreenshot = () => {
    let size = "screenshot_big";
    if (desktop) size = "screenshot_huge";
    if (mobile) size = "screenshot_med";

    return customImageUrl(size, selectedImage);
  };

  if (game.screenshots)
    return (
      <>
        <Typography variant="h2" sx={subTitle}>
          Media
        </Typography>
        <Box sx={mediaContainer}>
          {game.screenshots?.map((element) => {
            return (
              <Image
                onClick={() => {
                  setOpen(true);
                  setSelectedImage(element.image_id);
                }}
                key={element.id}
                src={customImageUrl(
                  isNotMobile ? "logo_med" : "thumb",
                  element.image_id
                )}
                width={isNotMobile ? 132 : 85}
                height={isNotMobile ? 132 : 85}
                alt={`${game.name} screenshot`}
                style={{ borderRadius: "8px", cursor: "pointer" }}
              />
            );
          })}
        </Box>
        <Modal open={open} onClose={() => setOpen(false)} sx={modalStyles}>
          <Box sx={modalSubContainer}>
            <IconButton onClick={() => setOpen(false)} sx={btn}>
              <CloseIcon />
            </IconButton>

            <Image
              src={handleScreenshot()}
              alt={`${game.name} screenshot`}
              width={1920}
              height={1080}
              layout="responsive"
              style={{
                borderRadius: "10px",
              }}
            />
          </Box>
        </Modal>
      </>
    );
}

export default MediaGallery;
