import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load theme from localStorage immediately
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stacktrack-theme") as Theme | null;
      if (stored) return stored;
    }
    return "light";
  });

  // Apply theme class to html immediately
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.transition = "background-color 0.5s, color 0.5s";
    localStorage.setItem("stacktrack-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useThemeToggle must be used within ThemeProvider");
  return context.toggleTheme;
}
