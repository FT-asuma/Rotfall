'use client';

import React, { useState, useCallback, memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// STATIC DATA
// ──────────────────────────────────────────────────────────────
const LOOP_STEPS = [
  { step: '01', title: 'Scavenge & Secure', desc: 'Harvest vital tech fragments and raw ammo caches from hostile domains.' },
  { step: '02', title: 'Reinforce Node', desc: 'Fortify grid outposts and construct barricades before the daylight dies.' },
  { step: '03', title: 'Endure the Purge', desc: 'Defend against non-linear waves of otherworldly horrors that morph to counter you.' },
];

const FIELD_MANUAL = [
  { icon: Map, title: 'Unforgiving Terrain', desc: 'A sprawling, desolate landscape. Dynamic anomalies alter layouts across server sessions, rendering memorization impossible.' },
  { icon: Users, title: 'Symmetric Networking', desc: 'High-fidelity architecture ensures flawless synchronization of atmospheric world states, heavy projectiles, and hitboxes.' },
  { icon: Skull, title: 'Sanity Mechanics', desc: 'Prolonged dark exposure degrades vitals. Failing sanity indexes create tactile visual hallucinations that mimic real threats.' },
];

const SPECIMENS = [
  {
    id: '#089-STK',
    className: 'CLASS IV // STALKER',
    color: 'emerald',
    title: 'The Blight Stalker',
    desc: 'Operates exclusively within obscured tree lines. Avoids direct fire by shifting vectors instantly. Emits a mechanical clicking sound just before lunging.',
  },
  {
    id: '#412-RPT',
    className: 'CLASS VI // APEX',
    color: 'red',
    title: 'The Carrion Titan',
    desc: 'A hulking, multi-limbed atmospheric entity targeting core base infrastructure. Requires coordinated heavy ammunition deployment to safely bring down.',
  },
];

const DEV_LOGS = [
  {
    label: 'LATEST PUSH',
    title: 'C# Networking & 4-Player Synchronization',
    desc: 'Rewrote the core C# packet handling logic for the dedicated server layer. Hitbox desync during high-stress entity spawns has been virtually eliminated. The 2-4 player co-op framework is now stable across varying latency thresholds, allowing seamless drop-in/drop-out mechanics.',
    active: true,
  },
  {
    label: 'PREVIOUS',
    title: 'Unity Animation Controllers & Rigging',
    desc: 'Completed the transition pipeline from Blender to Unity for the Class IV Stalker models. The inverse kinematics (IK) rigging allows the entity\'s limbs to dynamically adjust to the procedural terrain, making its movements over barricades significantly more terrifying and physically grounded.',
    active: false,
  },
];

// ──────────────────────────────────────────────────────────────
// ANIMATION VARIANTS (Moved outside component for Type Safety & Performance)
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// OPTIMIZED PARTICLES COMPONENT (Hydration-Safe)
// ──────────────────────────────────────────────────────────────
type ParticleData = { id: number; left: string; top: string; delay: string; duration: string };

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
      }))
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
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  );
});
Particles.displayName = 'Particles';

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────
export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
    <div className="min-h-screen bg-[#030303] text-slate-200 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden antialiased">
      
      {/* TOP TACTICAL HUD BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-8 py-4 border-b border-emerald-950/40 bg-[#030303]/80 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-emerald-500 font-bold hidden sm:block">
            System // Active
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest text-slate-400" aria-label="Main navigation">
          <a href="#loop" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">01 / The Loop</a>
          <a href="#manual" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">02 / Field Manual</a>
          <a href="#specimens" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">03 / Specimens</a>
          <a href="#devlog" onClick={handleScroll} className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">04 / Dev Log</a>
        </nav>

        <button
          type="button"
          className="px-4 py-2 font-mono text-xs tracking-wider uppercase border border-emerald-500/30 rounded text-emerald-400 bg-emerald-950/20 hover:bg-emerald-500 hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
          aria-label="Access terminal"
        >
          Terminal Access
        </button>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/80 to-[#030303]" aria-hidden="true" />
          <Particles />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 w-full max-w-5xl mx-auto pt-20"
          >
            <div className="inline-flex items-center gap-2 border border-emerald-500/20 rounded-full bg-emerald-950/30 backdrop-blur-sm px-4 py-1.5 text-xs text-emerald-400 tracking-widest uppercase font-mono mb-8">
              <Radio className="w-3 h-3 animate-pulse" /> Signal Acquired // Pre-Alpha v0.4.2
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-[11rem] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-600 to-[#050505] drop-shadow-[0_0_60px_rgba(16,185,129,0.3)] select-none">
              Rotfall
            </h1>

            <p className="mt-8 text-lg sm:text-xl md:text-2xl font-light tracking-wide text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
              Survive the unimaginable. An open-world fantastical horror experience.
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
              animate={{ opacity: 1, height: 'auto' }}
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

        {/* SECTION 1: THE LOOP */}
        <section id="loop" className="relative z-10 px-4 md:px-8 py-24 md:py-40 bg-[#050505] scroll-mt-[80px]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp}
                className="w-full lg:w-1/2 space-y-6"
              >
                <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                  {/* Removed 'ease: "linear"' string to avoid type issues, default is fine */}
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4 }}>
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                  Protocol Data // 01
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">The Survival Cycle</h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                  In <span className="text-emerald-400 font-semibold">Rotfall</span>, progress is violently extracted from the environment. The gameplay loop demands tight synergy and unyielding resource management:
                </p>

                <div className="space-y-4 pt-6">
                  {LOOP_STEPS.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 p-5 md:p-6 border border-emerald-950/60 rounded-xl bg-[#030303] hover:border-emerald-500/30 transition-colors">
                      <div className="text-emerald-500 font-mono font-bold text-xl">{item.step}/</div>
                      <div>
                        <h4 className="text-slate-200 font-bold uppercase text-lg">{item.title}</h4>
                        <p className="text-slate-500 text-sm md:text-base mt-2">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="p-8 md:p-12 border border-emerald-500/20 rounded-3xl bg-gradient-to-br from-[#0a1a12] to-[#030303] relative overflow-hidden group shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                  <div className="absolute top-0 right-0 p-4 font-mono text-8xl md:text-[12rem] font-black text-emerald-950/20 select-none leading-none opacity-50" aria-hidden="true">LOOP</div>
                  <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/30 text-emerald-400">
                      <ShieldAlert className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-white">Cooperative Synergy</h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                      Splitting up guarantees elimination. Built meticulously for 2-4 players, you must synchronize your radar trackers and manage collective sanity to survive the night cycle.
                    </p>
                    <div className="h-px bg-emerald-900/40 w-full my-6" aria-hidden="true" />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs md:text-sm font-mono text-emerald-500 gap-2">
                      <span className="bg-emerald-950/50 px-3 py-1 rounded">THREAT MATRIX: CRITICAL</span>
                      <span>OP_STATUS // ALIVE</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FIELD MANUAL */}
        <section id="manual" className="relative z-10 px-4 md:px-8 py-24 md:py-40 bg-[#070707] border-y border-emerald-950/40 scroll-mt-[80px]">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
              <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-500 flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4" /> Tactical Operations // 02
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Field Operations Manual</h2>
              <p className="text-slate-400 text-lg md:text-xl">Master the environmental controls critical to navigating the exclusion vectors.</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {FIELD_MANUAL.map((feature, idx) => (
                <motion.div key={idx} variants={fadeUp} className="p-8 md:p-10 border border-emerald-950/60 rounded-2xl bg-[#030303] hover:bg-[#050a08] hover:border-emerald-500/40 transition-all duration-500 group shadow-lg">
                  <feature.icon className="w-12 h-12 md:w-14 md:h-14 mb-8 text-emerald-800 group-hover:text-emerald-400 transition-colors duration-500" />
                  <h3 className="text-2xl font-bold uppercase mb-4 text-slate-100">{feature.title}</h3>
                  <p className="text-slate-400 text-base leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: SPECIMENS */}
        <section id="specimens" className="relative z-10 px-4 md:px-8 py-24 md:py-40 bg-[#030303] overflow-hidden scroll-mt-[80px]">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-color-dodge"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')" }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
              <div>
                <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Containment Logs // 03
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mt-4">Classified Specimens</h2>
              </div>
              <p className="text-slate-400 max-w-md text-base md:text-lg">Anomalous lifeforms documented within sector bounds. High containment priority.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {SPECIMENS.map((spec, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="p-6 md:p-8 border border-emerald-950/60 rounded-2xl bg-[#050505]/90 backdrop-blur-md flex flex-col sm:flex-row gap-8 hover:border-emerald-500/30 transition-all duration-300">
                  <div className={`w-full sm:w-48 h-48 bg-gradient-to-br from-${spec.color}-950/50 to-${spec.color}-900/10 border border-${spec.color}-500/20 rounded-xl flex items-center justify-center relative overflow-hidden shrink-0 shadow-inner`}>
                    <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(${spec.color === 'emerald' ? '16,185,129' : '239,68,68'},0.15),transparent)] animate-pulse`} />
                    <span className={`font-mono text-${spec.color}-500 text-xs md:text-sm tracking-widest uppercase`}>No Visual // [X]</span>
                  </div>
                  <div className="space-y-4 w-full">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-bold text-${spec.color}-400 px-3 py-1 border border-${spec.color}-500/30 bg-${spec.color}-500/10 rounded`}>{spec.className}</span>
                      <span className="text-xs font-mono text-slate-600">{spec.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 uppercase">{spec.title}</h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">{spec.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: DEV LOG */}
        <section id="devlog" className="relative z-10 px-4 md:px-8 py-24 md:py-40 border-t border-emerald-950/40 bg-gradient-to-b from-[#050505] to-[#030303] scroll-mt-[80px]">
          <div className="max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20 md:mb-28 space-y-4">
              <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-emerald-500 flex items-center justify-center gap-2">
                <Binary className="w-4 h-4" /> Engineering Feeds // 04
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Development Log</h2>
              <p className="text-slate-400 text-lg md:text-xl">Chronicles of technical systems engineering and implementation.</p>
            </motion.div>

            <div className="relative border-l border-emerald-900/50 ml-4 md:ml-40 space-y-16 md:space-y-24">
              {DEV_LOGS.map((log, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-12 group">
                  <div className={`absolute -left-[7px] top-2 w-3 h-3 rounded-full ${log.active ? 'bg-emerald-500 border border-black shadow-[0_0_15px_rgba(16,185,129,0.8)]' : 'bg-[#030303] border-2 border-emerald-800'}`} />
                  <div className="absolute -left-48 top-0 text-sm font-mono text-slate-500 hidden md:block w-32 text-right pt-1">
                    {log.label}
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-emerald-400 tracking-wider block md:hidden">{log.label}</span>
                    <h3 className="text-2xl font-bold text-slate-100 uppercase">{log.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed max-w-2xl">{log.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-emerald-950/60 py-12 md:py-16 bg-[#030303] text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-8 font-mono text-xs md:text-sm text-slate-500">
          <p>© 2026 Rotfall Development. Secure line active.</p>

          <nav className="flex gap-8" aria-label="Social links">
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors uppercase tracking-widest border-b border-transparent hover:border-emerald-500 pb-1 focus-visible:outline-none focus-visible:underline"
            >
              [ Steam Wishlist ]
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors uppercase tracking-widest border-b border-transparent hover:border-emerald-500 pb-1 focus-visible:outline-none focus-visible:underline"
            >
              [ Instagram ]
            </a>
          </nav>

          <nav className="flex gap-6" aria-label="Secondary links">
            <a href="#" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:underline">INITIATIVE</a>
            <a href="#" className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:underline">MANIFEST</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}