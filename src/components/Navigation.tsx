"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
};

type NavigationProps = {
  variant?: "default" | "light";
};

export function Navigation({ variant = "default" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const deltaBuffer = useRef(0);
  const hasInitialized = useRef(false);
  const { scrollY } = useScroll();
  
  const isLight = variant === "light";
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    isLight 
      ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]
      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );

  const navItems: NavItem[] = [
    { label: "Kolekcije", href: "#collections" },
    { label: "O nama", href: "#about" },
    { label: "Galerija", href: "/gallery", isExternal: true },
    { label: "Kontakt", href: "#contact" },
  ];

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      lastScrollY.current = latest;
      setHidden(false);
      setScrolled(latest > 50);
      deltaBuffer.current = 0;
      return;
    }

    const delta = latest - lastScrollY.current;
    setScrolled(latest > 50);

    if (latest < 8) {
      setHidden(false);
      deltaBuffer.current = 0;
      lastScrollY.current = latest;
      return;
    }

    if (Math.abs(delta) < 2) {
      lastScrollY.current = latest;
      return;
    }

    deltaBuffer.current += delta;

    if (deltaBuffer.current > 12) {
      setHidden(true);
      deltaBuffer.current = 0;
    } else if (deltaBuffer.current < -12) {
      setHidden(false);
      deltaBuffer.current = 0;
    }

    lastScrollY.current = latest;
  });
  
  // Text colors based on variant and scroll state
  const textColor = isLight 
    ? "text-zinc-900" 
    : "text-white";
  const textHoverColor = isLight 
    ? "hover:text-zinc-600" 
    : "hover:text-gray-300";

  useEffect(() => {
    if (isOpen) {
      setHidden(false);
    }
  }, [isOpen]);

  return (
    <motion.nav
      style={{ backgroundColor }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-sm will-change-transform"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/"
              className={`text-2xl tracking-widest transition-colors ${textColor} ${textHoverColor}`}
            >
              ÉLÉGANCE
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-12">
            {navItems.map((item) =>
              item.isExternal ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Link
                    href={item.href}
                    className={`tracking-wider transition-colors ${textColor} ${textHoverColor}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className={`tracking-wider transition-colors ${textColor} ${textHoverColor}`}
                >
                  {item.label}
                </motion.a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColor}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-4 md:hidden"
          >
            {navItems.map((item) =>
              item.isExternal ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block tracking-wider transition-colors ${textColor} ${textHoverColor}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block tracking-wider transition-colors ${textColor} ${textHoverColor}`}
                >
                  {item.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
