import { LogoMark } from './Navbar'

/** Brand glyphs (removed from lucide-react) as inline SVGs. */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: LinkedinIcon,
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com',
    icon: XIcon,
  },
]

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-flux-border bg-black/50 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        {/* Left: brand + copyright */}
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <a
            href="#top"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70"
            aria-label="FluxOps home"
          >
            <LogoMark className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-tight text-white">
              FLUXOPS
            </span>
          </a>
          <p className="text-sm text-flux-muted">
            © 2026 FluxOps. Automating the mundane.
          </p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-flux-border bg-flux-surface text-flux-muted transition-all duration-200 hover:border-flux-accent/40 hover:text-flux-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
