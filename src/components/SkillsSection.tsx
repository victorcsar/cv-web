import type { CV } from '../data/types'
import { dividerClass, Section } from './Section'

export function SkillsSection({ cv }: { cv: CV }) {
  return (
    <Section id="skills" title={cv.ui.sections.skills}>
      <dl className={dividerClass}>
        {cv.skills.map((skill, i) => (
          <div
            key={i}
            className="grid gap-1 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-4 print:grid-cols-[10rem_1fr] print:py-1"
          >
            <dt className="font-mono text-[0.8125rem] text-slate-500 sm:pt-0.5 dark:text-slate-400">{skill.group}</dt>
            <dd className="leading-relaxed text-slate-800 dark:text-slate-200 print:leading-snug">{skill.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
