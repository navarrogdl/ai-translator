/* eslint-disable @typescript-eslint/no-explicit-any */

export type TranslatorState = {
  inputText: string;
  outputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  isTranslating: boolean;
  hasNativeTranslator: boolean;
  hasNativeDetector: boolean;
  setInputText: (text: string) => void;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  checkAPISupport: () => void;
  translate: () => Promise<void>;
  swapLanguages: () => Promise<void>;
  startVoiceRecognition: () => Promise<void>;
  speakTranslation: () => void;
};

declare global {
  interface Window {
    Translator?: any;
    LanguageDetector?: any;
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}
