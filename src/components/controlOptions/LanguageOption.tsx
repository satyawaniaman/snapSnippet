import useStore from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { languages } from "@/lib/constant";

function LanguageOptions() {
  const { language, autoDetectLanguage, setLanguage, setAutoDetectLanguage } =
    useStore();

  const handleChange = (selectedLanguage: string) => {
    if (selectedLanguage === "auto-detect") {
      setAutoDetectLanguage(true);
      setLanguage("plaintext");
    } else {
      setAutoDetectLanguage(false);
      setLanguage(selectedLanguage);
    }
  };

  const displayValue = autoDetectLanguage ? "auto-detect" : language;

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Language
      </label>
      <Select value={displayValue} onValueChange={handleChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default LanguageOptions;
