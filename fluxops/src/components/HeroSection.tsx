import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Check, FileText, MessageSquare, Ticket } from 'lucide-react'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface SyncRow {
  icon: typeof FileText
  from: string
  to: string
}

const syncRows: SyncRow[] = [
  { icon: FileText, from: 'Invoice', to: 'Drive' },
  { icon: MessageSquare, from: 'Lead', to: 'Slack' },
  { icon: Ticket, from: 'Ticket', to: 'Notion' },
]

/** Floating glass mini-dashboard — "Live Sync". */
function LiveSyncCard() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay: 0.5 }}
      className="w-full max-w-sm rounded-2xl border border-flux-border bg-flux-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-white">
          Live Sync
        </h3>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-flux-accent">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-flux-accent" />
          Active
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {syncRows.map(({ icon: Icon, from, to }) => (
          <li
            key={`${from}-${to}`}
            className="flex items-center justify-between rounded-lg border border-flux-border/60 bg-black/30 px-3.5 py-3"
          >
            <span className="flex items-center gap-2.5 text-sm text-white/90">
              <Icon className="h-4 w-4 text-flux-muted" strokeWidth={1.5} aria-hidden="true" />
              {from}
              <ArrowRight className="h-3.5 w-3.5 text-flux-accent/80" strokeWidth={2} aria-hidden="true" />
              <span className="font-medium">{to}</span>
            </span>
            <span
              role="img"
              aria-label="Synced successfully"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-400"
            >
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-flux-muted">
        All systems nominal · 0 errors today
      </p>
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24">
      {/* Top-left status badge */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.25em] text-flux-accent sm:text-sm"
        >
          <span aria-hidden="true">// </span>System Status: Fragmented
        </motion.p>
      </motion.div>

      {/* Headline + subheadline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl"
      >
        <motion.h1
          variants={fadeUp}
          className="mt-10 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Stop managing tools.
          <br />
          <span className="text-white/60">Start orchestrating outcomes.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-flux-muted sm:text-lg"
        >
          We connect your existing ecosystem—CRM, Docs, Comms, Storage—into one
          silent, intelligent engine. No new apps. Just pure flow.
        </motion.p>
      </motion.div>

      {/* Bottom row: scroll hint (left) + floating Live Sync card (right) */}
      <div className="mt-14 flex flex-col-reverse items-start gap-8 lg:mt-0 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.7 }}
          className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-flux-muted md:flex"
          aria-hidden="true"
        >
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-flux-border">
            <motion.span
              className="mt-1.5 h-1.5 w-0.5 rounded-full bg-flux-accent"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          Scroll to restore order
        </motion.div>

        <div className="w-full lg:w-auto lg:self-end">
          <LiveSyncCard />
        </div>
      </div>
    </div>
  )
}
