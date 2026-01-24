"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden bg-black">
      <motion.div style={{ y, scale: 1.05 }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Luxury jewelry"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative flex h-full flex-col items-center justify-center px-4 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 text-6xl tracking-wider md:text-8xl"
        >
          ZLATARNA POPOVIĆ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 max-w-2xl text-center text-xl tracking-wide md:text-2xl"
        >
          {t.hero.description}
        </motion.p>
        <motion.a
          href="#collections"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="rounded-lg border-2 border-white px-8 py-3 tracking-widest transition-colors duration-300 hover:bg-white hover:text-black"
        >
          {t.hero.cta}
        </motion.a>
      </motion.div>
    </div>
  );
}
