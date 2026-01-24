"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Don't reset scroll if there's a hash in the URL (navigating to a section)
    if (window.location.hash) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (window.scrollY <= 80) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
