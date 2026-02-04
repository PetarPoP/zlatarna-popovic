"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/LazyImage";
import { ChevronDown, ChevronUp } from "lucide-react";

type ShowcaseItem = {
  titleKey: "laserTitle" | "ringsTitle" | "watchesTitle";
  descKey: "laserDesc" | "ringsDesc" | "watchesDesc";
  extendedKey: "laserExtended" | "ringsExtended" | "watchesExtended";
  image: string;
};

const itemsData: ShowcaseItem[] = [
  {
    titleKey: "laserTitle",
    descKey: "laserDesc",
    extendedKey: "laserExtended",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
  },
  {
    titleKey: "ringsTitle",
    descKey: "ringsDesc",
    extendedKey: "ringsExtended",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1400",
  },
  {
    titleKey: "watchesTitle",
    descKey: "watchesDesc",
    extendedKey: "watchesExtended",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
  },
];

export function SnapShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { t } = useLanguage();
  
  const items = useMemo(() => itemsData.map(item => ({
    id: item.titleKey,
    title: t.showcase[item.titleKey],
    description: t.showcase[item.descKey],
    extended: t.showcase[item.extendedKey],
    image: item.image,
  })), [t]);

  const [visible, setVisible] = useState<boolean[]>(() =>
    items.map((_, index) => index === 0)
  );
  const [lineVisible, setLineVisible] = useState<boolean[]>(() =>
    items.map(() => false)
  );
  const [expanded, setExpanded] = useState<boolean[]>(() =>
    items.map(() => false)
  );

  const toggleExpanded = (index: number) => {
    setExpanded(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (Number.isNaN(index)) {
            return;
          }
          setLineVisible((prev) => {
            if (prev[index] === entry.isIntersecting) {
              return prev;
            }
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });

          if (!entry.isIntersecting) {
            return;
          }
          setVisible((prev) => {
            if (prev[index]) {
              return prev;
            }
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { threshold: 0.35 }
    );

    itemRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }
      node.setAttribute("data-index", String(index));
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative bg-white">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(node) => {
            itemRefs.current[index] = node;
          }}
          className="py-16 md:py-24"
        >
          <div
            className={`mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 ${
              index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div
              className={`space-y-6 transition-all duration-700 ${
                visible[index]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">
                {t.showcase.subtitle}
              </p>
              <h2 className="text-3xl tracking-[0.2em] sm:text-4xl">
                {item.title}
              </h2>
              <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                {item.description}
              </p>
              <Button 
                onClick={() => toggleExpanded(index)}
                className="rounded-lg bg-black px-8 py-3 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
              >
                {expanded[index] ? (
                  <>
                    {t.showcase.showLess}
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t.showcase.learnMore}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              
              {/* Expandable content */}
              <AnimatePresence>
                {expanded[index] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                      <p className="text-sm leading-7 text-zinc-700 sm:text-base">
                        {item.extended}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className={`relative h-80 overflow-hidden transition-all duration-700 md:h-[420px] ${
                visible[index]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <LazyImage
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                rootMargin="200px"
              />
            </div>
          </div>
          {index < items.length - 1 && (
            <div className="pointer-events-none mx-auto hidden max-w-6xl px-4 md:block pt-10 -mb-40">
              <div className="relative h-32 flex items-center justify-center">
                <motion.svg
                  viewBox="0 0 800 120"
                  className="h-full w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient 
                      id={`lineGradient-${index}`} 
                      x1={index % 2 === 0 ? "100%" : "0%"} 
                      y1="0%" 
                      x2={index % 2 === 0 ? "0%" : "100%"} 
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgb(180, 155, 120)" />
                      <stop offset="50%" stopColor="rgb(160, 135, 100)" />
                      <stop offset="100%" stopColor="rgb(180, 155, 120)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={index % 2 === 0 
                      ? "M620 10 C620 60 400 60 400 60 C400 60 180 60 180 110"
                      : "M180 10 C180 60 400 60 400 60 C400 60 620 60 620 110"
                    }
                    fill="none"
                    stroke={`url(#lineGradient-${index})`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: lineVisible[index + 1] ? 1 : 0,
                      opacity: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx={index % 2 === 0 ? 620 : 180}
                    cy="10"
                    r="5"
                    fill="rgb(170, 145, 110)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: lineVisible[index + 1] ? 1 : 0,
                      scale: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 0.3, delay: 0 }}
                  />
                  <motion.circle
                    cx={index % 2 === 0 ? 180 : 620}
                    cy="110"
                    r="5"
                    fill="rgb(170, 145, 110)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: lineVisible[index + 1] ? 1 : 0,
                      scale: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 0.3, delay: 1 }}
                  />
                </motion.svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
