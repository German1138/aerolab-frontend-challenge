import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  debounce,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useState, useCallback } from "react";
import axios from "axios";
import customImageUrl from "@/utils/customImageUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [options, setOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      setError(null);
      setLoading(true);

      if (value.length >= 3) {
        try {
          const results = await fetchSearchResults(value);
          if (results.length === 0) {
            setError("No results found.");
          }
          setOptions(results);
        } catch (err) {
          console.error("Error fetching results.", err);
          setOptions([]);
        }
      } else {
        setOptions([]);
      }
      setLoading(false);
    }, 500),
    []
  );

  const handleOptionSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | Option | null
  ) => {
    if (value) {
      if (typeof value === "string") {
        return null;
      } else {
        console.log(`Opción seleccionada: ${JSON.stringify(value.slug)}`);
        console.log(`Opción seleccionada: ${value.name}`);
        router.push(`/detail/${value.slug}`);
      }
    }
  };

  return (
    <Autocomplete
      freeSolo
      handleHomeEndKeys
      autoHighlight
      options={options}
      inputValue={searchTerm}
      onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
      onChange={handleOptionSelect}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name || ""
      }
      renderOption={(props, option) => {
        const { key, ...restProps } = props;
        return (
          <li
            key={key}
            {...restProps}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Image
              src={customImageUrl("micro", option.cover?.image_id || "")}
              alt={option.name}
              width={30}
              height={30}
              style={{ marginRight: 10 }}
            />
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <Box>
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
          {loading && (
            <Box display="flex" justifyContent="center" marginTop={1}>
              <CircularProgress size={24} />
            </Box>
          )}
          {error && (
            <Typography variant="body2" color="error" style={{ marginTop: 5 }}>
              {error}
            </Typography>
          )}
        </Box>
      )}
    />
  );
};

export default Searchbar;
