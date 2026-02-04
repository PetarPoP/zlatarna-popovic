"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pri promjeni rute postavlja scroll na 0 PRIJE paint-a (useLayoutEffect),
 * tako da se stranica odmah prikaže na vrhu – nema vidljivog scrolla
 * i ne učitavaju se sve slike zbog scrolla.
 */
export function ScrollToTopOnRoute() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
