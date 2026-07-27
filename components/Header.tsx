'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 glass-panel border-b-0 border-white/5">
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 md:w-9 md:h-9 user-bubble rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 ring-1 ring-white/20">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">SiteScope <span className="font-light opacity-80">AI</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link href="/" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Home</Link>
          <Link href="/audit" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Audit Chat</Link>
          <Link href="/about" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">About</Link>
          <Link href="/playground" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all">Playground</Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="sm:hidden text-slate-300 hover:text-white transition-colors focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Slide-out Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-64 glass-panel border-l border-white/10 z-50 transform transition-transform duration-300 ease-out sm:hidden flex flex-col pt-20 px-6 gap-6 shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
        <Link href="/audit" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-purple-300 hover:text-white transition-colors">Audit Chat</Link>
        <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white transition-colors">About</Link>
        <Link href="/playground" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-slate-300 hover:text-white transition-colors">Playground</Link>
      </div>
    </>
  );
}
