import ThemeToggle from "./components/theme-toggle";
import CodeEditor from "./components/ui/code-editor";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import useStore from "./store/store";
import { fonts, themes } from "./lib/constant";
import { cn } from "./lib/utils";
import { useRef, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import ExportOption from "./components/controlOptions/ExportOption";
import ThemeOptions from "./components/controlOptions/ThemeOption";
import FontOptions from "./components/controlOptions/FontOptions";
import LanguageOptions from "./components/controlOptions/LanguageOption";
import FontSizeOptions from "./components/controlOptions/FontSizeOption";
import PaddingOptions from "./components/controlOptions/PaddingOption";
import BackgroundToggleOption from "./components/controlOptions/BackgroundToggleOption";

function App() {
  const codeEditorRef = useRef<HTMLDivElement>(null);
  const {
    theme,
    padding,
    showBackground,
    fontStyle,
    setCode,
    setTitle,
    setTheme,
    setDarkMode,
    setShowBackground,
    setLanguage,
    setFontSize,
    setFontStyle,
    setPadding,
  } = useStore();

  // Load shared snippet from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const snippetParam = urlParams.get("snippet");

    if (snippetParam) {
      try {
        const decodedData = atob(snippetParam);
        const snippetData = JSON.parse(decodedData);

        // Update store with shared snippet data
        if (snippetData.code) setCode(snippetData.code);
        if (snippetData.title) setTitle(snippetData.title);
        if (snippetData.theme) setTheme(snippetData.theme);
        if (typeof snippetData.darkMode === "boolean")
          setDarkMode(snippetData.darkMode);
        if (typeof snippetData.showBackground === "boolean")
          setShowBackground(snippetData.showBackground);
        if (snippetData.language) setLanguage(snippetData.language);
        if (snippetData.fontSize) setFontSize(snippetData.fontSize);
        if (snippetData.fontStyle) setFontStyle(snippetData.fontStyle);
        if (snippetData.padding) setPadding(snippetData.padding);

        // Clean up URL after loading
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } catch (error) {
        console.error("Failed to load shared snippet:", error);
      }
    }
  }, [
    setCode,
    setTitle,
    setTheme,
    setDarkMode,
    setShowBackground,
    setLanguage,
    setFontSize,
    setFontStyle,
    setPadding,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 flex-shrink-0">
        <h1
          className="text-xl md:text-2xl font-bold font-serif tracking-tight leading-tight text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          snapSnippet
        </h1>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="https://github.com/satyawaniaman/snapsnippet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/satyawani_aman"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80"
          >
            <FaXTwitter />
          </a>
          <ThemeToggle />
        </div>
      </div>

      <link
        rel="stylesheet"
        href={themes[theme as keyof typeof themes].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle as keyof typeof fonts].src}
        crossOrigin="anonymous"
      />

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-80 md:pb-40">
        <div className="w-full max-w-[95vw] sm:max-w-[600px] lg:max-w-[800px]">
          <div
            style={{ padding: Math.min(padding, 32) }}
            ref={codeEditorRef}
            className={cn(
              "overflow-hidden rounded-xl shadow-xl border transition-all ease-out",
              showBackground
                ? themes[theme as keyof typeof themes].background
                : "ring ring-neutral-900"
            )}
          >
            <CodeEditor />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 lg:max-w-6xl">
        <Card className="bg-gray-900/10 backdrop-blur-md border border-gray-600/25 shadow-2xl">
          <CardContent className="p-4 md:p-6">
            {/* Mobile: Stacked layout */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              <div className="grid grid-cols-2 gap-4">
                <ThemeOptions />
                <LanguageOptions />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FontOptions />
                <FontSizeOptions />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <PaddingOptions />
                <BackgroundToggleOption />
              </div>
              <div className="flex justify-center">
                <ExportOption codeEditorRef={codeEditorRef} />
              </div>
            </div>

            {/* Desktop: Horizontal layout */}
            <div className="hidden md:flex md:flex-row md:items-center md:gap-6">
              <ThemeOptions />
              <LanguageOptions />
              <FontOptions />
              <FontSizeOptions />
              <PaddingOptions />
              <BackgroundToggleOption />
              <ExportOption codeEditorRef={codeEditorRef} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
