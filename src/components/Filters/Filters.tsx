import { Box, Button } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { container, btnStylesMobile } from "./Filters.styles";

const BUTTONS_DATA = [
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
  const getButtonStyles = (isActive: boolean) => ({
    ...btnStylesMobile,
    ...(isActive && {
      backgroundColor: "#3C1661",
      color: "#FFFFFF",
    }),
  });

  return (
    <Box sx={container}>
      {BUTTONS_DATA.map(({ name, label, id }) => {
        const isActive = filter === name;
        return (
          <Button
            key={id}
            variant={isActive ? "contained" : "text"}
            onClick={() => setFilter(name)}
            aria-pressed={isActive}
            sx={getButtonStyles(isActive)}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
}

export default Filters;
