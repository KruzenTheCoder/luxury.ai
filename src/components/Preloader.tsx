// src/components/Preloader.tsx
'use client'
import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
  const [complete, setComplete] = useState(false)
  const [hidden, setHidden] = useState(false)
  
  useEffect(() => {
    const completeTimer = setTimeout(() => {
      setComplete(true)
    }, 2500)
    
    const hideTimer = setTimeout(() => {
      setHidden(true)
    }, 3500)
    
    return () => {
      clearTimeout(completeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (hidden) return null

  return (
    <div className={`${styles.preloader} ${complete ? styles.complete : ''}`}>
      <div className={styles.dnaLoader}>
        <div className={styles.dnaStrand}></div>
        <div className={styles.dnaStrand}></div>
      </div>
      <div className={styles.loaderText}>
        {'LUXURY.AI'.split('').map((char, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties}>
            {char}
          </span>
        ))}
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
    </div>
  )
}