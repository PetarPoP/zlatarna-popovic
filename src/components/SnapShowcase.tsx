"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
};

const items: ShowcaseItem[] = [
  {
    title: "Lasersko Graviranje",
    description:
      "Precizno lasersko graviranje za prstenje, narukvice i privjeske. Personalizirajte poruku, datum ili inicijale uz besprijekornu čistoću linija.",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
  },
  {
    title: "Ekskluzivni Satovi",
    description:
      "Kolekcija klasičnih i modernih satova s vrhunskim mehanizmima, ručnom završnom obradom i bezvremenskim dizajnom.",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaHxlbnwxfHx8fDE3NTk5ODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1400",
  },
];

export function SnapShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    items.map((_, index) => index === 0)
  );
  const [lineVisible, setLineVisible] = useState<boolean[]>(() =>
    items.map(() => false)
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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
          key={item.title}
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
                Usluge i ponuda
              </p>
              <h2 className="text-3xl tracking-[0.2em] sm:text-4xl">
                {item.title}
              </h2>
              <p className="text-sm leading-7 text-zinc-600 sm:text-base">
                {item.description}
              </p>
              <button className="bg-black px-8 py-3 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800">
                Saznaj vise
              </button>
            </div>
            <div
              className={`relative h-80 overflow-hidden transition-all duration-700 md:h-[420px] ${
                visible[index]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {index < items.length - 1 && (
            <div className="pointer-events-none mx-auto hidden max-w-6xl px-4 md:block -mb-36">
              <div className="relative">
                <motion.svg
                  viewBox="0 0 1000 100"
                  className="h-20 w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(161, 136, 107, 0.6)" />
                      <stop offset="50%" stopColor="rgba(120, 100, 80, 0.4)" />
                      <stop offset="100%" stopColor="rgba(161, 136, 107, 0.6)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path
                    d="M850 15 C850 40, 850 40, 800 50 L200 50 C150 50, 150 50, 150 85"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: lineVisible[index + 1] ? 1 : 0,
                      opacity: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: lineVisible[index + 1] ? 1 : 0,
                      scale: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <path
                      d="M850 9 L856 15 L850 21 L844 15 Z"
                      fill="rgba(161, 136, 107, 0.5)"
                    />
                  </motion.g>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: lineVisible[index + 1] ? 1 : 0,
                      scale: lineVisible[index + 1] ? 1 : 0
                    }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <path
                      d="M150 85 L156 91 L150 97 L144 91 Z"
                      fill="rgba(161, 136, 107, 0.5)"
                    />
                  </motion.g>
                </motion.svg>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
