export const container = {
  display: "flex",
  gap: { xs: "15px", md: "auto" },
  overflow: "auto",
  justifyContent: { xs: "start", md: "center" },
};

export const btnStylesMobile = {
  fontSize: "14px",
  color: "#3C1661",
  borderRadius: "100px",
  textTransform: "capitalize",
  padding: "4.75px 12px",
};

export const floatingFiltersContainer = {
  position: "fixed",
  top: 20,
  left: "50%",
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
};
