"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { createContext, useState } from "react";

type MuiContextType = {
  darkTheme: boolean;
  setDarkTheme: (MuiValue: boolean) => void;
};

export const MuiContext = createContext({} as MuiContextType);

export function MuiProvider({ children }: { children: React.ReactNode }) {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",

      primary: {
        main: "#74C2BD",
      },
      secondary: {
        main: "#F87272",
      },
    },
  });

  return (
    <MuiContext.Provider value={{ darkTheme, setDarkTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </MuiContext.Provider>
  );
}
