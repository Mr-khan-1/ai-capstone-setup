import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiteScope AI",
  description: "Paste a URL, get an AI-generated SEO/accessibility audit, streamed as chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-dvh flex flex-col text-slate-200 font-sans antialiased selection:bg-purple-500/30">
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass-panel border-b-0 border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 user-bubble rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">SiteScope <span className="font-light opacity-80">AI</span></span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Home</Link>
            <Link href="/audit" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Audit Chat</Link>
            <Link href="/about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">About</Link>
            <Link href="/playground" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Playground</Link>
          </nav>
        </header>
        <main className="flex-1 overflow-hidden flex flex-col relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
