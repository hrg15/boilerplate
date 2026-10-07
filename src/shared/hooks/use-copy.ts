"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const COPIED_RESET_MS = 1500;

export const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const handleCopyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setIsCopied(false);
      toast.error("Could not copy to clipboard");
      return false;
    }

    setIsCopied(true);
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(
      () => setIsCopied(false),
      COPIED_RESET_MS,
    );
    return true;
  }, []);

  return {
    handleCopyToClipboard,
    isCopied,
  };
};
