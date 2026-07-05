import { Main, Nav } from './components/csr';
import { Analytics } from "@vercel/analytics/next"

export default function Home() {

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 font-sans selection:bg-emerald-500 selection:text-black relative overflow-x-hidden antialiased">
      {/* TOP TACTICAL HUD BAR */}
      <Analytics />
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

      <Main />

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
              href="https://www.instagram.com/rotfall.cc"
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