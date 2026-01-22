import { Collections } from "@/components/Collections";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { ScrollReset } from "@/components/ScrollReset";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SnapShowcase } from "@/components/SnapShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation />
      <ScrollReset />

      <main className="snap-y snap-mandatory">
        <RevealOnScroll>
          <Hero />
        </RevealOnScroll>

        <RevealOnScroll>
          <SnapShowcase />
        </RevealOnScroll>

        <RevealOnScroll>
          <Collections />
        </RevealOnScroll>

        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
}

