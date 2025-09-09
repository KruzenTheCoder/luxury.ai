// src/components/Cursor.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const [isOverInteractive, setIsOverInteractive] = useState(false)

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
    const addHover = () => {
      cursorRef.current?.classList.add(styles.hover)
      setIsOverInteractive(true)
    }
    const removeHover = () => {
      cursorRef.current?.classList.remove(styles.hover)
      setIsOverInteractive(false)
    }
    
    // Update selector to include form elements
    const updateHoverElements = () => {
      const hoverElements = document.querySelectorAll('a, button, input, textarea, label, .interactive')
      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
      
      return () => {
        hoverElements.forEach(el => {
          el.removeEventListener('mouseenter', addHover)
          el.removeEventListener('mouseleave', removeHover)
        })
      }
    }
    
    // Initial setup
    const cleanup = updateHoverElements()
    
    // Re-run when DOM changes (for modal)
    const observer = new MutationObserver(() => {
      cleanup()
      updateHoverElements()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
      cleanup()
    }
  }, [])

  return (
    <div 
      ref={cursorRef} 
      className={`${styles.cursor} ${isOverInteractive ? styles.interactive : ''}`}
      style={{ pointerEvents: 'none' }}
    >
      <div className={styles.cursorDot}></div>
      <div className={styles.cursorRing}></div>
    </div>
  )
}