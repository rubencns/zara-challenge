'use client'

import { useEffect } from 'react'
import style from './error.module.css'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className={style.error}>
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <button type="button" onClick={reset} className={style.retryButton}>
        Try again
      </button>
    </main>
  )
}
