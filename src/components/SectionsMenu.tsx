import { sectionKeys } from '../data/sections'
import type { CV } from '../data/types'
import { line, reveal, revealNow, typed } from '../lib/reveal'
import { Prompt } from './Section'

const COMMAND = 'ls'

// O menu do site: a saída de um `ls`, em que cada arquivo leva até a sua seção.
export function SectionsMenu({ cv }: { cv: CV }) {
  return (
    <nav ref={reveal} style={typed(COMMAND)} aria-label={cv.ui.sectionsNav} className="term py-7 print:hidden">
      <Prompt command={COMMAND} />
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.8125rem] sm:text-sm">
        {sectionKeys.map((key, i) => (
          <li key={key} style={line(i)} className="out">
            <a
              href={`#${key}`}
              onClick={() => revealNow(key)}
              className="text-slate-900 underline decoration-transparent underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:text-slate-100 dark:hover:text-sky-300 dark:hover:decoration-sky-400"
            >
              {cv.ui.files[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
