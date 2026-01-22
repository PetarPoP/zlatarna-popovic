"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const deltaBuffer = useRef(0);
  const hasInitialized = useRef(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );

  const navItems = ["Collections", "About", "Contact"];

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      lastScrollY.current = latest;
      setHidden(false);
      deltaBuffer.current = 0;
      return;
    }

    const delta = latest - lastScrollY.current;

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
            className="text-2xl tracking-widest text-white"
          >
            ÉLÉGANCE
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-12">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-white tracking-wider transition-colors hover:text-gray-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
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
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-white tracking-wider transition-colors hover:text-gray-300"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
