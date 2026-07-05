# Rotfall — Landing Page

A single-file React landing page for **Rotfall**, a co-op horror survival game. Dark, atmospheric theme with an animated ember/fog background, cursor-reactive lantern glow, and scroll-triggered reveals.

## Files

| File | Purpose |
|---|---|
| `rotfall-landing.tsx` | **Use this one.** Fully typed TypeScript component for your actual project. |
| `rotfall-landing-preview.jsx` | Same design with types stripped — only exists so the page could be live-previewed in chat. Not needed for your project. |

## Tech stack / requirements

- React 18+
- TypeScript
- [`lucide-react`](https://lucide.dev/) for icons
- A bundler that handles CSS-in-JS via a `<style>` tag (Vite, Next.js, CRA all work fine — no CSS framework required, no Tailwind)
- Internet access at build/runtime for the Google Fonts `@import` (Playfair Display, Manrope, Inter, JetBrains Mono) — self-host the fonts instead if you need it to work offline

## Setup

```bash
npm install lucide-react
```

Drop `rotfall-landing.tsx` into your project (e.g. `src/components/RotfallLanding.tsx`) and render it:

```tsx
import RotfallLanding from './components/RotfallLanding';

export default function App() {
  return <RotfallLanding />;
}
```

## Known issue: `lucide-react` CommonJS/ESM error

If Vite throws something like:

```
[vite] Named export 'Instagram' not found. The requested module 'lucide-react' is a CommonJS module...
```

This is a dependency resolution issue, not a code issue. Fix, in order of likelihood:

1. **Clean reinstall** (usually fixes it):
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. **Force Vite to pre-bundle it** — add to `vite.config.ts`:
   ```ts
   export default defineConfig({
     optimizeDeps: { include: ['lucide-react'] },
   });
   ```
   Then clear Vite's cache and restart: `rm -rf node_modules/.vite && npm run dev`
3. **Check for duplicate installs** (common in monorepos):
   ```bash
   npm ls lucide-react
   ```
4. **Fallback workaround** if nothing else works:
   ```ts
   import pkg from 'lucide-react';
   const { Instagram, MessageCircle } = pkg;
   ```

## What's placeholder and needs replacing before launch

- **Wishlist on Steam** buttons — currently `href="#"` with `preventDefault()`. Point these at your real Steam store page once it's live.
- **Discord** button/icon — same, currently a placeholder `#` link. Add your real invite link.
- **itch.io link** — currently points to `https://royaleyourdad.itch.io/`, your existing profile. Confirm this is the URL you want linked (e.g. if you'd rather link directly to the Backrooms: The Abyss page instead of the profile root).
- **Copyright year** in the footer is hardcoded to 2026 — update as needed.

## Structure overview

- `ParticleField` — canvas-based ember animation, confined to the hero section. Automatically disables continuous motion for users with `prefers-reduced-motion` set.
- `Reveal` — scroll-triggered fade/scale-in wrapper using `IntersectionObserver`, used around each section.
- `MagneticLink` — wraps CTA buttons/links with a subtle cursor-following hover effect.
- Sections: Hero → The Loop (timeline) → Field Manual (features) → Specimen Log → Dev Log → Follow/CTA → Footer.

All copy is based on the actual v1 game scope (single underground facility, 2-4 players, one regular zombie type, one boss) — update the content directly in the JSX if the scope changes.

## Customization

All design tokens (colors, fonts) are defined as CSS custom properties at the top of the `<style>` block under `.rotfall-page`, e.g.:

```css
--amber: #e0a458;   /* primary accent / lantern glow */
--blood: #c04252;   /* danger / classified accent */
--bone: #f2ede1;    /* primary text */
```

Change these to retheme the whole page without touching component markup.