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
      <body className="min-h-full flex flex-col">
        <header className="p-4 border-b">
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/audit" className="hover:underline">Audit</Link>
            <Link href="/about" className="hover:underline">About</Link>
          </nav>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
