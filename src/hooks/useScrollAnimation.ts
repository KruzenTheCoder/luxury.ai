// src/hooks/useScrollAnimation.ts
'use client'
import { useEffect, useState, RefObject } from 'react'

export function useScrollAnimation(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = element.offsetHeight
      
      // Calculate progress (0 to 1)
      const scrollProgress = Math.min(
        Math.max(-rect.top / (elementHeight - windowHeight), 0), 
        1
      )
      
      setProgress(scrollProgress)
      setIsInView(rect.top < windowHeight && rect.bottom > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return { progress, isInView }
}