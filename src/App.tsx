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
      {/* Brilho azul decorativo no topo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--color-blue-500)_14%,transparent),transparent)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--color-blue-500)_22%,transparent),transparent)] print:hidden"
      />

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
