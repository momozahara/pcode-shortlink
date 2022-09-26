import createTheme from "@mui/material/styles/createTheme";
import responsiveFontSize from "@mui/material/styles/responsiveFontSizes";

let darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

darkTheme = responsiveFontSize(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

lightTheme = responsiveFontSize(lightTheme);

const mdDefaultMode = "light";
const shDefaultMode = "dark";

export { darkTheme, lightTheme, mdDefaultMode, shDefaultMode };
