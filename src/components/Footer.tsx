"use client";

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-sm tracking-[0.4em]">ZLATARNA POPOVIC</h3>
          <p className="text-sm text-white/70">
            Crafting timeless jewelry since 1985. Each piece tells a story of
            elegance and sophistication.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">Quick Links</h4>
          <div className="space-y-2 text-sm text-white/70">
            <a href="#collections" className="block transition hover:text-white">
              Collections
            </a>
            <a href="#about" className="block transition hover:text-white">
              About Us
            </a>
            <a href="#contact" className="block transition hover:text-white">
              Contact
            </a>
            <a href="#" className="block transition hover:text-white">
              Care Guide
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.3em]">Follow Us</h4>
          <div className="flex gap-4 text-sm text-white/70">
            <a href="#" className="transition hover:text-white">
              Instagram
            </a>
            <a href="#" className="transition hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 px-4 pt-6 text-center text-xs text-white/60">
        © 2026 Zlatarna Popovic. All rights reserved.
      </div>
    </footer>
  );
}
