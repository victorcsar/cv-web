# cv-web

Currículo online de **Víctor César da Rocha Bastos**, desenvolvedor Full Stack / DevOps. O conteúdo vem da versão em LaTeX do currículo ([victorcsar/curriculo](https://github.com/victorcsar/curriculo)).

- Português e inglês (o link `?lang=en` abre direto em inglês)
- Tema escuro por padrão, com opção de tema claro (a escolha do visitante fica salva)
- Responsivo, do celular ao desktop
- Versão de impressão em A4: o botão **Salvar PDF** abre a impressão do navegador já formatada como currículo

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4 e lucide-react.

## Rodando localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Atualizando o conteúdo

Todo o texto fica em `src/data/`:

| Arquivo | Conteúdo |
| --- | --- |
| `profile.ts` | Nome, e-mail, LinkedIn, GitHub e caminho do PDF |
| `cv.pt.ts` | Currículo em português |
| `cv.en.ts` | Currículo em inglês |
| `types.ts` | Formato dos dados. Se faltar um campo em um dos idiomas, o TypeScript acusa |

Trechos entre `**asteriscos**` aparecem em negrito, como o `\textbf{}` do LaTeX.

### PDF para download

1. Compile o `main.tex` e coloque o PDF em `public/`, por exemplo `public/curriculo-victor-cesar.pdf`
2. Em `src/data/profile.ts`, troque `pdfUrl: null` por `pdfUrl: '/curriculo-victor-cesar.pdf'`

O botão passa de **Salvar PDF** (impressão) para **Baixar PDF**.

### Domínio, prévia do link e SEO

- O endereço público fica em `.env` (`VITE_SITE_URL`) e é usado nas meta tags do `index.html`: canonical, Open Graph, Twitter e dados estruturados.
- `public/robots.txt` e `public/sitemap.xml` têm o endereço escrito direto; se o domínio mudar, atualize os dois também.
- A imagem de prévia (`public/og-image.png`, 1200×630) e o ícone da tela inicial (`public/apple-touch-icon.png`) saem de um script. Depois de trocar a foto ou o cargo, gere de novo:

```bash
npm run images
```

Para testar a prévia depois de publicar: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) (também limpa o cache do LinkedIn) e [opengraph.xyz](https://www.opengraph.xyz/).

## Deploy na Vercel

1. Suba o repositório para o GitHub
2. Na Vercel, clique em **Add New → Project** e importe o repositório
3. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`). Não precisa de nenhuma configuração extra
4. Cada push na branch principal publica uma nova versão; cada pull request ganha um link de prévia
