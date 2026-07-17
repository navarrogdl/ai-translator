"use client";
import { useEffect } from "react";
import { useTranslatorStore } from "@/store/translatorStore";

export const ApiWarning = () => {
  const { hasNativeTranslator, hasNativeDetector, checkAPISupport } =
    useTranslatorStore();

  useEffect(() => {
    checkAPISupport();
  }, [checkAPISupport]);

  if (hasNativeTranslator && hasNativeDetector) return null;

  return (
    <div className="api-warning md:fixed md:left-10 md:bottom-10">
      ⚠️ APIs nativas de traducción no disponibles. Funcionalidad limitada.
    </div>
  );
};
