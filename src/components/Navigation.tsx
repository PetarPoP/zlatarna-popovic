"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  isPage?: boolean;
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
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  
  const isHomePage = pathname === "/";
  const isLight = variant === "light";
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    isLight 
      ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]
      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
  );

  const navItems: NavItem[] = [
    { label: t.nav.about, href: isHomePage ? "#about" : "/#about" },
    { label: t.nav.collections, href: isHomePage ? "#collections" : "/#collections" },
    { label: t.nav.gallery, href: "/gallery", isPage: true },
    { label: t.nav.contact, href: isHomePage ? "#contact" : "/#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "hr" ? "en" : "hr");
  };

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

  const handleNavClick = () => {
    setIsOpen(false);
  };

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
              ZLATARNA POPOVIĆ
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) =>
              item.isPage ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Link
                    href={item.href}
                    className={`tracking-wider transition-colors ${textColor} ${textHoverColor} ${
                      pathname === item.href ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (isHomePage) {
                        e.preventDefault();
                        const targetId = item.href.replace("#", "");
                        const element = document.getElementById(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className={`tracking-wider transition-colors cursor-pointer ${textColor} ${textHoverColor}`}
                  >
                    {item.label}
                  </a>
                </motion.div>
              )
            )}
            
            {/* Language Switch */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? "border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100"
                  : "border-white/30 hover:border-white/50 hover:bg-white/10"
              } ${textColor}`}
              aria-label="Toggle language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium uppercase">{language}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColor} hover:bg-transparent`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
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
              item.isPage ? (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`block tracking-wider transition-colors ${textColor} ${textHoverColor} ${
                    pathname === item.href ? "underline underline-offset-4" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (isHomePage) {
                      e.preventDefault();
                      handleNavClick();
                      const targetId = item.href.replace("#", "");
                      const element = document.getElementById(targetId);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className={`block tracking-wider transition-colors cursor-pointer ${textColor} ${textHoverColor}`}
                >
                  {item.label}
                </a>
              )
            )}
            
            {/* Mobile Language Switch */}
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-0 tracking-wider ${textColor} ${textHoverColor} hover:bg-transparent`}
            >
              <Globe className="h-4 w-4" />
              <span>{language === "hr" ? "English" : "Hrvatski"}</span>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
