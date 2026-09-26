import { Wrench } from 'lucide-react'
import type { CV } from '../data/types'
import { cardClass, Section, Tag } from './Section'

export function SkillsSection({ cv }: { cv: CV }) {
  return (
    <Section id="skills" title={cv.ui.sections.skills} icon={Wrench}>
      <dl className={`${cardClass} divide-y divide-slate-200/80 dark:divide-slate-800 print:divide-y-0 print:border-0`}>
        {cv.skills.map((skill) => (
          <div
            key={skill.group}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 print:grid-cols-[9rem_1fr] print:gap-2 print:px-0 print:py-0.5"
          >
            <dt className="text-sm font-semibold text-slate-900 sm:pt-0.5 dark:text-white print:text-xs">{skill.group}</dt>
            <dd className="flex flex-wrap gap-1.5 print:gap-x-2 print:gap-y-0">
              {skill.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
