// Dados que não mudam entre idiomas.
export const profile = {
  name: 'Víctor César da Rocha Bastos',
  shortName: 'Víctor César',
  /** O nome como aparece no topo, uma linha por item. */
  nameLines: ['Víctor César', 'da Rocha Bastos'],
  email: 'victorcesagx@gmail.com',
  linkedin: 'https://www.linkedin.com/in/victorcesarbastos',
  github: 'https://github.com/victorcsar',
  /** Foto quadrada em `public/` (480×480). */
  photo: '/foto-perfil.jpg',
  /**
   * Caminho do PDF dentro de `public/` (ex.: '/curriculo-victor-cesar.pdf').
   * Enquanto for `null`, o botão abre a impressão do navegador, que já sai formatada como currículo.
   */
  pdfUrl: null as string | null,
}
