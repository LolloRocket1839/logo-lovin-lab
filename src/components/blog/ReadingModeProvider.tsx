import { createContext, useContext, useState, ReactNode } from "react";

interface ReadingModeContextValue {
  readingMode: boolean;
  toggle: () => void;
  setReadingMode: (v: boolean) => void;
}

const ReadingModeContext = createContext<ReadingModeContextValue | null>(null);

export const ReadingModeProvider = ({ children }: { children: ReactNode }) => {
  const [readingMode, setReadingMode] = useState(false);
  return (
    <ReadingModeContext.Provider
      value={{
        readingMode,
        setReadingMode,
        toggle: () => setReadingMode((v) => !v),
      }}
    >
      {children}
    </ReadingModeContext.Provider>
  );
};

export const useReadingMode = () => {
  const ctx = useContext(ReadingModeContext);
  if (!ctx) return { readingMode: false, toggle: () => {}, setReadingMode: () => {} };
  return ctx;
};
