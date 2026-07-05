'use client';
import { motion } from 'framer-motion';
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
import { Nav } from './components/nav';
import { CSR } from './components/csr';
import { Loop } from './components/loop';

// ──────────────────────────────────────────────────────────────
// STATIC DATA
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────
export default function Home() {``

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

        <Nav />

        <button
          type="button"
          className="px-4 py-2 font-mono text-xs tracking-wider uppercase border border-emerald-500/30 rounded text-emerald-400 bg-emerald-950/20 hover:bg-emerald-500 hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
          aria-label="Access terminal"
        >
          Terminal Access
        </button>
      </header>

      <main>
        <CSR />
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

                <Loop />
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
              {`FIELD_MANUAL`.map((feature, idx) => (
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