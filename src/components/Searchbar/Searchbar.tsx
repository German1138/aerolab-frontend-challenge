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
import {
  autocompleteStyles,
  circularProgress,
  container,
  errorMessage,
  isSearchBar,
  liImage,
  textField,
} from "./Searchbar.styles";

import { IOption } from "@/app/interfaces";
import Image from "next/image";
import { Search } from "lucide-react";
import axios from "axios";
import customImageUrl from "@/utils/customImageUrl";
import { useRouter } from "next/navigation";

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

const fetchSearchResults = async (query: string): Promise<IOption[]> => {
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
  const [options, setOptions] = useState<IOption[]>(DEFAULT_GAMES);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useCallback(
    debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      setError(null);
      setLoading(true);

      if (!value) setOptions(DEFAULT_GAMES);
      if (value.length) {
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
    }, 1000),
    []
  );

  const handleOptionSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | IOption | null
  ) => {
    if (value) {
      if (typeof value === "string") {
        return null;
      } else {
        router.push(`/detail/${value.slug}`);
      }
    }
  };

  const handleTextFieldStyles = () => {
    if (isSearchBarOnFocus) {
      return {
        ...isSearchBar,
        textDecorationLine: "none",
        borderRadius: "20px 20px 0 0",
      };
    } else {
      return {
        ...isSearchBar,
        borderRadius: "20px",
      };
    }
  };

  return (
    <Box sx={container}>
      <Autocomplete
        disableClearable
        sx={autocompleteStyles}
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

          return (
            <Box
              component="li"
              key={option.id}
              {...restProps}
              overflow="hidden"
            >
              <Image
                src={customImageUrl("micro", option.cover?.image_id || "")}
                alt={option.name}
                width={30}
                height={30}
                style={liImage}
              />
              {option.name}
            </Box>
          );
        }}
        renderInput={(params) => {
          return (
            <>
              <TextField
                onFocus={() => setIsSearchBarOnFocus(true)}
                onBlur={() => setIsSearchBarOnFocus(false)}
                {...params}
                placeholder="Search games..."
                variant="standard"
                fullWidth
                style={handleTextFieldStyles()}
                sx={textField}
                onChange={handleInputChange}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: {
                    fontSize: "18px",
                    padding: "3px 0px 3px 0px",
                  },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ padding: "0 0px 0 15px" }}
                    >
                      <Search
                        size="16px"
                        style={{
                          color: isSearchBarOnFocus ? "#6727A6" : "#E7C0DB",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
              {loading && (
                <Box sx={circularProgress}>
                  <CircularProgress size={24} style={{ color: "#6727A6" }} />
                </Box>
              )}
              {error && (
                <Typography
                  onFocus={() => setIsSearchBarOnFocus(true)}
                  onBlur={() => setIsSearchBarOnFocus(false)}
                  variant="body2"
                  style={{
                    ...errorMessage,
                    display: isSearchBarOnFocus ? "block" : "none",
                  }}
                >
                  {error}
                </Typography>
              )}
            </>
          );
        }}
      />
    </Box>
  );
};

export default Searchbar;
