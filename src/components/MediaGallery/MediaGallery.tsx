import {
  Box,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { mediaContainer, subTitle } from "./MediaGallery.styles";

import CloseIcon from "@mui/icons-material/Close";
import { IGameProps } from "@/app/interfaces";
import Image from "next/image";
import customImageUrl from "@/utils/customImageUrl";

function MediaGallery({ game }: IGameProps) {
  const isNotMobile = useMediaQuery("(min-width:1024px)");
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Typography variant="h2" sx={subTitle}>
        Media
      </Typography>
      <Box sx={mediaContainer}>
        {game.screenshots.map((element) => {
          return (
            <Image
              onClick={() => {
                setOpen(true);
                setSelectedImage(element.image_id);
              }}
              key={element.id}
              src={customImageUrl("thumb", element.image_id)}
              width={isNotMobile ? 132 : 85}
              height={isNotMobile ? 132 : 85}
              alt={`${game.name} screenshot`}
              style={{ borderRadius: "8px", cursor: "pointer" }}
            />
          );
        })}
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          bgcolor: "#E5E5E5",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "1200px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: 24,
            outline: "none",
            padding: 2,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: -16,
              right: -16,
              color: "#666666",
              backgroundColor: "#FFFFFF",

              ":hover": { backgroundColor: "#E5E5E5" },
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={customImageUrl("1080p", selectedImage)}
            alt={`${game.name} screenshot`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default MediaGallery;
