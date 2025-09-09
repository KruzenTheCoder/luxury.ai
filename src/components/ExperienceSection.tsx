'use client'
import { useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
  // Keep ref nullable
  const sectionRef = useRef<HTMLElement>(null)

  // Cast to satisfy TypeScript if your hook requires non-nullable
  const { progress } = useScrollAnimation(sectionRef as React.RefObject<HTMLElement>)

  const words = ['Design', 'Without', 'Limits']

  return (
    <section ref={sectionRef} id="experience" className={styles.experienceSection}>
      <div className={styles.stickyContainer}>
        <div className={styles.experienceContent}>
          <h2 
            className={styles.experienceTitle}
            style={{
              opacity: Math.min(progress * 2, 1),
              transform: `scale(${0.8 + progress * 0.2})`
            }}
          >
            Experience the Extraordinary
          </h2>
          <div className={styles.experienceWords}>
            {words.map((word, index) => {
              const wordProgress = Math.min(
                Math.max((progress - 0.3 - index * 0.1) * 3, 0), 
                1
              )
              
              return (
                <div key={index} className={styles.wordContainer}>
                  <span 
                    className={styles.word}
                    style={{
                      opacity: wordProgress,
                      transform: `translateY(${100 - wordProgress * 100}px) scale(${0.8 + wordProgress * 0.2})`,
                      filter: `blur(${10 - wordProgress * 10}px)`
                    }}
                  >
                    {word}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
