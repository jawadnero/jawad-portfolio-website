import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('jawad_portfolio_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default to dark cinematic mode
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.remove('light-theme');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      body.classList.remove('light-theme');
      body.classList.add('dark');
      body.style.backgroundColor = '#070707';
      body.style.color = '#ededed';
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      body.classList.add('light-theme');
      body.classList.remove('dark');
      body.style.backgroundColor = '#f8f9fa';
      body.style.color = '#111827';
    }

    localStorage.setItem('jawad_portfolio_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
