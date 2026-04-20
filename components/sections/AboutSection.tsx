'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const traits = [
  { label: 'Product-minded',        color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800' },
  { label: 'Analytically structured', color: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
  { label: 'Execution-focused',     color: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 border-teal-100 dark:border-teal-800' },
  { label: 'Technically literate',  color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800' },
  { label: 'Cross-functional',      color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border-amber-100 dark:border-amber-800' },
  { label: 'Strong communicator',   color: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 border-teal-100 dark:border-teal-800' },
  { label: 'High ownership',        color: 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-300 border-violet-100 dark:border-violet-800' },
  { label: 'Leadership-capable',    color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 border-amber-100 dark:border-amber-800' },
]

const stats = [
  { value: '5+', label: 'Roles & initiatives' },
  { value: '3',  label: 'Leadership positions' },
  { value: '3.05', label: 'GPA at Koç' },
  { value: '2',  label: 'Degrees (IE + CS)' },
]

function AboutIllustration() {
  return (
    <div className="relative w-full h-72 lg:h-full min-h-64">
      <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="20" width="280" height="240" rx="20" className="fill-slate-50 dark:fill-slate-800/60" />
        <circle cx="160" cy="140" r="32" className="fill-indigo-50 dark:fill-indigo-950/80" />
        <circle cx="160" cy="140" r="22" fill="#4F46E5" />
        <text x="160" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">KCI</text>
        {[
          { x: 70,  y: 70,  label: 'Product', lightBg: '#EEF2FF', darkBg: '#1e1b4b80', lightText: '#4F46E5', darkText: '#818CF8' },
          { x: 255, y: 65,  label: 'Data',    lightBg: '#F0FDFA', darkBg: '#0f2a2780', lightText: '#0D9488', darkText: '#2DD4BF' },
          { x: 60,  y: 210, label: 'Ops',     lightBg: '#FFFBEB', darkBg: '#2d1a0080', lightText: '#D97706', darkText: '#FCD34D' },
          { x: 250, y: 215, label: 'Tech',    lightBg: '#EDE9FE', darkBg: '#2d1b6980', lightText: '#7C3AED', darkText: '#A78BFA' },
        ].map((node, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.4, type: 'spring', bounce: 0.3 }}
          >
            <line x1={node.x + 16} y1={node.y + 16} x2="148" y2="130"
              stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.4" />
            <circle cx={node.x + 16} cy={node.y + 14} r="18" fill={node.lightBg} />
            <text x={node.x + 16} y={node.y + 18} textAnchor="middle"
              fill={node.lightText} fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif">
              {node.label}
            </text>
          </motion.g>
        ))}
        {[
          { x: 100, y: 42,  text: 'Requirements' },
          { x: 185, y: 42,  text: 'UAT' },
          { x: 95,  y: 238, text: 'Stakeholders' },
          { x: 183, y: 238, text: 'Delivery' },
        ].map((tag, i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.1 }}>
            <rect x={tag.x - 2} y={tag.y - 9} width={tag.text.length * 5.5 + 4} height="14"
              rx="4" fill="white" stroke="#E2E8F0" strokeWidth="1" fillOpacity="0.9" />
            <text x={tag.x + (tag.text.length * 5.5) / 2 - 2} y={tag.y}
              textAnchor="middle" fill="#64748B" fontSize="7.5" fontFamily="Inter, sans-serif">
              {tag.text}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
  })

  return (
    <section id="about" ref={ref} className="py-24 px-6 md:px-10 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-indigo-300 dark:bg-indigo-600" />
          <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Profile</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <AboutIllustration />
          </motion.div>

          <div>
            <motion.h2 {...fadeUp(0.15)} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-5">
              Where product thinking meets{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400">
                operational precision.
              </span>
            </motion.h2>

            <motion.p {...fadeUp(0.25)} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              I'm an Industrial Engineering and Computer Science student at Koç University, building
              toward roles where structured thinking and technical literacy create real delivery value.
              My work at ICRON Technologies grounded me in enterprise product workflows — from writing
              technical design documents and API specs to building UAT plans and coordinating across
              engineering and client teams.
            </motion.p>

            <motion.p {...fadeUp(0.32)} className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              I'm comfortable at the intersection of requirements and reality: translating complex
              enterprise needs into clear specifications, managing test scenarios, and ensuring
              acceptance criteria hold under actual conditions. Outside technical roles, three years
              of student leadership — including serving as Student Union President — have sharpened
              my ability to manage people, budgets, and processes under real organizational pressure.
            </motion.p>

            <motion.div {...fadeUp(0.38)} className="flex flex-wrap gap-2 mb-10">
              {traits.map((trait) => (
                <span key={trait.label} className={`px-3 py-1 rounded-full text-xs font-medium border ${trait.color}`}>
                  {trait.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
