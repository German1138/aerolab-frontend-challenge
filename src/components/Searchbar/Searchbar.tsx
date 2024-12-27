import { Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import React from "react";
import { container, textField } from "./Searchbar.styles";

function Searchbar() {
  return (
    <Box sx={container}>
      <TextField
        placeholder="Search for a topic..."
        variant="outlined"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={textField}
      />
    </Box>
  );
}

export default Searchbar;
