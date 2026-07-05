"use client";
import React, { useState, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Skull,
  Users,
  Map,
  Radio,
  Binary,
  RefreshCw,
  Terminal,
  Eye,
  Play,
  ShieldAlert,
  X,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  // FIX: Removed 'ease: "easeOut"' string to satisfy Framer Motion TypeScript types.
  // The default transition effectively acts as easeOut anyway.
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

type ParticleData = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
};

const Particles = memo(() => {
  // ✅ Start with empty array to match SSR output
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    // ✅ Generate random positions only on the client after mount
    setParticles(
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 12 + 8}s`,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-[3px] h-[3px] rounded-full bg-emerald-500/20 blur-[2px] animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = "Particles";

export const CSR = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/80 to-[#030303]"
          aria-hidden="true"
        />
        <Particles />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 w-full max-w-5xl mx-auto pt-20"
        >
          <div className="inline-flex items-center gap-2 border border-emerald-500/20 rounded-full bg-emerald-950/30 backdrop-blur-sm px-4 py-1.5 text-xs text-emerald-400 tracking-widest uppercase font-mono mb-8">
            <Radio className="w-3 h-3 animate-pulse" /> Signal Acquired //
            Pre-Alpha v0.4.2
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-600 to-[#050505] drop-shadow-[0_0_60px_rgba(16,185,129,0.3)] select-none">
            Rotfall
          </h1>

          <p className="mt-8 text-lg sm:text-xl md:text-2xl font-light tracking-wide text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Survive the unimaginable. An open-world fantastical horror
            experience.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto group relative px-8 py-4 md:px-10 md:py-5 text-sm md:text-lg font-mono font-bold text-black uppercase transition-all duration-300 bg-emerald-500 rounded hover:bg-emerald-400 overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Binary className="w-5 h-5" /> Secure Deployment
              </span>
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 text-sm md:text-lg font-mono font-bold transition-all duration-300 border border-emerald-800 rounded hover:bg-emerald-950/60 text-emerald-400 backdrop-blur-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
            >
              <Play className="w-5 h-5" /> Intercept Transmission
            </button>
          </div>
        </motion.div>
      </section>

      {/* VIDEO TRAILER MODULE */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 w-full bg-[#050505] border-y border-emerald-900/50 overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-emerald-900/50 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative bg-black">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/60 backdrop-blur-sm rounded-full text-emerald-400 hover:text-white hover:bg-emerald-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1"
                  title="Rotfall Gameplay Transmission"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                {/* NOTE: Replace dQw4w9WgXcQ with your actual trailer ID before production */}
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="mt-6 text-emerald-500 font-mono text-sm tracking-widest hover:text-emerald-300 uppercase flex items-center gap-2 focus-visible:outline-none focus-visible:underline"
              >
                [X] Close Transmission
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
