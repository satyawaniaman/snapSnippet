import useStore from "@/store/store";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { fonts } from "@/lib/constant";

function FontOptions() {
  const { fontStyle, setFontStyle } = useStore();
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Font Style
      </label>
      <Select value={fontStyle} onValueChange={setFontStyle}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Select Font Style" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(fonts).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FontOptions;
