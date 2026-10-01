import type { CSSProperties } from 'react'
import { appLog, infraLog } from '../data/logs'

const column = 'side-log pointer-events-none fixed top-14 bottom-0 hidden overflow-hidden xl:block'
const text = 'font-mono text-[0.6875rem] leading-5 whitespace-pre text-slate-300 select-none dark:text-slate-700'

/** Cópias da lista: a faixa sobe exatamente uma cópia e recomeça, sem emenda visível. */
const COPIES = [0, 1, 2, 3]

function LogColumn({ lines, seconds, className }: { lines: string[]; seconds: number; className: string }) {
  return (
    <div aria-hidden="true" className={`${column} ${text} ${className}`}>
      <div className="side-log-track" style={{ '--log-time': `${seconds}s` } as CSSProperties}>
        {COPIES.map((copy) => (
          <div key={copy}>
            {lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Decoração das margens em telas largas: linhas de log subindo devagar dos dois
// lados do conteúdo, bem apagadas. Ficam presas à tela, não rolam com a página,
// e somem no celular, em telas estreitas e na impressão.
// Cada coluna encosta no conteúdo e tem no máximo 22rem de largura.
export function SideLogs() {
  return (
    <>
      <LogColumn
        lines={appLog}
        seconds={95}
        className="right-[calc(50%+26rem)] left-[max(1.5rem,calc(50%-48rem))]"
      />
      <LogColumn
        lines={infraLog}
        seconds={120}
        className="right-[max(1.5rem,calc(50%-48rem))] left-[calc(50%+26rem)]"
      />
    </>
  )
}
