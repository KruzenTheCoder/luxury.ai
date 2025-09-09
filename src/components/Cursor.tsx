// src/components/Cursor.tsx
'use client'
import { useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const targetX = useRef(0)
  const targetY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX
      targetY.current = e.clientY
    }

    const animateCursor = () => {
      const dx = targetX.current - currentX.current
      const dy = targetY.current - currentY.current
      
      currentX.current += dx * 0.2
      currentY.current += dy * 0.2
      
      if (cursorRef.current) {
        cursorRef.current.style.left = currentX.current + 'px'
        cursorRef.current.style.top = currentY.current + 'px'
      }
      
      requestAnimationFrame(animateCursor)
    }

    document.addEventListener('mousemove', handleMouseMove)
    animateCursor()

    // Hover effects
    const addHover = () => cursorRef.current?.classList.add(styles.hover)
    const removeHover = () => cursorRef.current?.classList.remove(styles.hover)
    
    const hoverElements = document.querySelectorAll('a, button')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div className={styles.cursorDot}></div>
      <div className={styles.cursorRing}></div>
    </div>
  )
}