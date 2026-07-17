/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranslatorState } from "./translatorTypes";
import { create } from "zustand";

declare global {
  interface Window {
    Translator?: any;
    LanguageDetector?: any;
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

const SUPPORTED_LANGUAGES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "ja",
  "zh",
];

const FULL_LANGUAGES_CODES: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  ru: "ru-RU",
  ja: "ja-JP",
  zh: "zh-CN",
};

const DEFAULT_SOURCE_LANGUAGE = "es";
const DEFAULT_TARGET_LANGUAGE = "en";

export const useTranslatorStore = create<TranslatorState>((set, get) => ({
  inputText: "",
  outputText: "",
  sourceLanguage: "auto",
  targetLanguage: DEFAULT_TARGET_LANGUAGE,
  isTranslating: false,
  hasNativeTranslator: false,
  hasNativeDetector: false,

  // --- actualiza el soporte nativo al cargar ---
  checkAPISupport: () => {
    const hasNativeTranslator = "Translator" in window;
    const hasNativeDetector = "LanguageDetector" in window;
    set({ hasNativeTranslator, hasNativeDetector });
  },

  setInputText: (text: string) => set({ inputText: text }),
  setSourceLanguage: (lang: string) => set({ sourceLanguage: lang }),
  setTargetLanguage: (lang: string) => set({ targetLanguage: lang }),

  translate: async () => {
    const { inputText, sourceLanguage, targetLanguage } = get();
    if (!inputText.trim()) {
      set({ outputText: "" });
      return;
    }

    set({ isTranslating: true, outputText: "Traduciendo..." });

    try {
      const realSource =
        sourceLanguage === "auto"
          ? await detectLanguageInternal(inputText)
          : sourceLanguage;

      if (realSource === targetLanguage) {
        set({ outputText: inputText, isTranslating: false });
        return;
      }

      if (!("Translator" in window)) {
        throw new Error("Translator API not available");
      }

      const status = await window.Translator.availability({
        sourceLanguage: realSource,
        targetLanguage,
      });

      if (status === "unavailable") {
        throw new Error("Unavailable");
      }

      const translator = await window.Translator.create({
        sourceLanguage: realSource,
        targetLanguage,
      });

      const translation = await translator.translate(inputText);
      set({ outputText: translation, isTranslating: false });
    } catch (error) {
      console.error(error);
      set({ outputText: "Error al traducir", isTranslating: false });
    }
  },

  swapLanguages: async () => {
    const {
      sourceLanguage,
      targetLanguage,
      inputText,
      outputText,
      setSourceLanguage,
      setTargetLanguage,
    } = get();

    let newSource = sourceLanguage;
    if (sourceLanguage === "auto") {
      const detected = await detectLanguageInternal(inputText);
      newSource = detected;
    }

    setSourceLanguage(targetLanguage);
    setTargetLanguage(newSource);

    set({ inputText: outputText, outputText: "" });

    if (get().inputText.trim()) {
      await get().translate();
    }
  },

  startVoiceRecognition: async () => {
    const hasNativeRecognitionSupport =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!hasNativeRecognitionSupport) return;

    const SpeechRecognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    const language =
      get().sourceLanguage === "auto"
        ? await detectLanguageInternal(get().inputText)
        : get().sourceLanguage;

    recognition.lang =
      FULL_LANGUAGES_CODES[language] ?? DEFAULT_SOURCE_LANGUAGE;

    recognition.onresult = (event: any) => {
      const [{ transcript }] = event.results[0];
      set({ inputText: transcript });
      get().translate();
    };

    recognition.onerror = (event: any) => {
      console.error("Error de reconocimiento de voz: ", event.error);
    };

    recognition.start();
  },

  speakTranslation: () => {
    const text = get().outputText;
    if (!text || !("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      FULL_LANGUAGES_CODES[get().targetLanguage] ?? DEFAULT_TARGET_LANGUAGE;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  },
}));

async function detectLanguageInternal(text: string) {
  try {
    if (!("LanguageDetector" in window)) {
      throw new Error("LanguageDetector not available");
    }

    const detector = await window.LanguageDetector.create({
      expectedInputLanguages: SUPPORTED_LANGUAGES,
    });

    const results = await detector.detect(text);
    const detectedLanguage = results[0]?.detectedLanguage;

    return detectedLanguage === "und"
      ? DEFAULT_SOURCE_LANGUAGE
      : detectedLanguage;
  } catch (error) {
    console.error("No he podido averiguar el idioma: ", error);
    return DEFAULT_SOURCE_LANGUAGE;
  }
}

export default useTranslatorStore;
