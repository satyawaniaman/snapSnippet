import useStore from "@/store/store";
import { Input } from "../ui/input";

function PaddingOptions() {
  const { padding, setPadding } = useStore();
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Padding
      </label>
      <Input
        type="number"
        value={padding}
        onChange={(e) => setPadding(Number(e.target.value))}
        min={0}
        max={500}
        step={1}
        className="w-20"
        placeholder="12"
      />
    </div>
  );
}

export default PaddingOptions;
