"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  btnStylesMobile,
  container,
  floatingFiltersContainer,
} from "./Filters.styles";

import { IFilters } from "@/app/interfaces";

const BUTTONS_DATA = [
  { name: "last-added", label: "Last Added", id: 1 },
  { name: "newest", label: "Newest", id: 2 },
  {
    name: "oldest",
    label: "Oldest",
    id: 3,
  },
];

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
    const currentFilterRef = filtersRef;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (currentFilterRef.current) {
      observer.observe(currentFilterRef.current);
    }

    return () => {
      if (currentFilterRef.current) {
        observer.unobserve(currentFilterRef.current);
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
            ...floatingFiltersContainer,
            transform: isSticky
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(-10px)",
            opacity: isSticky ? 1 : 0,
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
