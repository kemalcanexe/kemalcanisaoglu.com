'use client'

import { motion } from 'framer-motion'

function FloatWrapper({ delay, amplitude, children }: {
  delay?: number
  amplitude?: number
  children: React.ReactNode
}) {
  const amp = amplitude ?? 12
  const d = delay ?? 0
  return (
    <motion.div
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration: 5 + d * 0.4, repeat: Infinity, ease: 'easeInOut', delay: d }}
    >
      {children}
    </motion.div>
  )
}

export default function HeroIllustration() {
  return (
    <div className="relative w-full h-full min-h-[480px] select-none">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-indigo-100/60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-100/50 blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />

      {/* SVG connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path d="M240 200 L120 120" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }} />
        <motion.path d="M240 200 L360 120" stroke="#99F6E4" strokeWidth="1.5" strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }} />
        <motion.path d="M240 280 L110 370" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }} />
        <motion.path d="M240 280 L370 370" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="5 4"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }} />
        {[
          { cx: 180, cy: 160, color: '#A5B4FC' },
          { cx: 300, cy: 160, color: '#6EE7B7' },
          { cx: 175, cy: 325, color: '#FCD34D' },
          { cx: 305, cy: 325, color: '#C4B5FD' },
        ].map((dot, i) => (
          <motion.circle key={i} cx={dot.cx} cy={dot.cy} r="3.5" fill={dot.color}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.3 }} />
        ))}
      </svg>

      {/* Central Hub Card */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-52 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="8" y="1" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="1" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="8" y="8" width="5" height="5" rx="1" fill="white" fillOpacity="0.5" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800">Product Hub</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Requirements', pct: 88, color: 'bg-indigo-500' },
              { label: 'Testing', pct: 72, color: 'bg-teal-500' },
              { label: 'Delivery', pct: 95, color: 'bg-amber-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] text-slate-500">{item.label}</span>
                  <span className="text-[10px] font-medium text-slate-700">{item.pct}%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-slate-500">Enterprise delivery active</span>
          </div>
        </div>
      </motion.div>

      {/* Top-left: Requirements card */}
      <motion.div
        className="absolute top-4 left-2 w-40 z-10"
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <FloatWrapper delay={0} amplitude={10}>
          <div className="bg-white rounded-xl border border-indigo-100 shadow-md p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 2h8M1 5h6M1 8h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-indigo-700">Requirements</span>
            </div>
            <div className="space-y-1">
              {['Technical Design', 'API Docs', 'Spec Review'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-indigo-300" />
                  <span className="text-[9px] text-slate-500">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </FloatWrapper>
      </motion.div>

      {/* Top-right: Analytics card */}
      <motion.div
        className="absolute top-4 right-0 w-40 z-10"
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <FloatWrapper delay={1.5} amplitude={9}>
          <div className="bg-white rounded-xl border border-teal-100 shadow-md p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-md bg-teal-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 8L3.5 4.5L6 6.5L9 2" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-teal-700">Analytics</span>
            </div>
            <div className="flex gap-1 items-end h-8 mt-1">
              {[3, 5, 4, 7, 6, 8, 7].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-teal-200 rounded-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 4}px` }}
                  transition={{ delay: 1.8 + i * 0.05, duration: 0.4, ease: 'easeOut' }}
                />
              ))}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 block">S&OP Forecast</span>
          </div>
        </FloatWrapper>
      </motion.div>

      {/* Bottom-left: UAT card */}
      <motion.div
        className="absolute bottom-4 left-0 w-44 z-10"
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <FloatWrapper delay={0.8} amplitude={11}>
          <div className="bg-white rounded-xl border border-amber-100 shadow-md p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-amber-700">UAT</span>
            </div>
            <div className="space-y-1">
              {[
                { label: 'Test Scenarios', done: true },
                { label: 'Acceptance Criteria', done: true },
                { label: 'Sign-off', done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm border flex-shrink-0 ${item.done ? 'bg-amber-400 border-amber-400' : 'border-slate-200'}`}>
                    {item.done && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FloatWrapper>
      </motion.div>

      {/* Bottom-right: Coordination card */}
      <motion.div
        className="absolute bottom-4 right-0 w-40 z-10"
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <FloatWrapper delay={2} amplitude={8}>
          <div className="bg-white rounded-xl border border-violet-100 shadow-md p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded-md bg-violet-100 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="3" cy="3" r="1.5" fill="#7C3AED" fillOpacity="0.8" />
                  <circle cx="7" cy="3" r="1.5" fill="#7C3AED" fillOpacity="0.8" />
                  <circle cx="5" cy="7" r="1.5" fill="#7C3AED" fillOpacity="0.8" />
                  <path d="M3 3L5 7M7 3L5 7M3 3L7 3" stroke="#7C3AED" strokeWidth="0.8" strokeOpacity="0.5" />
                </svg>
              </div>
              <span className="text-[10px] font-semibold text-violet-700">Coordination</span>
            </div>
            <div className="flex -space-x-1.5 mb-1.5">
              {['ENG', 'BIZ', 'OPS'].map((t, i) => (
                <div
                  key={t}
                  className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[7px] font-bold"
                  style={{
                    background: ['#EEF2FF', '#F0FDFA', '#FFFBEB'][i],
                    color: ['#4F46E5', '#0D9488', '#F59E0B'][i],
                  }}
                >
                  {t[0]}
                </div>
              ))}
            </div>
            <span className="text-[9px] text-slate-400">Cross-functional sync</span>
          </div>
        </FloatWrapper>
      </motion.div>

      {/* Mini status badge */}
      <motion.div
        className="absolute top-[45%] right-2 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.4, type: 'spring', bounce: 0.4 }}
      >
        <div className="bg-emerald-500 text-white text-[9px] font-semibold px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
          Azure DevOps ✓
        </div>
      </motion.div>
    </div>
  )
}
