import { useTranslation } from "react-i18next";

/** Only translates display text; never changes values submitted to the backend. */
export default function TranslationText({ text }: { text: string }) {
  const { t } = useTranslation();
  return <>{t(text)}</>;
}
