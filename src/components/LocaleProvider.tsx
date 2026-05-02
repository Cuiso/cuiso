"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];
type Messages = Record<string, unknown>;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "locale";

function isLocale(value: string | null): value is Locale {
  return value !== null && (routing.locales as readonly string[]).includes(value);
}

export function useLocaleSwitch() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleSwitch must be used inside LocaleProvider");
  return ctx;
}

export function LocaleProvider({
  initialLocale,
  messages,
  children,
}: {
  initialLocale: Locale;
  messages: Record<Locale, Messages>;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored) && stored !== locale) {
      setLocaleState(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount to hydrate from storage
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode, quota)
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
