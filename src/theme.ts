import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#c62828" },
    secondary: { main: "#ffb300" },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Prompt", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
