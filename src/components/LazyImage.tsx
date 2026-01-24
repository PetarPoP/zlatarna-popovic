"use client";

import { useState, useEffect, useRef } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  rootMargin?: string;
  threshold?: number;
};

export function LazyImage({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  rootMargin = "200px",
  threshold = 0.01,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={imgRef} className="relative h-full w-full">
      {/* Placeholder skeleton */}
      <div
        className={`absolute inset-0 bg-zinc-200 transition-opacity duration-500 ${
          isLoaded ? "opacity-0" : "opacity-100"
        } ${placeholderClassName}`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200" />
      </div>

      {/* Actual image - only rendered when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
