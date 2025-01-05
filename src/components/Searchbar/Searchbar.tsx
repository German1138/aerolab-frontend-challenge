import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import React, { useCallback, useState } from "react";

import Image from "next/image";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import customImageUrl from "@/utils/customImageUrl";
import { useRouter } from "next/navigation";

interface Option {
  id: number;
  name: string;
  slug: string;
  cover?: {
    image_id: string;
  };
}

const DEFAULT_GAMES = [
  {
    id: 233,
    name: "Half-Life 2",
    slug: "half-life-2",
    cover: {
      image_id: "co1nmw",
    },
  },
  {
    id: 2025,
    name: "Mount & Blade: Warband",
    slug: "mount-blade-warband",
    cover: {
      image_id: "co1y8y",
    },
  },
  {
    id: 14593,
    name: "Hollow Knight",
    slug: "hollow-knight",
    cover: {
      image_id: "co93cr",
    },
  },
  {
    id: 17000,
    name: "Stardew Valley",
    slug: "stardew-valley",
    cover: {
      image_id: "xrpmydnu9rpxvxfjkiu7",
    },
  },
  {
    id: 121,
    name: "Minecraft: Java Edition",
    slug: "minecraft-java-edition",
    cover: {
      image_id: "co8fu6",
    },
  },
];

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

  const [isSearchBarOnFocus, setIsSearchBarOnFocus] = useState(false);
  const [options, setOptions] = useState<Option[]>(DEFAULT_GAMES);
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
        router.push(`/detail/${value.slug}`);
      }
    }
  };

  const optionsLength = options.length;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Autocomplete
        sx={{ width: "100%", maxWidth: "400px" }}
        disableCloseOnSelect
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
          const isLast = options[optionsLength - 1].id === option.id;

          return (
            <Box
              component="li"
              key={key}
              {...restProps}
              sx={{
                overflow: "hidden",
                borderRadius: isLast ? "0 0 20px 20px" : null,
                borderBottom: isLast ? "2px solid #C698B8" : null,
                borderRight: "2px solid #C698B8",
                borderLeft: "2px solid #C698B8",
              }}
            >
              <Image
                src={customImageUrl("micro", option.cover?.image_id || "")}
                alt={option.name}
                width={30}
                height={30}
                style={{ marginRight: 10, borderRadius: "4px" }}
              />
              {option.name}
            </Box>
          );
        }}
        renderInput={(params) => {
          return (
            <Box>
              <TextField
                onFocus={() => setIsSearchBarOnFocus(isSearchBarOnFocus)}
                onBlur={() => setIsSearchBarOnFocus(!isSearchBarOnFocus)}
                {...params}
                placeholder="Search games..."
                variant="standard"
                fullWidth
                style={
                  isSearchBarOnFocus
                    ? {
                        textDecorationLine: "none",
                        borderRadius: "20px 20px 0 0",
                        border: "2px solid #C698B8",
                      }
                    : {
                        borderRadius: "20px",
                        border: "2px solid #C698B8",
                      }
                }
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "0 10px",
                }}
                onChange={handleInputChange}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: { color: "#C698B8", fontSize: "18px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon style={{ color: "#6727A6" }} />
                    </InputAdornment>
                  ),
                }}
              />
              {loading && (
                <Box display="flex" justifyContent="center" marginTop={1}>
                  <CircularProgress size={24} style={{ color: "#6727A6" }} />
                </Box>
              )}
              {error && (
                <Typography
                  variant="body2"
                  style={{ marginTop: 5, color: "#D23F63" }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default Searchbar;
