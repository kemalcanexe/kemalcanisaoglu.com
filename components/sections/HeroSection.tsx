'use client'

import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import HeroIllustration from '@/components/illustrations/HeroIllustration'
import AnimatedBackground from '@/components/AnimatedBackground'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <AnimatedBackground />

      <div className="relative z-10 flex-1 flex items-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            <div className="max-w-xl">
              <motion.div {...fadeUp(0.1)} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Open to Product & Operations roles
                  <Sparkles size={12} className="opacity-70" />
                </span>
              </motion.div>

              <motion.p {...fadeUp(0.2)} className="text-base font-medium text-slate-500 dark:text-slate-400 mb-2 tracking-wide">
                Kemal Can İsaoğlu
              </motion.p>

              <motion.h1 {...fadeUp(0.3)} className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 dark:text-slate-50 leading-[1.12] tracking-tight mb-5">
                Product Thinking.{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-300">
                  Technical Structure.
                </span>{' '}
                Reliable Execution.
              </motion.h1>

              <motion.p {...fadeUp(0.4)} className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                IE & CS student at Koç University with hands-on experience in technical product
                management, UAT, documentation, and cross-functional delivery. I connect
                engineering and business to move products forward.
              </motion.p>

              <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#experience"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:-translate-y-0.5"
                >
                  View My Work
                  <ArrowDown size={16} />
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Download CV
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>

              <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-2">
                {[
                  { icon: <MapPin size={11} />, label: 'Sarıyer, Istanbul' },
                  { icon: null, label: 'Koç University · 2027' },
                  { icon: null, label: 'Full Merit Scholar' },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-slate-500 dark:text-slate-400 font-medium backdrop-blur-sm"
                  >
                    {chip.icon}
                    {chip.label}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative h-[480px] lg:h-[520px]"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
    </section>
  )
}
