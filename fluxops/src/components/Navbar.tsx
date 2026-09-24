import { Hexagon } from 'lucide-react'

/** Simple brand mark — hexagon with an inner node graph. */
export function LogoMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center text-flux-accent ${className}`}>
      <Hexagon className="h-full w-full" strokeWidth={1.5} aria-hidden="true" />
      <span className="absolute h-1 w-1 rounded-full bg-flux-accent shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
    </span>
  )
}

interface NavLinkProps {
  href: string
  children: string
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium text-flux-muted transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      {children}
    </a>
  )
}

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-flux-border bg-flux-surface backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Left: logo */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70"
        >
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            FLUXOPS
          </span>
        </a>

        {/* Center: links (desktop) */}
        <div className="hidden items-center gap-1 md:flex" aria-label="Section navigation">
          <NavLink href="#philosophy">Philosophy</NavLink>
          <NavLink href="#workflows">Workflows</NavLink>
          <NavLink href="#results">Results</NavLink>
        </div>

        {/* Right: CTA */}
        <a
          href="#contact"
          className="inline-flex shrink-0 items-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-flux-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Audit Your Stack
        </a>
      </nav>
    </header>
  )
}
