'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      const darkMode = storedTheme === 'dark';

      document.documentElement.classList.toggle('dark', darkMode);
      setIsDark(darkMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      document.documentElement.classList.toggle(
        'dark',
        systemPrefersDark
      );
      setIsDark(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const storedTheme = localStorage.getItem('theme');

      // Only follow system changes if user has not selected manually
      if (!storedTheme) {
        document.documentElement.classList.toggle(
          'dark',
          event.matches
        );
        setIsDark(event.matches);
      }
    };

    mediaQuery.addEventListener(
      'change',
      handleSystemThemeChange
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        handleSystemThemeChange
      );
    };
  }, [mounted]);

  const toggleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);

    document.documentElement.classList.toggle(
      'dark',
      newTheme
    );

    localStorage.setItem(
      'theme',
      newTheme ? 'dark' : 'light'
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-muted transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-muted-foreground" />
      )}
    </button>
  );
}