import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleProvider } from "@/components/LocaleProvider";

type Locale = (typeof routing.locales)[number];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [es, en] = await Promise.all([
    import("../../../messages/es.json").then((m) => m.default),
    import("../../../messages/en.json").then((m) => m.default),
  ]);

  return (
    <LocaleProvider
      initialLocale={locale as Locale}
      messages={{ es, en }}
    >
      {children}
    </LocaleProvider>
  );
}
