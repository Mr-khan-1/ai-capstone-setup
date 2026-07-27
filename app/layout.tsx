import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
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
        <Header />
        <main className="flex-1 overflow-hidden flex flex-col relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
