import { createContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'dark';

export const ThemeContext = createContext();

function getInitialTheme() {
        if (typeof window === 'undefined') {
                return DEFAULT_THEME;
        }

        try {
                const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
                return storedTheme === 'light' ? 'light' : 'dark';
        } catch {
                return DEFAULT_THEME;
        }
}

export function ThemeContextProvider({ children }) {
        const [theme, setTheme] = useState(getInitialTheme);

        useEffect(() => {
                const root = document.documentElement;
                root.setAttribute('data-theme', theme);
                root.style.colorScheme = theme;

                try {
                        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
                } catch {
                        // Ignore storage failures and keep the in-memory theme active.
                }
        }, [theme]);

        const toggleTheme = () => {
                setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
        };

        return (
                <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
                        { children }
                </ThemeContext.Provider>
        );
}
