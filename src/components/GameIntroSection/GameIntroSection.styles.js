import { typographyLinearGradient } from "@/app/page.styles";

export const container = { display: "flex", gap: "20px" };

export const gameTitle = {
  fontSize: { xs: "20px", md: "24px" },
  color: "#3C1661",
  fontWeight: "600",
  margin: "0 0 10px 0",
  ...typographyLinearGradient,
};

export const gameCompanyStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#775C90",
};
