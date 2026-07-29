"use client"

import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "../../lib/utils"

interface NavLink {
  label: string
  href: string
}

export default function FloatingNav({ links }: { links: NavLink[] }) {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return
    // Show nav when at top or scrolling up
    setVisible(current < 0.05 || scrollYProgress.getVelocity() < 0)
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2"
      >
        <nav className="flex items-center gap-1 rounded-full border border-zinc-700/50 bg-zinc-950/80 px-2 py-2 shadow-2xl backdrop-blur-xl sm:gap-2 sm:px-3">
          {/* Logo */}
          <a
            href="#"
            className="rounded-full px-3 py-1.5 font-mono text-sm font-semibold text-zinc-100 transition-colors hover:text-indigo-400"
          >
            ./craig
          </a>
          {/* Links */}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "hidden rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800/50 hover:text-zinc-100 md:block"
              )}
            >
              {link.label}
            </a>
          ))}
          {/* CTA */}
          <a
            href="#contact"
            className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <span className="hidden sm:inline">Get in touch</span>
            <span className="sm:hidden">→</span>
          </a>
        </nav>
      </motion.div>
    </AnimatePresence>
  )
}