import { create } from "zustand";
import { persist } from "zustand/middleware";
import { codeSnippets } from "@/lib/constant";

// Get a random code snippet for initial content
const getRandomSnippet = () => {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex];
};

const initialSnippet = getRandomSnippet();

interface StoreState {
  code: string;
  title: string;
  theme: string;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;

  // Actions
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  setDarkMode: (darkMode: boolean) => void;
  setShowBackground: (showBackground: boolean) => void;
  setLanguage: (language: string) => void;
  setAutoDetectLanguage: (autoDetectLanguage: boolean) => void;
  setFontSize: (fontSize: number) => void;
  setFontStyle: (fontStyle: string) => void;
  setPadding: (padding: number) => void;
}
const useStore = create(
  persist<StoreState>(
    (set) => ({
      code: initialSnippet.code,
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: initialSnippet.language,
      autoDetectLanguage: false,
      fontSize: 12,
      fontStyle: "jetBrainsMono",
      padding: 32,

      // Actions
      setCode: (code) => set({ code }),
      setTitle: (title) => set({ title }),
      setTheme: (theme) => set({ theme }),
      setDarkMode: (darkMode) => set({ darkMode }),
      setShowBackground: (showBackground) => set({ showBackground }),
      setLanguage: (language) => set({ language }),
      setAutoDetectLanguage: (autoDetectLanguage) =>
        set({ autoDetectLanguage }),
      setFontSize: (fontSize) => set({ fontSize }),
      setFontStyle: (fontStyle) => set({ fontStyle }),
      setPadding: (padding) => set({ padding }),
    }),
    {
      name: "editor-settings",
    }
  )
);

export default useStore;
