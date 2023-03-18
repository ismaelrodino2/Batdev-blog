'use client';

import React, { createContext, useState } from "react";

type DarkModeContextType = {
  darkModeValue: boolean;
  setDarkModeValue: (DarkModeValue: boolean) => void;
};

export const DarkModeContext = createContext({} as DarkModeContextType);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkModeValue, setDarkModeValue] = useState<boolean>(false);
  return (
    <DarkModeContext.Provider value={{ darkModeValue, setDarkModeValue }}>
      <div className={darkModeValue ? "theme-dark" : "theme-light"}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
}
