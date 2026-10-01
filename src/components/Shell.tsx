import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { profile } from '../data/profile'
import { sectionKeys } from '../data/sections'
import type { CV, Locale, SectionKey } from '../data/types'
import type { Theme } from '../hooks/useTheme'
import { reveal, revealNow, typed } from '../lib/reveal'
import { PromptPrefix } from './Section'

/** Uma linha da saída: texto simples ou um par [comando, descrição] (usado pelo `help`). */
type OutputLine = string | [string, string]

interface Entry {
  id: number
  command: string
  output: OutputLine[]
}

interface ShellProps {
  cv: CV
  onLocaleChange: (locale: Locale) => void
  theme: Theme
  onToggleTheme: () => void
}

const MAX_ENTRIES = 30

const links: Record<string, { text: string; href: string }> = {
  linkedin: { text: profile.linkedin.replace('https://www.', ''), href: profile.linkedin },
  github: { text: profile.github.replace('https://', ''), href: profile.github },
  email: { text: profile.email, href: `mailto:${profile.email}` },
}

// O prompt do fim da página, que aceita comandos de verdade: `help`, `ls`,
// `cat <arquivo>`, `open linkedin`, `lang en`, `theme`, `pdf`...
// É um extra: tudo o que ele faz também está nos links e botões do site.
export function Shell({ cv, onLocaleChange, theme, onToggleTheme }: ShellProps) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  /** Posição ao navegar pelos comandos anteriores com as setas. */
  const recall = useRef<number | null>(null)
  /** Depois de um comando que rola a página, o campo não deve puxar a tela de volta. */
  const stayPut = useRef(false)

  const { shell, files } = cv.ui

  useEffect(() => {
    if (entries.length === 0 || stayPut.current) return
    inputRef.current?.scrollIntoView({ block: 'nearest' })
  }, [entries])

  function findSection(name: string): SectionKey | undefined {
    const wanted = name.toLowerCase()
    return sectionKeys.find((key) => {
      const file = files[key]
      return wanted === key || wanted === file || wanted === file.replace(/\.\w+$/, '')
    })
  }

  /** Executa um comando e devolve as linhas da saída (`null` limpa o terminal). */
  function run(input: string): OutputLine[] | null {
    const [name = '', ...args] = input.trim().split(/\s+/)
    const arg = (args[0] ?? '').toLowerCase()
    const usage = (text: string) => [`${shell.usage}: ${text}`]

    switch (name.toLowerCase()) {
      case '':
        return []

      case 'help':
        return shell.help

      case 'ls':
        return [sectionKeys.map((key) => files[key]).join('  ')]

      case 'whoami':
        return [profile.name, cv.role]

      case 'cat': {
        if (!arg) return usage(`cat <${files.summary}>`)
        const key = findSection(arg)
        if (!key) return [`cat: ${args[0]}: ${shell.noSuchFile}`]
        stayPut.current = true
        revealNow(key)
        document.getElementById(key)?.scrollIntoView()
        return []
      }

      case 'top':
        stayPut.current = true
        window.scrollTo({ top: 0 })
        return []

      case 'open': {
        const link = links[arg]
        if (!link) return usage('open <linkedin|github|email>')
        if (arg === 'email') window.location.href = link.href
        else window.open(link.href, '_blank', 'noopener')
        return [`${shell.opening} ${link.text}…`]
      }

      case 'lang':
        if (arg !== 'pt' && arg !== 'en') return usage('lang <pt|en>')
        onLocaleChange(arg)
        return [`lang: ${arg}`]

      case 'theme': {
        if (arg && arg !== 'dark' && arg !== 'light') return usage('theme [dark|light]')
        const next = theme === 'dark' ? 'light' : 'dark'
        if (arg === theme) return [`theme: ${theme}`]
        onToggleTheme()
        return [`theme: ${next}`]
      }

      case 'pdf':
        // Depois de mostrar a linha: a janela de impressão trava a página enquanto está aberta.
        window.setTimeout(() => {
          if (profile.pdfUrl) window.open(profile.pdfUrl, '_blank', 'noopener')
          else window.print()
        }, 150)
        return [`${shell.opening} PDF…`]

      case 'clear':
        return null

      case 'sudo':
        return [shell.sudo]

      default:
        return [`${name}: ${shell.notFound}`]
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const command = value.trim()
    stayPut.current = false
    const output = run(command)
    recall.current = null
    setValue('')
    setEntries((prev) =>
      output === null ? [] : [...prev, { id: nextId.current++, command, output }].slice(-MAX_ENTRIES),
    )
  }

  // Setas para cima e para baixo percorrem os comandos já digitados.
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    const past = entries.map((entry) => entry.command).filter(Boolean)
    if (past.length === 0) return
    event.preventDefault()

    const step = event.key === 'ArrowUp' ? -1 : 1
    const index = (recall.current ?? past.length) + step
    if (index >= past.length) {
      recall.current = null
      setValue('')
      return
    }
    recall.current = Math.max(index, 0)
    setValue(past[recall.current])
  }

  return (
    <div ref={reveal} style={typed('')} className="term">
      <div className="prompt font-mono text-base leading-7 sm:text-sm sm:leading-6">
        <div role="log" aria-live="polite" aria-label={shell.label}>
          {entries.map((entry) => (
            <div key={entry.id} className="mb-2">
              <p className="break-words">
                <PromptPrefix />
                <span className="text-slate-900 dark:text-white">{entry.command}</span>
              </p>
              {entry.output.map((item, i) =>
                typeof item === 'string' ? (
                  <p key={i} className="break-words whitespace-pre-wrap text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                ) : (
                  <p key={i} className="grid sm:grid-cols-[17rem_1fr] sm:gap-4">
                    <span className="text-blue-700 dark:text-sky-300">{item[0]}</span>
                    <span className="pl-4 text-slate-600 sm:pl-0 dark:text-slate-300">{item[1]}</span>
                  </p>
                ),
              )}
            </div>
          ))}
        </div>

        {/* O texto é 16px no celular: abaixo disso o iPhone dá zoom ao focar o campo. */}
        <form onSubmit={handleSubmit}>
          <label className="flex cursor-text items-baseline border-b border-transparent focus-within:border-sky-500/40">
            <PromptPrefix />
            {!focused && value === '' && <span aria-hidden="true" className="cursor mr-2 self-center text-sky-600 dark:text-sky-400" />}
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label={shell.label}
              placeholder={shell.hint}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              className="min-w-0 flex-1 bg-transparent p-0 text-slate-900 caret-sky-500 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
            />
          </label>
        </form>
      </div>
    </div>
  )
}
