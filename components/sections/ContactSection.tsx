'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, MapPin, ArrowUpRight, FileText } from 'lucide-react'

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'kisaoglu22@ku.edu.tr', /* Replace with actual email */
    href: 'mailto:kisaoglu22@ku.edu.tr', /* Replace with actual email */
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    border: 'border-indigo-100 dark:border-indigo-800',
    hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-950',
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/kemalcanisaoglu', /* Replace with actual LinkedIn URL */
    href: 'https://linkedin.com/in/kemalcanisaoglu', /* Replace with actual LinkedIn URL */
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/60',
    border: 'border-blue-100 dark:border-blue-800',
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-950',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'Sarıyer, Istanbul',
    href: null,
    color: 'text-teal-600 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-950/60',
    border: 'border-teal-100 dark:border-teal-800',
    hoverBg: '',
  },
]

function FloatingAccent({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none opacity-60 dark:opacity-20"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" ref={ref} className="py-24 px-6 md:px-10 bg-white dark:bg-slate-900 relative overflow-hidden">
      <FloatingAccent x="5%" y="20%" size={120} color="#EEF2FF" delay={0} />
      <FloatingAccent x="85%" y="60%" size={90} color="#F0FDFA" delay={2} />
      <FloatingAccent x="60%" y="10%" size={70} color="#FFFBEB" delay={4} />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-indigo-300 dark:bg-indigo-600" />
          <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">Contact</span>
          <div className="h-px w-8 bg-indigo-300 dark:bg-indigo-600" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 text-center mb-4">
          Open to the right opportunity.
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 dark:text-slate-400 text-center leading-relaxed mb-12 max-w-xl mx-auto">
          I'm actively seeking roles in technical product management, product operations,
          and strategy & operations — environments where structured thinking, technical
          literacy, and cross-functional coordination create real delivery value.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          className="grid sm:grid-cols-3 gap-4 mb-8">
          {contactLinks.map((link, i) => (
            <motion.div key={link.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}>
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-2 p-5 rounded-2xl border ${link.bg} ${link.border} ${link.hoverBg} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm text-center`}
                >
                  <div className={`w-10 h-10 rounded-xl ${link.bg} ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{link.label}</div>
                    <div className={`text-sm font-semibold ${link.color} mt-0.5 break-all`}>{link.value}</div>
                  </div>
                  <ArrowUpRight size={12} className={`${link.color} opacity-60`} />
                </a>
              ) : (
                <div className={`flex flex-col items-center gap-2 p-5 rounded-2xl border ${link.bg} ${link.border} text-center`}>
                  <div className={`w-10 h-10 rounded-xl ${link.bg} ${link.color} flex items-center justify-center`}>
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{link.label}</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{link.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.55 }}
          className="flex justify-center">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-3.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold rounded-2xl hover:bg-indigo-600 dark:hover:bg-white transition-all duration-300 shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900 hover:-translate-y-0.5"
          >
            <FileText size={18} className="group-hover:rotate-6 transition-transform duration-300" />
            Download Full CV
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-xs text-slate-400 dark:text-slate-500 mt-12">
          Kemal Can İsaoğlu · Koç University · Istanbul, Turkey
        </motion.p>
      </div>
    </section>
  )
}
