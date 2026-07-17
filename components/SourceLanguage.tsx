"use client";

import useTranslatorStore from "../store/translatorStore";

export const SourceLanguage = () => {
  const { sourceLanguage, setSourceLanguage } = useTranslatorStore();

  return (
    <div className="source-language text-highlight-text-neutral dark:text-neutral-300">
      <select
        id="sourceLanguage"
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
        className="border  bg-highlight-neutral-100 dark:bg-neutral-800 border-highlight-neutral-300 dark:border-neutral-500"
      >
        <option value="auto">Detectar idioma</option>
        <option value="en">Inglés</option>
        <option value="es">Español</option>
        <option value="fr">Francés</option>
        <option value="de">Alemán</option>
        <option value="it">Italiano</option>
        <option value="pt">Portugués</option>
        <option value="ru">Ruso</option>
        <option value="ja">Japonés</option>
        <option value="zh">Chino</option>
      </select>
    </div>
  );
};
