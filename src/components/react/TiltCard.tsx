"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "../../lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    x.set(e.clientX - rect.left - centerX)
    y.set(e.clientY - rect.top - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 transition-colors hover:border-zinc-700",
        className
      )}
    >
      {/* Glow on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-300",
          isHovered && "opacity-100"
        )}
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.1), transparent 70%)",
        }}
      />
      <div style={{ transform: "translateZ(30px)" }} className="relative">
        {children}
      </div>
    </motion.div>
  )
}