'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award, Star } from 'lucide-react'

const education = [
  {
    institution: 'Koç University',
    location: 'Istanbul, Turkey',
    degrees: ['B.S. in Industrial Engineering', 'B.S. in Computer Science and Engineering'],
    period: '2022 – 2027 (Expected)',
    gpa: '3.05 / 4.00',
    highlight: 'Full Merit Scholarship',
    highlightColor: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    accentColor: 'from-indigo-500 to-violet-500',
    bg: 'from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/30',
    details: [
      'Double major: Industrial Engineering × Computer Science',
      'Full merit scholarship awarded on academic achievement',
      'Relevant coursework: Operations Research, Algorithms, Databases, Statistics, Optimization',
      'Three concurrent leadership roles while maintaining academic standing',
    ],
  },
  {
    institution: 'TED Konya College',
    location: 'Konya, Turkey',
    degrees: ['High School Diploma'],
    period: '2017 – 2022',
    gpa: '98.6 / 100',
    highlight: 'Full Education Scholarship',
    highlightColor: 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    accentColor: 'from-teal-500 to-cyan-400',
    bg: 'from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/30',
    details: [
      'Graduated with a GPA of 98.6/100',
      'Full scholarship throughout secondary education',
      'Academic excellence recognized consistently across all disciplines',
    ],
  },
]

export default function EducationSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" ref={ref} className="py-24 px-6 md:px-10 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-teal-300 dark:bg-teal-600" />
            <span className="text-xs font-semibold text-teal-500 dark:text-teal-400 uppercase tracking-widest">Education</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-3">
            Built on a strong academic foundation.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400">
            A double major combining systems thinking from Industrial Engineering with technical
            depth from Computer Science — at one of Turkey's most selective universities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 + 0.2 }}
              className="group bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg dark:hover:shadow-slate-900 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${edu.bg} p-6 relative overflow-hidden`}>
                <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/30 dark:bg-white/5" />
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.accentColor} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform`}>
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-xl mb-1">{edu.institution}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{edu.location}</p>
                {edu.degrees.map((deg) => (
                  <div key={deg} className="flex items-center gap-2 mb-1">
                    <div className={`w-1 h-1 rounded-full bg-gradient-to-br ${edu.accentColor}`} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{deg}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-slate-400 dark:text-slate-500">{edu.period}</span>
                </div>
              </div>

              <div className="px-6 py-4 bg-white dark:bg-transparent border-b border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">GPA</div>
                    <div className="text-base font-bold text-slate-800 dark:text-slate-100">{edu.gpa}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${edu.highlightColor}`}>
                  <Award size={11} />
                  {edu.highlight}
                </span>
              </div>

              <div className="px-6 py-4">
                <ul className="space-y-2">
                  {edu.details.map((d, j) => (
                    <motion.li key={j} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: j * 0.05 + 0.5 + i * 0.1 }}
                      className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 mt-1.5 flex-shrink-0" />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
