import { Box, Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { container, btnStylesMobile } from "./Filters.styles";

const buttonData = [
  { name: "last-added", label: "Last Added", id: 1 },
  { name: "newest", label: "Newest", id: 2 },
  {
    name: "oldest",
    label: "Oldest",
    id: 3,
  },
];

interface IFilters {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

function Filters({ filter, setFilter }: IFilters) {
  return (
    <Box sx={container}>
      {buttonData.map(({ name, label, id }) => (
        <Button
          key={id}
          variant={filter === name ? "contained" : "text"}
          onClick={() => setFilter(name)}
          sx={{
            ...btnStylesMobile,
            ...(filter === name && {
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
