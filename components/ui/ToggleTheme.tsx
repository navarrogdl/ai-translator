"use client";

import useThemeStore from "@/store/themeStore";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className="cursor-pointer fixed z-50 size-16 bottom-10 right-10 border-2 dark:border bg-white dark:bg-neutral-800 border-neutral-300 rounded-full transition-transform duration-300 hover:scale-110"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      {theme === "light" ? (
        <span className="material-symbols-outlined text-[28px] icon-button hover:!bg-transparent">
          sunny
        </span>
      ) : (
        <span className="material-symbols-outlined text-[28px] icon-button hover:!bg-transparent">
          bedtime
        </span>
      )}
    </button>
  );
};
