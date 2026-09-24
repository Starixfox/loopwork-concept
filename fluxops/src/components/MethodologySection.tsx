import { motion, type Variants } from 'framer-motion'
import { Crosshair, Network, Settings2, ArrowRight } from 'lucide-react'

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

interface Step {
  index: string
  icon: typeof Crosshair
  title: string
  text: string
}

const steps: Step[] = [
  {
    index: '01',
    icon: Crosshair,
    title: 'Diagnose',
    text: 'We map your bottlenecks — every manual hop, duplicated entry, and silent leak in the pipeline.',
  },
  {
    index: '02',
    icon: Network,
    title: 'Architect',
    text: 'We design the logic flows that turn your existing tools into a single, coherent system.',
  },
  {
    index: '03',
    icon: Settings2,
    title: 'Orchestrate',
    text: 'We deploy and monitor silently. You only notice the results — never the machinery.',
  },
]

export default function MethodologySection() {
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
          <span aria-hidden="true">// </span>Methodology
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl"
        >
          How It Works
        </motion.h2>
      </motion.div>

      {/* Grid of three glassmorphism cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-6"
      >
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <motion.article
              key={step.index}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-flux-border bg-flux-surface p-6 backdrop-blur-xl transition-all duration-300 hover:border-flux-accent/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(0,240,255,0.08)] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-flux-border bg-black/40 text-flux-accent transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-mono text-xs tracking-widest text-flux-muted/60">
                  {step.index}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-flux-muted">
                {step.text}
              </p>
              {/* Faint accent line at card base */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-flux-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.article>
          )
        })}
      </motion.div>

      {/* Closing CTA */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-20 flex flex-col items-center gap-6 text-center sm:mt-24"
      >
        <motion.h3
          variants={fadeUp}
          className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
        >
          Ready to quiet the noise?
        </motion.h3>
        <motion.a
          variants={fadeUp}
          href="#contact"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-flux-accent hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flux-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
        >
          Book Technical Audit
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </div>
  )
}
