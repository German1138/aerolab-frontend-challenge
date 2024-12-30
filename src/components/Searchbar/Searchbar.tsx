"use client";

import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useState } from "react";
import axios from "axios";
import customImageUrl from "@/utils/customImageUrl";
import Link from "next/link";
import { useRouter } from "next/router";

interface Option {
  id: string;
  name: string;
  slug: string;
  cover?: {
    image_id: string;
  };
}

const fetchSearchResults = async (query: string): Promise<Option[]> => {
  try {
    const { data } = await axios.get(`/api/search?value=${query}`);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Searchbar = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length >= 3) {
      const results = await fetchSearchResults(value);
      setOptions(results);
    } else {
      setOptions([]);
    }
  };

  const renderOption = (
    props: React.HTMLAttributes<HTMLAnchorElement>,
    option: Option
  ) => (
    <Link
      {...props}
      href={`/detail/${option.slug}`}
      key={option.id}
      style={{ display: "flex", alignItems: "center" }}
    >
      <img
        src={customImageUrl("micro", option.cover?.image_id)}
        alt={option.name}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      {option.name}
    </Link>
  );

  return (
    <form style={{ width: "100%", margin: "auto" }}>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={searchTerm}
        onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name || ""
        }
        renderOption={renderOption}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search games..."
            variant="outlined"
            fullWidth
            onChange={handleInputChange}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </form>
  );
};

export default Searchbar;
