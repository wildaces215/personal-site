"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface ShimmerButtonProps {
  children: React.ReactNode
  href: string
  className?: string
  variant?: "primary" | "secondary"
}

export default function ShimmerButton({
  children,
  href,
  className,
  variant = "primary",
}: ShimmerButtonProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  if (variant === "secondary") {
    return (
      <a
        href={href}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-zinc-100",
          className
        )}
      >
        {/* Shimmer */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129,140,248,0.15), transparent 70%)`,
          }}
        />
        <span className="relative z-10">{children}</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25",
        className
      )}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.2), transparent 70%)`,
        }}
      />
      {/* Shine sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </a>
  )
}