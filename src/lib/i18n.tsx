'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import zhMessages from '@/messages/zh.json';
import enMessages from '@/messages/en.json';

import {
  type Locale,
  defaultLocale,
  isValidLocale,
  locales,
} from '@/i18n/config';

const messagesMap: Record<Locale, Record<string, unknown>> = {
  zh: zhMessages,
  en: enMessages,
};

type Messages = Record<string, unknown>;

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = 'locale';

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isValidLocale(stored)) return stored;
  return defaultLocale;
}

function loadMessages(locale: Locale): Promise<Messages> {
  return Promise.resolve(messagesMap[locale] ?? messagesMap[defaultLocale]);
}

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(
    initialLocale ?? defaultLocale,
  );
  const [messages, setMessages] = useState<Messages>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredLocale();
    setLocaleState(stored);
    loadMessages(stored).then((msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) return;
    window.localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
    loadMessages(newLocale).then((msgs) => {
      setMessages(msgs);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="i18n-loading">
        {/* Minimal loading state, shouldn't show long */}
      </div>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function useTranslation() {
  const { messages, locale } = useI18n();

  const t = useCallback(
    (key: string) => {
      const keys = key.split('.');
      let value: unknown = messages;
      for (const k of keys) {
        if (value && typeof value === 'object') {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key; // Fallback to key if translation not found
        }
      }
      return typeof value === 'string' ? value : key;
    },
    [messages],
  );

  return { t, locale };
}

export { locales, defaultLocale, isValidLocale };
export type { Locale };
