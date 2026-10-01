import { profile } from '../data/profile'
import type { CV } from '../data/types'

// Topo da página: o nome em serifada grande, como o título de um documento.
export function Hero({ cv }: { cv: CV }) {
  return (
    <header
      id="top"
      className="flex flex-col-reverse gap-8 pt-12 pb-12 sm:flex-row sm:items-end sm:justify-between sm:pt-20 sm:pb-16 print:pt-0 print:pb-5"
    >
      <div className="animate-fade-up">
        <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white print:text-4xl">
          {profile.nameLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-5 font-mono text-sm text-blue-700 dark:text-blue-300 print:mt-3 print:text-blue-800">
          {cv.role}
          <span className="hidden text-slate-400 sm:inline dark:text-slate-600"> / </span>
          {/* No celular a cidade vai para a linha de baixo, em vez de quebrar no meio */}
          <span className="mt-1 block text-slate-500 sm:mt-0 sm:inline dark:text-slate-400">{cv.location}</span>
        </p>
      </div>

      <img
        src={profile.photo}
        alt={profile.name}
        width={480}
        height={480}
        style={{ animationDelay: '120ms' }}
        className="size-24 shrink-0 animate-fade-up rounded-sm object-cover sm:size-32 lg:size-40 print:hidden"
      />
    </header>
  )
}
