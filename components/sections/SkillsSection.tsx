'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Category = {
  id: string
  label: string
  color: string
  dotColor: string
  bg: string
  border: string
  skills: string[]
}

const categories: Category[] = [
  {
    id: 'product',
    label: 'Product & Delivery',
    color: 'text-indigo-600 dark:text-indigo-400',
    dotColor: 'bg-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/50',
    border: 'border-indigo-100 dark:border-indigo-900',
    skills: ['Requirements Analysis', 'Technical Design', 'UAT', 'Product Coordination', 'Documentation', 'Acceptance Criteria', 'Stakeholder Communication', 'Product Lifecycle'],
  },
  {
    id: 'data',
    label: 'Data & Analysis',
    color: 'text-teal-600 dark:text-teal-400',
    dotColor: 'bg-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-950/50',
    border: 'border-teal-100 dark:border-teal-900',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'SQL', 'PostgreSQL', 'MySQL', 'MS SQL Server', 'Statistics', 'Forecasting', 'Excel'],
  },
  {
    id: 'tools',
    label: 'Technical Tools',
    color: 'text-violet-600 dark:text-violet-400',
    dotColor: 'bg-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/50',
    border: 'border-violet-100 dark:border-violet-900',
    skills: ['Azure DevOps', 'Jira', 'Java', 'RabbitMQ', 'XML / JSON', 'LaTeX', 'Git'],
  },
  {
    id: 'optimization',
    label: 'Optimization',
    color: 'text-amber-600 dark:text-amber-400',
    dotColor: 'bg-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    border: 'border-amber-100 dark:border-amber-900',
    skills: ['CPLEX', 'Gurobi', 'PuLP', 'Linear Programming', 'Nonlinear Programming', 'Supply Chain Modeling', 'Operations Research'],
  },
  {
    id: 'leadership',
    label: 'Communication & Leadership',
    color: 'text-slate-600 dark:text-slate-400',
    dotColor: 'bg-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    border: 'border-slate-200 dark:border-slate-700',
    skills: ['Cross-functional Collaboration', 'Event Management', 'Public Speaking', 'Ownership', 'Stakeholder Management', 'Conflict Resolution', 'Mentoring'],
  },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const displayed = activeCategory ? categories.filter((c) => c.id === activeCategory) : categories

  return (
    <section id="skills" ref={ref} className="py-24 px-6 md:px-10 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-violet-300 dark:bg-violet-600" />
            <span className="text-xs font-semibold text-violet-500 dark:text-violet-400 uppercase tracking-widest">Skills</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Tools, methods, and domains.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400">
            A technically grounded, practically applied skill set spanning product delivery, data
            analysis, optimization, and organizational work.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === null
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.id
                  ? `${cat.bg} ${cat.color} ${cat.border}`
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="space-y-6">
          {displayed.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.08 + 0.3 }}
              layout
              className={`rounded-2xl border ${cat.border} overflow-hidden`}
            >
              <div className={`${cat.bg} px-5 py-3.5 flex items-center gap-2.5`}>
                <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                <span className={`text-sm font-semibold ${cat.color}`}>{cat.label}</span>
                <span className={`text-xs ${cat.color} opacity-60 ml-auto`}>{cat.skills.length} skills</span>
              </div>
              <div className="bg-white dark:bg-slate-800/40 px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: ci * 0.05 + si * 0.03 + 0.4 }}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/60 border border-slate-100 dark:border-slate-600 hover:border-slate-200 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
