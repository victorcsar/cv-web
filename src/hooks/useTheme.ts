import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function readTheme(): Theme {
  // O script inline do index.html já aplicou a classe antes da primeira pintura.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  // A impressão sai sempre no tema claro.
  useEffect(() => {
    const before = () => document.documentElement.classList.remove('dark')
    const after = () => document.documentElement.classList.toggle('dark', theme === 'dark')
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // sem storage (aba anônima etc.): o tema só não fica salvo
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
