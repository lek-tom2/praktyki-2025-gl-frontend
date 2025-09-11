import useUserContext from "@/gl-context/UserContextProvider";
import en from "@/lang/en.json";
import pl from "@/lang/pl.json";

const translations: Record<string, any> = { en, pl };

export default function useTranslation() {
  const { User } = useUserContext();
  const lang = User.languageIso2 || "en";

  function t(path: string): string {
    const keys = path.split(".");
    let value: any = translations[lang];
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return path;
    }
    return typeof value === "string" ? value : path;
  }

  return { t, lang };
}