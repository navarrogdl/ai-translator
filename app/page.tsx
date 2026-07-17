"use client";

import { OutputSection } from "@/components/translation-area/OutputSection";
import { InputSection } from "@/components/translation-area/InputSection";
import { SourceLanguage } from "@/components/SourceLanguage";
import { TargetLanguage } from "@/components/TargetLanguage";
import { ButtonSwap } from "@/components/ui/ButtonSwap";
import { ApiWarning } from "@/components/ui/ApiWarning";
import { ToggleTheme } from "@/components/ui/ToggleTheme";

export default function Home() {
  return (
    <div className="container relative min-h-screen md:flex md:items-center justify-center">
      <ToggleTheme />
      <ApiWarning />

      <div className="w-full mx-auto flex justify-center items-center">
        <div className="!mb-[20vh] md:!mt-[20vh] max-w-[90%] mx-auto md:mx-0 md:max-w-none rounded-[10px] bg-white dark:bg-neutral-900 md:min-w-full">
          <section className="language-selection rounded-t-[10px] border border-highlight-neutral-300 dark:border-neutral-500">
            <SourceLanguage />

            <ButtonSwap />

            <TargetLanguage />
          </section>

          <main className="flex flex-col md:flex-row md:h-[250px]">
            <InputSection />

            <OutputSection />
          </main>
        </div>
      </div>
    </div>
  );
}
