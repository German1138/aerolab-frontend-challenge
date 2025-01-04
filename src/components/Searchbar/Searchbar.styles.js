export const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "360px",
  margin: "0 10px",
};

export const textField = {
  backgroundColor: "#FFFFFF",
  borderRadius: "100px",
  width: "100%",
  border: "1px solid #C698B8",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
  },
};
