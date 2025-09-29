import useStore from "@/store/store";
import { Input } from "../ui/input";

function FontSizeOptions() {
  const { fontSize, setFontSize } = useStore();

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 8 && value <= 72) {
      setFontSize(value);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Font Size
      </label>
      <Input
        type="number"
        value={fontSize}
        onChange={handleFontSizeChange}
        min={8}
        max={72}
        step={1}
        className="w-20"
        placeholder="12"
      />
    </div>
  );
}

export default FontSizeOptions;
