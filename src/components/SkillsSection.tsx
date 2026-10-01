import type { CV } from '../data/types'
import { line } from '../lib/reveal'
import { Section } from './Section'

export function SkillsSection({ cv }: { cv: CV }) {
  return (
    <Section id="skills" title={cv.ui.sections.skills} command={`cat ${cv.ui.files.skills}`}>
      <dl className="space-y-3 print:space-y-1">
        {cv.skills.map((skill, i) => (
          <div key={i} style={line(i)} className="out grid gap-0.5 sm:grid-cols-[12rem_1fr] sm:gap-4 print:grid-cols-[10rem_1fr]">
            <dt className="font-mono text-[0.8125rem] text-blue-700 sm:pt-0.5 dark:text-sky-300 print:text-slate-600">
              {skill.group}
            </dt>
            <dd className="leading-relaxed text-slate-800 dark:text-slate-200 print:leading-snug">{skill.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
