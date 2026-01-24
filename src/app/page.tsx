import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ScrollReset } from "@/components/ScrollReset";
import { RevealOnScroll } from "@/components/RevealOnScroll";

// Dynamically import heavy components that are below the fold
const SnapShowcase = dynamic(() => import("@/components/SnapShowcase").then(mod => ({ default: mod.SnapShowcase })), {
  loading: () => <div className="min-h-screen bg-white" />,
});

const Collections = dynamic(() => import("@/components/Collections").then(mod => ({ default: mod.Collections })), {
  loading: () => <div className="min-h-[400px] bg-zinc-50" />,
});

const Contact = dynamic(() => import("@/components/Contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[600px] bg-white" />,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation />
      <ScrollReset />

      <main className="snap-y snap-mandatory">
        <RevealOnScroll>
          <Hero />
        </RevealOnScroll>

        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <RevealOnScroll>
            <SnapShowcase />
          </RevealOnScroll>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px] bg-zinc-50" />}>
          <RevealOnScroll>
            <Collections />
          </RevealOnScroll>
        </Suspense>

        <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
          <RevealOnScroll>
            <Contact />
          </RevealOnScroll>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

