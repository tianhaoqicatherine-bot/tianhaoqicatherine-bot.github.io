'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }
  return 'system';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
  root.setAttribute('data-theme', effectiveTheme);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setThemeState(stored);
    setEffectiveTheme(stored === 'system' ? getSystemTheme() : stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    applyTheme(theme);
    setEffectiveTheme(theme === 'system' ? getSystemTheme() : theme);

    // Listen for system theme changes when in system mode
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        const newEffective = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newEffective);
        setEffectiveTheme(newEffective);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, newTheme);
    setThemeState(newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return { theme, effectiveTheme, setTheme, cycleTheme, mounted };
}

// Icons
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

const themeIcons: Record<Theme, React.FC<{ className?: string }>> = {
  light: SunIcon,
  dark: MoonIcon,
  system: MonitorIcon,
};

const themeLabels: Record<Theme, string> = {
  light: '浅色',
  dark: '深色',
  system: '跟随系统',
};

export default function ThemeToggle() {
  const { theme, effectiveTheme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="theme-toggle-placeholder" aria-hidden="true" />;
  }

  const CurrentIcon = themeIcons[theme];

  return (
    <div className="theme-toggle-wrapper">
      <button
        type="button"
        className="theme-toggle"
        aria-label={`切换主题: ${themeLabels[theme]}`}
        title={`切换主题: ${themeLabels[theme]}`}
        aria-haspopup="menu"
        aria-expanded="false"
        id="theme-toggle-button"
      >
        <span className="theme-toggle-icon">
          <CurrentIcon />
        </span>
      </button>

      <div className="theme-dropdown" role="menu" aria-labelledby="theme-toggle-button">
        {(['light', 'dark', 'system'] as Theme[]).map((tValue) => {
          const Icon = themeIcons[tValue];
          const isActive = theme === tValue;

          return (
            <button
              key={tValue}
              type="button"
              role="menuitem"
              className={`theme-option ${isActive ? 'active' : ''}`}
              onClick={() => setTheme(tValue)}
              aria-pressed={isActive}
            >
              <Icon className="theme-option-icon" />
              <span className="theme-option-label">{themeLabels[tValue]}</span>
              {theme === 'system' && tValue === 'system' && (
                <span className="theme-option-badge">
                  {effectiveTheme === 'dark' ? '深色' : '浅色'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
