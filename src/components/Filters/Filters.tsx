"use client";

import { Box, Button } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { btnStylesMobile, container } from "./Filters.styles";

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
  const getButtonStyles = (isActive: boolean, isFloating = false) => {
    if (isFloating) {
      return {
        ...btnStylesMobile,
        width: "105px",
        ...(isActive && {
          backgroundColor: "#3C1661",
          color: "#FFFFFF",
          fontWeight: "550",
        }),
      };
    } else {
      return {
        ...btnStylesMobile,
        width: "fit-content",
        ...(isActive && {
          backgroundColor: "#3C1661",
          color: "#FFFFFF",
          fontWeight: "550",
        }),
      };
    }
  };

  const filtersRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (filtersRef.current) {
      observer.observe(filtersRef.current);
    }

    return () => {
      if (filtersRef.current) {
        observer.unobserve(filtersRef.current);
      }
    };
  }, []);

  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (isSticky) {
      setShowSticky(true);
    } else {
      setTimeout(() => setShowSticky(false), 300);
    }
  }, [isSticky]);

  return (
    <>
      <Box ref={filtersRef} sx={container}>
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

      {(isSticky || showSticky) && (
        <Box
          sx={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: isSticky
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(-10px)",
            opacity: isSticky ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            zIndex: 1300,
            display: "flex",
            maxHeight: "40px",
            textWrap: "nowrap",
            backgroundColor: "#ffffffba",
            borderRadius: "100px",
            padding: "4px",
            boxShadow: "none",
            backdropFilter: "blur(10px)",
          }}
        >
          {BUTTONS_DATA.map(({ name, label, id }) => {
            const isActive = filter === name;
            return (
              <Button
                key={id}
                variant={isActive ? "contained" : "text"}
                onClick={() => setFilter(name)}
                aria-pressed={isActive}
                sx={getButtonStyles(isActive, true)}
              >
                {label}
              </Button>
            );
          })}
        </Box>
      )}
    </>
  );
}

export default Filters;
