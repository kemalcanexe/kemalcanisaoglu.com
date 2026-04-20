'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown, Building2, GraduationCap, Megaphone } from 'lucide-react'

interface Role {
  id: string
  company: string
  role: string
  period: string
  type: string
  icon: React.ReactNode
  accentColor: string
  bgColor: string
  darkBg: string
  borderColor: string
  darkBorder: string
  summary: string
  highlights: string[]
  tags: string[]
}

const roles: Role[] = [
  {
    id: 'icron',
    company: 'ICRON Technologies',
    role: 'Technical Product Management Intern',
    period: 'Jun 2024 – Aug 2024',
    type: 'Industry',
    icon: <Building2 size={16} />,
    accentColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50',
    darkBg: 'dark:bg-indigo-950/50',
    borderColor: 'border-indigo-200',
    darkBorder: 'dark:border-indigo-800',
    summary:
      'Contributed to enterprise supply chain software across Demand Planning and Workforce Management modules, handling end-to-end product lifecycle tasks from technical design through UAT and delivery coordination.',
    highlights: [
      'Wrote technical design documents and API documentation for enterprise module features',
      'Developed internal UAT plans with structured test scenarios and clear acceptance criteria',
      'Mapped S&OP and forecasting workflows to support Demand Planning module delivery',
      'Coordinated task tracking and stakeholder communication through Azure DevOps',
      'Collaborated with engineering and client-facing teams under live enterprise project conditions',
      'Reviewed and aligned integration requirements across XML/JSON data structures',
    ],
    tags: ['Azure DevOps', 'UAT', 'API Documentation', 'S&OP', 'Forecasting', 'Technical Design', 'Demand Planning'],
  },
  {
    id: 'ra',
    company: 'Koç University',
    role: 'Resident Assistant',
    period: '2023 – 2025',
    type: 'University',
    icon: <GraduationCap size={16} />,
    accentColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50',
    darkBg: 'dark:bg-teal-950/50',
    borderColor: 'border-teal-200',
    darkBorder: 'dark:border-teal-800',
    summary:
      'Managed residential operations for a student floor — handling administrative coordination, conflict resolution, and student support across academic and personal challenges.',
    highlights: [
      'Maintained safety, policy adherence, and community standards for 30+ residents',
      'Acted as a direct communication channel between residents and university administration',
      'Organized regular community-building events and wellbeing check-ins',
      'Managed escalated concerns with discretion and structured follow-through',
    ],
    tags: ['Community Management', 'Communication', 'Problem-solving', 'Administration'],
  },
  {
    id: 'mentor',
    company: 'Koç University',
    role: 'Student Mentor — Freshman Program',
    period: '2023 – 2024',
    type: 'University',
    icon: <GraduationCap size={16} />,
    accentColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-50',
    darkBg: 'dark:bg-teal-950/50',
    borderColor: 'border-teal-200',
    darkBorder: 'dark:border-teal-800',
    summary:
      'Supported incoming students through their first-year transition by providing structured guidance on academic navigation, campus resources, and personal development.',
    highlights: [
      'Mentored a cohort of freshman students throughout their first semester',
      'Ran structured orientation sessions covering academic workflows and university systems',
      'Offered ongoing 1-on-1 guidance tailored to individual student needs',
    ],
    tags: ['Mentoring', 'Student Support', 'Guidance', 'Leadership'],
  },
  {
    id: 'markettalks',
    company: 'Marketing Club of Koç University',
    role: 'Head of MarketTalks Seminar Series',
    period: '2023 – 2024',
    type: 'Club',
    icon: <Megaphone size={16} />,
    accentColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50',
    darkBg: 'dark:bg-amber-950/50',
    borderColor: 'border-amber-200',
    darkBorder: 'dark:border-amber-800',
    summary:
      'Led the end-to-end planning and execution of the MarketTalks industry seminar series, managing speaker sourcing, event logistics, promotion, and live production.',
    highlights: [
      'Curated and managed speaker pipeline for multiple industry-focused seminar sessions',
      'Coordinated logistics, venues, promotion, and session moderation',
      'Oversaw cross-team collaboration between content, design, and operations sub-teams',
      'Maintained quality and consistency across the full event calendar',
    ],
    tags: ['Event Management', 'Speaker Curation', 'Project Coordination', 'Public Speaking'],
  },
  {
    id: 'external',
    company: 'Marketing Club of Koç University',
    role: 'Head of External Affairs',
    period: '2022 – 2023',
    type: 'Club',
    icon: <Megaphone size={16} />,
    accentColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50',
    darkBg: 'dark:bg-amber-950/50',
    borderColor: 'border-amber-200',
    darkBorder: 'dark:border-amber-800',
    summary:
      "Managed the club's institutional partnerships, external communications, and sponsor/collaborator relationships to expand the club's reach and resource base.",
    highlights: [
      'Built and maintained relationships with partner organizations and external stakeholders',
      'Negotiated collaborative agreements and sponsorship arrangements',
      'Represented the club in external forums and inter-club coordination',
    ],
    tags: ['External Relations', 'Partnerships', 'Stakeholder Management', 'Negotiation'],
  },
]

function ExperienceCard({ role, index, isInView }: { role: Role; index: number; isInView: boolean }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      className="relative pl-8"
    >
      <div className={`absolute left-0 top-5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-950 ring-2 ${role.bgColor} ${role.darkBg} ring-slate-200 dark:ring-slate-700 shadow-sm`} />

      <div
        className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-slate-900 cursor-pointer transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl ${role.bgColor} ${role.darkBg} ${role.accentColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                {role.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-base">{role.role}</h3>
                <p className={`text-sm font-medium ${role.accentColor}`}>{role.company}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{role.period}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${role.bgColor} ${role.darkBg} ${role.accentColor} border ${role.borderColor} ${role.darkBorder}`}>
                {role.type}
              </span>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={16} className="text-slate-400 dark:text-slate-500" />
              </motion.div>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{role.summary}</p>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="px-5 pb-5">
                <div className="h-px w-full bg-slate-100 dark:bg-slate-700 mb-4" />
                <ul className="space-y-2 mb-4">
                  {role.highlights.map((h, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${role.bgColor} ${role.darkBg}`}
                        style={{ background: undefined }}
                      />
                      {h}
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" ref={ref} className="py-24 px-6 md:px-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-indigo-300 dark:bg-indigo-600" />
            <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Experience</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Roles that shaped the way I work.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl">
            From enterprise product delivery at ICRON to building communities and events at Koç, each
            role has added a layer of real-world execution experience.
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className="absolute left-[6px] top-5 bottom-5 w-px bg-gradient-to-b from-indigo-200 dark:from-indigo-700 via-slate-200 dark:via-slate-700 to-slate-100 dark:to-slate-800"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
          <div className="space-y-6">
            {roles.map((role, i) => (
              <ExperienceCard key={role.id} role={role} index={i} isInView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
