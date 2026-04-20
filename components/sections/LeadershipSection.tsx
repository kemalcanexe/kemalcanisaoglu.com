'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Crown, TrendingUp, Users2 } from 'lucide-react'

const leadershipRoles = [
  {
    icon: <Crown size={22} />,
    title: 'President',
    org: 'Turkish Education Association Istanbul Representative Office',
    period: '2024 – 2025',
    badge: 'Highest office',
    badgeColor: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    accentColor: 'from-amber-500 to-orange-400',
    bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30',
    description: 'Served as the elected head of the Turkish Education Association Istanbul Representative Office. Held full institutional authority over budget, policy, team, and external relations.',
    impact: [
      'Led a cross-functional team managing institutional projects and city-wide initiatives',
      "Managed the organization's full annual budget and fundraising operations",
      'Represented members in administrative negotiations with institutional leadership',
      'Oversaw coordination across multiple sub-committees and working groups',
      'Ran formal reporting cycles, elections, and governance processes',
    ],
    proof: ['Budget authority', 'Team leadership', 'Institutional representation', 'Governance'],
  },
  {
    icon: <Users2 size={22} />,
    title: 'Vice President',
    org: 'Turkish Education Association Istanbul Representative Office',
    period: '2023 – 2024',
    badge: 'Executive',
    badgeColor: 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    accentColor: 'from-teal-500 to-cyan-400',
    bgGradient: 'from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/30',
    description: 'Supported executive-level operations as Vice President, taking on direct responsibility for cross-functional projects and acting as a coordination hub between teams and organizational leadership.',
    impact: [
      'Managed day-to-day coordination across multiple sub-teams and initiatives',
      'Stepped into decision-making authority when the President was unavailable',
      'Drove process improvements that increased team efficiency and project throughput',
      'Facilitated regular team standups, reviews, and communication flows',
    ],
    proof: ['Executive operations', 'Team coordination', 'Process ownership', 'Deputized leadership'],
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Board Member — Finance & Fundraising',
    org: 'Turkish Education Association Istanbul Representative Office',
    period: '2022 – 2023',
    badge: 'Board-level',
    badgeColor: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    accentColor: 'from-indigo-500 to-violet-500',
    bgGradient: 'from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/30',
    description: "Held board-level responsibility for the organization's financial health and fundraising strategy. Managed resource allocation, planned revenue initiatives, and ensured fiscal accountability across all activities.",
    impact: [
      'Owned the financial planning and reporting cycle for the organization',
      'Designed and executed fundraising campaigns to support programs',
      'Built relationships with sponsors and external funding sources',
      'Created financial dashboards and tracking tools for operational visibility',
    ],
    proof: ['Financial oversight', 'Fundraising', 'Resource planning', 'Accountability'],
  },
]

export default function LeadershipSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="leadership" ref={ref} className="py-24 px-6 md:px-10 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-amber-300 dark:bg-amber-600" />
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Leadership</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Leadership built through responsibility, not title.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Three years of progressively senior roles within the student union — from VP to Board Member
            to President — represent genuine institutional experience in managing people, processes, and
            resources under real organizational pressure.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {leadershipRoles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 + 0.2 }}
              className="group bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl dark:hover:shadow-slate-900 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${role.bgGradient} p-6 relative overflow-hidden`}>
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/30 dark:bg-white/5" />
                <div className="absolute -right-2 -bottom-4 w-16 h-16 rounded-full bg-white/20 dark:bg-white/5" />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.accentColor} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg leading-tight mb-1">{role.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{role.org}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{role.period}</p>
                <span className={`inline-block mt-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${role.badgeColor}`}>
                  {role.badge}
                </span>
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{role.description}</p>
                <ul className="space-y-2 mb-4">
                  {role.impact.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${role.accentColor} mt-1.5 flex-shrink-0`} />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700">
                  {role.proof.map((p) => (
                    <span key={p} className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700 rounded-2xl p-5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Crown size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">Progressive leadership across three years</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Moving from Board Member to Vice President to President at the Turkish Education Association
              Istanbul Representative Office reflects a clear pattern of demonstrated competence, peer trust,
              and increasing institutional responsibility — each level earned through performance, not appointment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
