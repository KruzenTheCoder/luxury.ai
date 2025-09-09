// src/app/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import ParticleField from '@/components/ParticleField'
import ScrollProgress from '@/components/ScrollProgress'
import ExperienceSection from '@/components/ExperienceSection'
import AnimatedSection from '@/components/AnimatedSection'
import styles from './page.module.css'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.className = styles.ripple
      ripple.style.left = e.clientX + 'px'
      ripple.style.top = e.clientY + 'px'
      document.body.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }

    // Magnetic button effect
    const magneticArea = document.querySelector(`.${styles.magneticArea}`)
    const magneticButton = document.querySelector(`.${styles.magneticButton}`)
    
    if (magneticArea && magneticButton) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = magneticArea.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        ;(magneticButton as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      }
      
      const handleMouseLeave = () => {
        ;(magneticButton as HTMLElement).style.transform = 'translate(0, 0)'
      }
      
      magneticArea.addEventListener('mousemove', handleMouseMove as any)
      magneticArea.addEventListener('mouseleave', handleMouseLeave)
      
      return () => {
        magneticArea.removeEventListener('mousemove', handleMouseMove as any)
        magneticArea.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Preloader />
      <Cursor />
      <ParticleField />
      <ScrollProgress />

      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>LUXURY.AI</div>
          <ul className={styles.navLinks}>
            <li><a href="#vision" data-text="Vision">Vision</a></li>
            <li><a href="#craft" data-text="Craft">Craft</a></li>
            <li><a href="#experience" data-text="Experience">Experience</a></li>
          </ul>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.floatingShapes}>
          <div className={styles.shape}></div>
          <div className={styles.shape}></div>
          <div className={styles.shape}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <div className={styles.titleLine} style={{ '--line': 0 } as React.CSSProperties}>
              <span>Where Intelligence</span>
            </div>
            <div className={styles.titleLine} style={{ '--line': 1 } as React.CSSProperties}>
              <span>Becomes Art</span>
            </div>
          </h1>
          <p className={styles.heroSubtitle}>NEXT-GENERATION DEVELOPER PLATFORM</p>
          <a href="#vision" className={styles.ctaButton}>
            <span>BEGIN YOUR JOURNEY</span>
          </a>
        </div>
        
        <div className={styles.scrollIndicator}>
          <svg viewBox="0 0 30 30">
            <path d="M15 5 L15 20 M10 15 L15 20 L20 15" />
          </svg>
        </div>
      </section>

      <section id="vision" className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              The Future is <span className={styles.gradientText}>Intelligent</span>
            </h2>
          </AnimatedSection>
          <div className={styles.features}>
            {[
              {
                number: '01',
                icon: '◈',
                title: 'Adaptive Evolution',
                description: 'Self-learning algorithms that evolve with every interaction, creating increasingly sophisticated and personalized experiences.'
              },
              {
                number: '02',
                icon: '✦',
                title: 'Seamless Precision',
                description: 'Every element meticulously crafted where luxury meets functionality in perfect harmonic balance.'
              },
              {
                number: '03',
                icon: '◆',
                title: 'Infinite Canvas',
                description: 'Break free from constraints. Our platform transforms imagination into reality without boundaries.'
              }
            ].map((feature, index) => (
              <AnimatedSection key={index}>
                <div className={styles.featureCard} style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className={styles.featureNumber}>{feature.number}</span>
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ExperienceSection />

      <section className={styles.statementSection}>
        <div className={styles.statementBg}></div>
        <AnimatedSection>
          <div className={styles.statementText}>
            <span className={styles.statementLine} style={{ '--i': 0 } as React.CSSProperties}>
              We believe in a world where
            </span>
            <span className={styles.statementLine} style={{ '--i': 1 } as React.CSSProperties}>
              technology and artistry converge
            </span>
            <span className={styles.statementLine} style={{ '--i': 2 } as React.CSSProperties}>
              to create <span className={styles.gradientText}>extraordinary experiences</span>
            </span>
          </div>
        </AnimatedSection>
      </section>

      <section id="craft" className={styles.section}>
        <div className={styles.container}>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>
              Meticulously <span className={styles.gradientText}>Crafted</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className={styles.gallery3d}>
              <div className={styles.galleryGrid}>
                {['Vision', 'Precision', 'Innovation', 'Excellence', 'Elegance', 'Intelligence', 'Simplicity', 'Perfection'].map((title, i) => (
                  <div 
                    key={i} 
                    className={styles.galleryItem} 
                    style={{ '--i': i } as React.CSSProperties}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = ((e.clientX - rect.left) / rect.width) * 100
                      const y = ((e.clientY - rect.top) / rect.height) * 100
                      e.currentTarget.style.setProperty('--x', `${x}%`)
                      e.currentTarget.style.setProperty('--y', `${y}%`)
                    }}
                  >
                    <div className={styles.galleryContent}>
                      <h3>{title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.finalCta}>
        <AnimatedSection>
          <h2 className={styles.ctaTitle}>
            Ready to <span className={styles.gradientText}>Transcend</span>?
          </h2>
          <div className={styles.magneticArea}>
            <a href="#" className={styles.magneticButton}>ENTER THE FUTURE</a>
          </div>
        </AnimatedSection>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>LUXURY.AI © 2025</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '1rem' }}>
            Where Tomorrow Begins Today
          </p>
        </div>
      </footer>
    </>
  )
}