import { useState } from "react";

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      setIsCopied(true);
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return {
    handleCopyToClipboard,
    isCopied,
  };
};
