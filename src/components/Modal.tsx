// src/components/Modal.tsx
'use client'
import { useEffect, useState } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    setTimeout(() => {
      onClose()
      setIsSuccess(false)
      setEmail('')
      setName('')
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles.closeButton} interactive`} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {!isSuccess ? (
          <>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                <span className={styles.titleLine}>Begin Your</span>
                <span className={styles.titleLine}>
                  <span className={styles.gradient}>Transformation</span>
                </span>
              </h2>
              <p className={styles.modalSubtitle}>
                Join the future of intelligent design
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`${styles.input} interactive`}
                  placeholder=" "
                />
                <label className={`${styles.label} interactive`}>Your Name</label>
                <div className={styles.inputLine}></div>
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${styles.input} interactive`}
                  placeholder=" "
                />
                <label className={`${styles.label} interactive`}>Email Address</label>
                <div className={styles.inputLine}></div>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} interactive`}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'INITIATING...' : 'ENTER THE FUTURE'}</span>
                {isSubmitting && <div className={styles.loader}></div>}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Welcome to the Future</h3>
            <p>Prepare for transformation</p>
          </div>
        )}
      </div>
    </div>
  )
}