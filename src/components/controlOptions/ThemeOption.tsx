import useStore from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { themes } from "@/lib/constant";

function ThemeOptions() {
  const { theme, setTheme } = useStore();
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Theme
      </label>
      <Select
        value={theme}
        onValueChange={(value) => {
          setTheme(value);
        }}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.entries(themes).map(([name, themeData]) => (
            <SelectItem key={name} value={name}>
              <div className="flex gap-2 items-center">
                <div
                  className={cn("h-4 w-4 rounded-full", themeData.background)}
                />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ThemeOptions;
