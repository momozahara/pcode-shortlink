import { useTheme } from "next-themes";

import { IconButton } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <IconButton
      color="inherit"
      style={{
        position: "fixed",
        top: "2rem",
        right: "2rem",
      }}
      onClick={() => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
      }}
    >
      <DarkModeIcon />
    </IconButton>
  );
};

export default ThemeSwitcher;
