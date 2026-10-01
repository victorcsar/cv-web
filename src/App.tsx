import { CredentialsSection } from './components/CredentialsSection'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Hero } from './components/Hero'
import { IntroSections } from './components/IntroSections'
import { SectionsMenu } from './components/SectionsMenu'
import { Shell } from './components/Shell'
import { SideLogs } from './components/SideLogs'
import { SkillsSection } from './components/SkillsSection'
import { Toolbar } from './components/Toolbar'
import { profile } from './data/profile'
import { useLocale } from './hooks/useLocale'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { locale, cv, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-dvh">
      <SideLogs />
      <Toolbar cv={cv} locale={locale} onLocaleChange={setLocale} theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-3xl px-5 sm:px-6 print:max-w-none print:px-0">
        <Hero cv={cv} />
        <SectionsMenu cv={cv} />
        <IntroSections cv={cv} />
        <ExperienceSection cv={cv} />
        <SkillsSection cv={cv} />
        <EducationSection cv={cv} />
        <CredentialsSection cv={cv} />
      </main>

      <footer className="mx-auto max-w-3xl px-5 pt-7 pb-10 sm:px-6 print:hidden">
        {/* O terminal fica esperando o próximo comando, e aceita comandos de verdade */}
        <Shell cv={cv} onLocaleChange={setLocale} theme={theme} onToggleTheme={toggleTheme} />
        <div className="mt-10 flex flex-col gap-1 border-t border-slate-200 pt-6 font-mono text-xs text-slate-500 sm:flex-row sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {profile.shortName} · {cv.ui.updatedAt}
          </p>
          <p>{cv.ui.footerNote}</p>
        </div>
      </footer>
    </div>
  )
}
