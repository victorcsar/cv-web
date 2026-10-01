import { profile } from '../data/profile'
import type { CV } from '../data/types'
import { line, reveal, typed } from '../lib/reveal'
import { Prompt } from './Section'

const COMMAND = 'whoami'

// Topo da página: o comando `whoami` é digitado e a resposta é o nome.
export function Hero({ cv }: { cv: CV }) {
  return (
    <header id="top" ref={reveal} style={typed(COMMAND)} className="term pt-10 pb-7 sm:pt-16 print:pt-0 print:pb-5">
      <Prompt command={COMMAND} />

      <div className="mt-5 flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between print:mt-0">
        <div>
          <h1
            style={line(0)}
            className="out font-mono text-3xl leading-tight font-medium tracking-tight text-slate-900 sm:text-5xl dark:text-white print:text-3xl"
          >
            {profile.nameLines.map((text) => (
              <span key={text} className="block">
                {text}
              </span>
            ))}
          </h1>
          <p style={line(1)} className="out mt-4 font-mono text-sm text-blue-700 dark:text-sky-300 print:mt-2 print:text-blue-800">
            {cv.role}
          </p>
          <p style={line(2)} className="out mt-1 font-mono text-sm text-slate-500 dark:text-slate-400">
            {cv.location}
          </p>
        </div>

        <img
          src={profile.photo}
          alt={profile.name}
          width={480}
          height={480}
          className="scan size-24 shrink-0 rounded-sm border border-slate-300 object-cover sm:size-32 dark:border-slate-700 print:hidden"
        />
      </div>
    </header>
  )
}
