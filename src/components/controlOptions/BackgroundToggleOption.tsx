import useStore from "@/store/store";
import { Switch } from "../ui/switch";

function BackgroundToggleOption() {
  const { showBackground, setShowBackground } = useStore();

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-neutral-400">
        Show Background
      </label>
      <div className="flex items-center justify-center">
        <Switch checked={showBackground} onCheckedChange={setShowBackground} />
      </div>
    </div>
  );
}

export default BackgroundToggleOption;
