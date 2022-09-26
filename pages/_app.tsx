import { ThemeProvider } from "next-themes";
import PageProvider from "components/page_provider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";

import "styles/globals.css";
import "@fontsource/roboto/400.css";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <PageProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </PageProvider>
    </ThemeProvider>
  );
}
