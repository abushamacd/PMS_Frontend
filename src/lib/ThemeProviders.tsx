"use client";

import { ThemeProvider as NextTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextTheme {...props}>{children}</NextTheme>;
};

export default ThemeProvider;
