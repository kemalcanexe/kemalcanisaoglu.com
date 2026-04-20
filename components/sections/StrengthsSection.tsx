'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, TestTube2, Users, BarChart3, Workflow, MessageSquare, Trophy } from 'lucide-react'

const strengths = [
  {
    icon: <FileText size={20} />,
    title: 'Product Documentation',
    description: 'Technical design docs, API documentation, feature specifications, and requirement artifacts that connect business intent to engineering reality.',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    accent: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-100 dark:border-indigo-900',
    glow: 'hover:shadow-indigo-100 dark:hover:shadow-indigo-950',
    dot: 'bg-indigo-400',
  },
  {
    icon: <TestTube2 size={20} />,
    title: 'UAT & Testing',
    description: 'Structured test plans with clear acceptance criteria, test scenarios mapped to requirements, and systematic defect tracking through to sign-off.',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
    accent: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-100 dark:border-teal-900',
    glow: 'hover:shadow-teal-100 dark:hover:shadow-teal-950',
    dot: 'bg-teal-400',
  },
  {
    icon: <Users size={20} />,
    title: 'Cross-Functional Coordination',
    description: 'Working at the intersection of engineering, business, and operations — translating across contexts, aligning teams, and keeping delivery on track.',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
    accent: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-100 dark:border-violet-900',
    glow: 'hover:shadow-violet-100 dark:hover:shadow-violet-950',
    dot: 'bg-violet-400',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Data & Analysis',
    description: 'Comfortable with Python (pandas, NumPy), SQL, Excel, and statistical methods. Applied to forecasting, S&OP workflows, and data-informed product decisions.',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    accent: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-900',
    glow: 'hover:shadow-amber-100 dark:hover:shadow-amber-950',
    dot: 'bg-amber-400',
  },
  {
    icon: <Workflow size={20} />,
    title: 'Optimization & Operations Research',
    description: 'Supply chain modeling, linear/nonlinear programming, and operations research methods using CPLEX, Gurobi, and PuLP — grounded in Industrial Engineering coursework.',
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    accent: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-200 dark:border-slate-700',
    glow: 'hover:shadow-slate-100 dark:hover:shadow-slate-900',
    dot: 'bg-slate-400',
  },
  {
    icon: <MessageSquare size={20} />,
    title: 'Stakeholder Communication',
    description: 'Clear, structured communication between technical and business stakeholders. Experience presenting updates, managing expectations, and running coordinated reviews.',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
    accent: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-100 dark:border-teal-900',
    glow: 'hover:shadow-teal-100 dark:hover:shadow-teal-950',
    dot: 'bg-teal-400',
  },
  {
    icon: <Trophy size={20} />,
    title: 'Leadership & Ownership',
    description: 'Three formal leadership roles at the student union level, plus event leadership across two club positions. Takes ownership early and follows through on complex, multi-person initiatives.',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    accent: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-100 dark:border-indigo-900',
    glow: 'hover:shadow-indigo-100 dark:hover:shadow-indigo-950',
    dot: 'bg-indigo-400',
  },
]

export default function StrengthsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="strengths" ref={ref} className="py-24 px-6 md:px-10 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-teal-300 dark:bg-teal-600" />
            <span className="text-xs font-semibold text-teal-500 dark:text-teal-400 uppercase tracking-widest">Core Strengths</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            What I bring to the table.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400">
            A set of complementary capabilities that span the full product and operations lifecycle —
            from requirements to delivery, analysis to communication.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.07 + 0.2 }}
              className={`group relative bg-white dark:bg-slate-800/50 rounded-2xl border ${s.border} p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${s.glow} cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {s.icon}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-sm leading-snug">{s.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.description}</p>
              <div className={`absolute bottom-0 left-5 right-5 h-0.5 rounded-full ${s.dot} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-50`} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: strengths.length * 0.07 + 0.2 }}
            className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 rounded-2xl p-5 text-white"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2 text-sm">The through-line</h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Across these capabilities, the common thread is clarity — bringing structure to ambiguity,
              precision to communication, and reliability to execution. The kind of profile that makes
              product and operations teams move faster and more confidently.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
