"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Don't reset scroll if there's a hash in the URL (navigating to a section)
    if (window.location.hash) {
      return;
    }

    // Reset scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return null;
}
