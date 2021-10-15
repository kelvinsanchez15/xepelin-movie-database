import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Space Grotesk", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#5031A9",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1296,
      xl: 1920,
    },
  },
});

export default theme;
