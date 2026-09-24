# FluxOps — Cinematic Automation Agency Website

A pixel-perfect, cinematic landing page for an automation agency.
**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Lucide React.

> Design language: *Digital Alchemy* — turning scattered data into structured flow.
> Deep charcoal (#0a0a0a), electric cyan (#00f0ff), Inter + JetBrains Mono. No purple gradients.

## Run it

```bash
npm install        # deps are already installed in this workspace
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc) + production build to dist/
npm run preview    # serve the production build
```

## Structure

```
fluxops/
├── index.html                  # Inter + JetBrains Mono, meta, dark base
├── vite.config.ts              # @vitejs/plugin-react + @tailwindcss/vite
├── public/assets/
│   ├── flux-flow.mp4           # Hero scroll video (chaos → streams → cyan node graph)
│   ├── flux-poster.jpg         # First frame (scattered particles)
│   └── founder-portrait.jpg    # B&W founder portrait (available for About section)
└── src/
    ├── App.tsx                 # Root layout: bg z-0 / overlay z-5 / content z-10
    ├── index.css               # Tailwind v4 @theme tokens, .video-mask, .pulse-dot
    ├── hooks/
    │   ├── useScrollVideo.ts   # lerp-based scroll→currentTime scrubbing (+cleanup)
    │   └── useMediaQuery.ts    # responsive behavior switch
    └── components/
        ├── Navbar.tsx          # fixed glassmorphism nav + hexagon logo + CTA pill
        ├── VideoBackground.tsx # full-viewport scrubbed video / mobile poster parallax
        ├── HeroSection.tsx     # "// SYSTEM STATUS: FRAGMENTED", headline, Live Sync card
        ├── SolutionSection.tsx # "Invisible Infrastructure" + hover/click accordion rows
        ├── MethodologySection.tsx # Diagnose / Architect / Orchestrate glass cards + CTA
        └── Footer.tsx          # © 2026 FluxOps + LinkedIn / X links
```

## Scroll-scrub logic (critical path)

- `window.scrollY` is mapped to `video.currentTime` over the first ~85% of page scroll.
- Smoothing via linear interpolation each rAF frame:
  `current += (target - current) * 0.1` (tablet uses a gentler `0.05` → slower scrub).
- The `<video>` element is kept permanently paused; seeks are throttled to ≥15 ms deltas.
- All listeners (`scroll`, `resize`, `loadedmetadata`) and the rAF loop are disposed on unmount.
- **Mobile (<768px) & reduced-motion:** scrubbing disabled entirely — static poster with
  subtle Framer Motion parallax instead (battery/perf friendly).

## Accessibility

- `focus-visible` cyan rings on every interactive element.
- `aria-label` on the video, `aria-expanded`/`aria-controls` on accordion buttons.
- Semi-transparent black gradient overlays keep body text > 4.5:1 contrast against any frame.

## Responsive behavior

| Breakpoint | Experience |
|---|---|
| > 1024px | Full scroll-scrub, side-by-side hero layout, 3-col grid |
| 768–1024px | Reduced padding, slower scrub lerp, stacked hero card |
| < 768px | Static poster + parallax, stacked layouts, ≥48px touch targets |
