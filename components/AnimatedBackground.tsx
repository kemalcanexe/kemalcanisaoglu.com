'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

const shapes = [
  { type: 'circle', x: '5%',  y: '15%', size: 120, light: '#EEF2FF', dark: 'rgba(49,46,129,0.18)',  delay: 0,   dur: 22 },
  { type: 'circle', x: '88%', y: '8%',  size: 80,  light: '#F0FDFA', dark: 'rgba(15,42,39,0.22)',   delay: 3,   dur: 18 },
  { type: 'rect',   x: '75%', y: '55%', size: 60,  light: '#EEF2FF', dark: 'rgba(49,46,129,0.15)',  delay: 1.5, dur: 25 },
  { type: 'circle', x: '12%', y: '70%', size: 100, light: '#FFFBEB', dark: 'rgba(45,26,0,0.20)',    delay: 5,   dur: 20 },
  { type: 'rect',   x: '50%', y: '85%', size: 50,  light: '#F0FDFA', dark: 'rgba(15,42,39,0.18)',   delay: 2,   dur: 28 },
  { type: 'circle', x: '92%', y: '75%', size: 70,  light: '#FEF3C7', dark: 'rgba(45,26,0,0.18)',    delay: 4,   dur: 15 },
  { type: 'rect',   x: '30%', y: '5%',  size: 40,  light: '#EDE9FE', dark: 'rgba(45,27,105,0.22)',  delay: 1,   dur: 19 },
  { type: 'circle', x: '65%', y: '30%', size: 55,  light: '#E0F2FE', dark: 'rgba(12,34,58,0.22)',   delay: 6,   dur: 24 },
]

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? '#334155' : '#CBD5E1'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: isDark ? 0.18 : 0.3,
          transition: 'opacity 0.4s',
        }}
      />

      {/* Drifting shapes */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: isDark ? shape.dark : shape.light,
            borderRadius: shape.type === 'rect' ? '16px' : '50%',
            filter: 'blur(1px)',
            opacity: isDark ? 0.9 : 0.65,
            transition: 'background 0.4s, opacity 0.4s',
          }}
          animate={{ y: [0, -20, 0], x: [0, 8, 0], rotate: [0, 4, 0] }}
          transition={{ duration: shape.dur, repeat: Infinity, ease: 'easeInOut', delay: shape.delay }}
        />
      ))}

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${isDark ? '#020817' : '#ffffff'}, transparent)`,
          opacity: 0.7,
          transition: 'background 0.4s',
        }}
      />
    </div>
  )
}
