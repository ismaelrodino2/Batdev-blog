'use client';

import React, { createContext, useState } from "react";

type SearchContextType = {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
};

export const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
