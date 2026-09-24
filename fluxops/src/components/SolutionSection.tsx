import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  FolderSearch,
  Radio,
  DatabaseBackup,
} from 'lucide-react'
import { useState } from 'react'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

interface Workflow {
  id: string
  icon: typeof FolderSearch
  title: string
  summary: string
  detail: string
}

const workflows: Workflow[] = [
  {
    id: 'file-intelligence',
    icon: FolderSearch,
    title: 'File Intelligence',
    summary: 'Every document finds its place — automatically.',
    detail:
      'Auto-sorting contracts, invoices, and assets into correct folders and tags the moment they arrive. No naming conventions to memorize, no shared-drive archaeology.',
  },
  {
    id: 'communication-routing',
    icon: Radio,
    title: 'Communication Routing',
    summary: 'Signals, not noise.',
    detail:
      'Smart alerts fire only when action is genuinely needed. Silence otherwise. Your team stops triaging pings and starts resolving exceptions.',
  },
  {
    id: 'data-harmony',
    icon: DatabaseBackup,
    title: 'Data Harmony',
    summary: 'One truth, everywhere it matters.',
    detail:
      'A single source of truth across Sales, Ops, and Finance. Numbers reconcile themselves; handoffs stop becoming translation errors.',
  },
]

function WorkflowRow({
  workflow,
  isOpen,
  onOpen,
  onToggle,
}: {
  workflow: Workflow
  isOpen: boolean
  onOpen: () => void
  onToggle: () => void
}) {
  const Icon = workflow.icon
  return (
    <div className="group border-b border-flux-border first:border-t">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`panel-${workflow.id}`}
        onClick={onToggle}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        className="flex w-full items-center justify-between gap-4 rounded-lg px-2 py-6 text-left transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70 sm:px-4 sm:py-7"
      >
        <span className="flex min-w-0 items-center gap-4 sm:gap-6">
          <Icon
            className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
              isOpen ? 'text-flux-accent' : 'text-flux-muted group-hover:text-white'
            }`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="block truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
              {workflow.title}
            </span>
            <span className="mt-0.5 block truncate text-sm text-flux-muted">
              {workflow.summary}
            </span>
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-flux-muted transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-flux-accent' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      <motion.div
        id={`panel-${workflow.id}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-3xl px-2 pb-6 pl-2 text-sm leading-relaxed text-flux-muted sm:px-4 sm:pb-7 sm:pl-[3.75rem] sm:text-base">
          {workflow.detail}
        </p>
      </motion.div>
    </div>
  )
}

export default function SolutionSection() {
  const [openId, setOpenId] = useState<string>(workflows[0].id)

  return (
    <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-3xl"
      >
        <motion.p
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.25em] text-flux-accent"
        >
          <span aria-hidden="true">// </span>The Clarity
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl"
        >
          Invisible Infrastructure.
          <br />
          <span className="text-flux-accent/90">Visible Results.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-base leading-relaxed text-flux-muted sm:text-lg"
        >
          Most businesses drown in tabs. We build the bridges between them. By
          leveraging your current stack as the central hub, we eliminate
          copy-paste culture, reduce human error, and give your team superpowers
          without changing their daily habits.
        </motion.p>
      </motion.div>

      {/* Accordion-style interactive rows */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.15 }}
        className="mt-14 rounded-2xl border border-flux-border bg-flux-surface px-2 backdrop-blur-md sm:mt-16 sm:px-6"
        role="region"
        aria-label="Workflow capabilities"
      >
        {workflows.map((w) => (
          <WorkflowRow
            key={w.id}
            workflow={w}
            isOpen={openId === w.id}
            onOpen={() => setOpenId(w.id)}
            onToggle={() =>
              setOpenId((current) => (current === w.id ? '' : w.id))
            }
          />
        ))}
      </motion.div>

      <a
        href="#contact"
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-flux-accent transition-all duration-200 hover:gap-3 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent/70 rounded-md"
      >
        See what flow looks like for your stack
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  )
}
