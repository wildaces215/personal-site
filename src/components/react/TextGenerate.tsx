"use client"

import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

interface TextGenerateProps {
  text: string
  className?: string
}

export default function TextGenerate({ text, className }: TextGenerateProps) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setDone(true)
      }
    }, 25)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span className={cn(className)}>
      {displayed}
      {!done && <span className="inline-block animate-pulse">▋</span>}
    </span>
  )
}