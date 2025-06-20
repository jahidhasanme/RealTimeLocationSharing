import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeContextType, ThemeProviderProps } from '../types/themeTypes';
import { getInitialTheme, updateThemeInDOM } from '../utils/themeUtils';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    updateThemeInDOM(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};