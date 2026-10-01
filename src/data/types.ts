export type Locale = 'pt' | 'en'

export interface Highlight {
  value: string
  label: string
}

export interface ExperienceItem {
  title: string
  /** Texto com trechos em **negrito**. */
  description: string
  stack: string[]
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  items: ExperienceItem[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface Education {
  title: string
  institution: string
  status: string
  done: boolean
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url: string
}

export interface Language {
  name: string
  level: string
  source: string
}

/** As seções do currículo. Cada chave é também o id da seção na página. */
export type SectionKey =
  | 'contact'
  | 'summary'
  | 'highlights'
  | 'experience'
  | 'skills'
  | 'education'
  | 'certifications'
  | 'languages'

export interface CV {
  meta: {
    title: string
    description: string
  }
  role: string
  location: string
  summary: string
  highlights: Highlight[]
  experience: Experience[]
  skills: SkillGroup[]
  education: Education[]
  certifications: Certification[]
  languages: Language[]
  ui: {
    sections: {
      summary: string
      highlights: string
      experience: string
      skills: string
      education: string
      certifications: string
      languages: string
    }
    /** Nome de arquivo de cada seção, usado nos comandos do terminal (sem acentos). */
    files: Record<SectionKey, string>
    /** Rótulo do menu de seções (a saída do `ls`). */
    sectionsNav: string
    /** Textos do terminal interativo no fim da página. */
    shell: {
      label: string
      hint: string
      /** Pares [comando, descrição] mostrados pelo `help`. */
      help: [string, string][]
      notFound: string
      noSuchFile: string
      usage: string
      opening: string
      sudo: string
    }
    downloadPdf: string
    savePdf: string
    toggleTheme: string
    switchLanguage: string
    viewCredential: string
    contact: string
    updatedAt: string
    footerNote: string
  }
}
