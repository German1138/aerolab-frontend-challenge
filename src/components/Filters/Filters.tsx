"use client";

import { Box, Button } from "@mui/material";
import React from "react";

import { useState } from "react";
import { container, btnStylesMobile } from "./Filters.styles";

function Filters() {
  const [active, setActive] = useState("last-added");

  const buttonData = [
    { name: "last-added", label: "Last Added", id: 1 },
    { name: "newest", label: "Newest", id: 2 },
    {
      name: "oldest",
      label: "Oldest",
      id: 3,
    },
  ];

  return (
    <Box sx={container}>
      {buttonData.map(({ name, label, id }) => (
        <Button
          key={id}
          variant={active === name ? "contained" : "text"}
          onClick={() => setActive(name)}
          sx={{
            ...btnStylesMobile,
            ...(active === name && {
              backgroundColor: "#3C1661",
              color: "#FFFFFF",
            }),
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}

export default Filters;
