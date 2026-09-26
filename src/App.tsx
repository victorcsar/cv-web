import { CredentialsSection } from './components/CredentialsSection'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Hero } from './components/Hero'
import { SkillsSection } from './components/SkillsSection'
import { Toolbar } from './components/Toolbar'
import { profile } from './data/profile'
import { useLocale } from './hooks/useLocale'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { locale, cv, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative isolate min-h-dvh overflow-x-clip">
      {/* Luzes azuis no topo, se movendo devagar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden print:hidden">
        <div className="absolute -top-56 left-1/2 size-[38rem] -translate-x-[85%] animate-glow-a rounded-full bg-blue-500/15 blur-3xl dark:bg-blue-600/25" />
        <div className="absolute -top-40 left-1/2 size-[32rem] -translate-x-[5%] animate-glow-b rounded-full bg-sky-400/15 blur-3xl dark:bg-sky-500/15" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950" />
      </div>

      <Toolbar cv={cv} locale={locale} onLocaleChange={setLocale} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-5xl space-y-16 px-4 pb-16 sm:px-6 print:max-w-none print:space-y-5 print:px-0 print:pb-0">
        <Hero cv={cv} />
        <ExperienceSection cv={cv} />
        <SkillsSection cv={cv} />
        <EducationSection cv={cv} />
        <CredentialsSection cv={cv} />
      </main>

      <footer className="border-t border-slate-200/70 dark:border-slate-800/70 print:hidden">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {profile.shortName} · {cv.ui.updatedAt}
          </p>
          <p>{cv.ui.footerNote}</p>
        </div>
      </footer>
    </div>
  )
}
