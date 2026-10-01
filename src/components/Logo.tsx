import type { SVGProps } from 'react'

// Logo do site: um V em dois tons com um cursor de terminal, que pisca.
// A metade esquerda usa a cor do texto (currentColor), então acompanha o tema.
// Os arquivos originais ficam em design/logos (variação F3).
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="4 12 56 40" aria-hidden="true" {...props}>
      <polygon points="6,14 18,14 27,38 27,50 21,50" fill="currentColor" />
      <polygon points="27,38 36,14 48,14 33,50 27,50" fill="#3b82f6" />
      <rect x="44" y="42" width="14" height="8" rx="2" fill="#38bdf8" className="animate-blink" />
    </svg>
  )
}
