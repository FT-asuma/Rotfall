"use client"
import React, { useCallback } from 'react'

export const Nav = () => {
    const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
  return (
    <nav className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest text-slate-400" aria-label="Main navigation">
          <a href="#loop" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">01 / The Loop</a>
          <a href="#manual" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">02 / Field Manual</a>
          <a href="#specimens" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">03 / Specimens</a>
          <a href="#devlog" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">04 / Dev Log</a>
        </nav>

  )
}
