import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "../i18n/translations";
import type { T } from "../i18n/translations";

export type Lang = "en" | "nl";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <Ctx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
}
