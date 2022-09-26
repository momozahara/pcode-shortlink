import { ReactNode, useEffect, useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { darkTheme, lightTheme } from "./themes";
import { useTheme } from "next-themes";

interface Props {
  children: ReactNode;
}

const PageProvider = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export default PageProvider;
