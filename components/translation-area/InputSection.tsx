"use client";

import useTranslatorStore from "@/store/translatorStore";

export const InputSection = () => {
  const { inputText, setInputText, translate, startVoiceRecognition } =
    useTranslatorStore();

  return (
    <section className="flex flex-1 flex-col">
      <div className="textarea-container border-l border-r border-highlight-neutral-300 dark:border-neutral-500">
        <textarea
          id="inputText"
          placeholder="Introduce el texto"
          maxLength={5000}
          value={inputText}
          className="min-h-[30vh] md:min-h-auto "
          onChange={(e) => {
            setInputText(e.target.value);
            if (inputText.trim()) {
              setTimeout(() => translate(), 500);
            }
          }}
        />
      </div>
      <footer className="input-controls border-t border-b border-l border-r !rounded-bl-none md:rounded-bl-[10px] border-highlight-neutral-300 dark:border-neutral-500">
        <button
          className="icon-button mic-button dark:bg-neutral-800"
          id="micButton"
          onClick={() => startVoiceRecognition()}
        >
          <span className="material-symbols-outlined">mic</span>
        </button>
      </footer>
    </section>
  );
};
