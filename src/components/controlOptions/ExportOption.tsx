import { ShareIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toBlob } from "html-to-image";
import toast from "react-hot-toast";
import { type RefObject } from "react";
import useStore from "@/store/store";

function ExportOption({
  codeEditorRef,
}: {
  codeEditorRef: RefObject<HTMLDivElement | null>;
}) {
  const {
    code,
    title,
    theme,
    darkMode,
    showBackground,
    language,
    fontSize,
    fontStyle,
    padding,
  } = useStore();

  const copyImage = async () => {
    if (!codeEditorRef.current) {
      throw new Error("Code editor reference is not available");
    }

    const imgBlob = await toBlob(codeEditorRef.current, {
      pixelRatio: 2,
    });

    if (imgBlob) {
      const img = new ClipboardItem({ "image/png": imgBlob });
      await navigator.clipboard.write([img]);
    }
  };

  const copyLink = async () => {
    // Create a shareable URL with current snippet state
    const snippetData = {
      code,
      title,
      theme,
      darkMode,
      showBackground,
      language,
      fontSize,
      fontStyle,
      padding,
    };

    // Encode the snippet data as URL parameters
    const encodedData = btoa(JSON.stringify(snippetData));
    const shareableUrl = `${window.location.origin}${window.location.pathname}?snippet=${encodedData}`;

    // Copy to clipboard
    await navigator.clipboard.writeText(shareableUrl);
  };
  const downloadImg = async () => {
    if (!codeEditorRef.current) {
      throw new Error("Code editor reference is not available");
    }

    const imgBlob = await toBlob(codeEditorRef.current, {
      pixelRatio: 2,
    });

    if (imgBlob) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(imgBlob);
      a.download = `${title || "snippet"}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ShareIcon size={12} />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            toast.promise(copyImage(), {
              loading: "Loading...",
              success: "Image copied to clipboard",
              error: "Failed to copy image",
            });
          }}
        >
          Copy Image
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast.promise(copyLink(), {
              loading: "Generating link...",
              success: "Link copied to clipboard",
              error: "Failed to copy link",
            });
          }}
        >
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast.promise(downloadImg(), {
              loading: "Downloading image...",
              success: "Image downloaded",
              error: "Failed to download image",
            });
          }}
        >
          Download Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportOption;
