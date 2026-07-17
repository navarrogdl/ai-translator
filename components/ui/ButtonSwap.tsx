"use client";

import useTranslatorStore from "../../store/translatorStore";

export const ButtonSwap = () => {
  const { swapLanguages } = useTranslatorStore();
  return (
    <button
      className="swap-languages icon-button"
      id="swapLanguages"
      onClick={() => swapLanguages()}
    >
      <span className="material-symbols-outlined">swap_horiz</span>
    </button>
  );
};
