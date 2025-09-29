import { cn } from "@/lib/utils";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import flourite from "flourite";
import useStore from "@/store/store";
import { useEffect } from "react";

function CodeEditor() {
  const {
    code,
    title,
    language,
    fontSize,
    autoDetectLanguage,
    setCode,
    setTitle,
    setLanguage,
  } = useStore();

  // Auto-detect language when code changes
  useEffect(() => {
    if (autoDetectLanguage && code.trim()) {
      const detected = flourite(code, { shiki: true });
      if (detected.language && detected.language !== language) {
        setLanguage(detected.language);
      }
    }
  }, [code, autoDetectLanguage, language, setLanguage]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const highlightCode = (code: string) => {
    try {
      return hljs.highlight(code, { language }).value;
    } catch {
      // Fallback to auto-detection if language is not supported
      return hljs.highlightAuto(code).value;
    }
  };

  return (
    <div
      className={cn(
        "w-full border shadow-lg rounded-xl bg-background border-gray-600/25"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-3 py-2 md:px-4 border-b border-gray-600/25">
        <div className="flex gap-1.5">
          <div className="rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-red-500" />
          <div className="rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-yellow-500" />
          <div className="rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onFocus={(e) => e.target.select()}
            className="bg-transparent text-center text-foreground/80 text-xs md:text-sm font-medium focus:outline-none w-full"
            placeholder="Enter title..."
          />
        </div>
      </header>
      <div className="px-2 pb-2 md:px-4 md:pb-3">
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={highlightCode}
          padding={8}
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: fontSize,
            lineHeight: 1.4,
          }}
          textareaClassName="focus:outline-none resize-none"
          placeholder="Start typing your code here..."
        />
      </div>
    </div>
  );
}

export default CodeEditor;
