import { useCallback, useEffect, useState } from 'react'
import { cvEn } from '../data/cv.en'
import { cvPt } from '../data/cv.pt'
import type { CV, Locale } from '../data/types'

const STORAGE_KEY = 'locale'
const content: Record<Locale, CV> = { pt: cvPt, en: cvEn }

function isLocale(value: unknown): value is Locale {
  return value === 'pt' || value === 'en'
}

// Prioridade: ?lang= na URL > escolha salva > idioma do navegador.
function initialLocale(): Locale {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLocale(fromUrl)) return fromUrl

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // storage indisponível
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value)
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const cv = content[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = cv.meta.title
    setMeta('meta[name="description"]', cv.meta.description)

    // Mantém o link compartilhável: a versão em inglês fica em ?lang=en.
    const url = new URL(window.location.href)
    if (locale === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(null, '', url)
  }, [locale, cv])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage indisponível
    }
  }, [])

  return { locale, cv, setLocale }
}
