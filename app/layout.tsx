"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import "@fontsource/prompt/400.css";
import "@fontsource/prompt/500.css";
import "@fontsource/prompt/600.css";
import "@fontsource/prompt/700.css";
import "@fontsource/prompt/800.css";

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
