"use client";

import { useTranslatorStore } from "../store/translatorStore";

export const TargetLanguage = () => {
  const { targetLanguage, setTargetLanguage } = useTranslatorStore();

  return (
    <div className="target-language text-highlight-text-neutral dark:text-neutral-300">
      <select
        id="targetLanguage"
        value={targetLanguage}
        className="text-highlight-text-neutral dark:text-neutral-300 border bg-highlight-neutral-100 dark:bg-neutral-800 border-highlight-neutral-300 dark:border-neutral-500"
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
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
