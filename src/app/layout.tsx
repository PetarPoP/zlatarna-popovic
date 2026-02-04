import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/language-context";
import { ScrollToTopOnRoute } from "@/components/ScrollToTopOnRoute";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zlatarna Popovic",
  description: "Timeless jewelry crafted with precision and passion.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="hr" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ScrollToTopOnRoute />
          {children}
          {modal}
          <Toaster 
            position="top-center" 
            richColors 
            toastOptions={{
              style: {
                fontFamily: 'var(--font-geist-sans)',
              },
            }}
          />
        </LanguageProvider>
        {/* Deferred scroll restoration - runs after page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
              if (!window.location.hash) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
