// Gera as imagens estáticas do site: `npm run images`.
// - public/og-terminal.jpg: prévia do link no LinkedIn, WhatsApp etc. (1200×630, JPEG leve:
//   o WhatsApp no celular só mostra o cartão grande com imagem leve)
// - public/apple-touch-icon.png: ícone ao salvar o site na tela inicial do celular (180×180)
// - public/palestra/og-palestra.jpg: prévia do link da palestra em /palestra (1200×630)
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'
import sharp from 'sharp'

const PUBLIC = new URL('../public/', import.meta.url)
const WIDTH = 1200
const HEIGHT = 630
const MARGIN = 80

// Cores do site (tema escuro).
const BG = '#020617'
const WHITE = '#ffffff'
const BLUE = '#60a5fa'
const SKY = '#38bdf8'
const SKY_LIGHT = '#7dd3fc'
const MUTED = '#94a3b8'
const DIM = '#64748b'
const BORDER = '#334155'

// Geometria da logo (design/logos): V com cursor de terminal.
const V_FULL = '6,14 18,14 27,38 36,14 48,14 33,50 21,50'
const V_LEFT = '6,14 18,14 27,38 27,50 21,50'
const V_RIGHT = '27,38 36,14 48,14 33,50 27,50'
const CURSOR = 'x="44" y="42" width="14" height="8" rx="2"'

const stack = ['TypeScript', 'NestJS', 'React', 'Python', 'Docker', 'Nginx']

// O texto é desenhado como <path> a partir da IBM Plex Mono do próprio projeto.
// Assim a imagem sai igual em qualquer máquina, sem depender das fontes instaladas.
function loadFont(weight, family = 'ibm-plex-mono') {
  const file = new URL(`../node_modules/@fontsource/${family}/files/${family}-latin-${weight}-normal.woff`, import.meta.url)
  const data = readFileSync(fileURLToPath(file))
  return opentype.parse(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength))
}
const fonts = { 400: loadFont(400), 500: loadFont(500) }

function text(content, x, y, size, fill, weight = 400) {
  return `<path d="${fonts[weight].getPath(content, x, y, size).toPathData(2)}" fill="${fill}"/>`
}

/** Vários trechos de cores diferentes na mesma linha. Devolve o SVG e onde a linha termina. */
function segments(parts, x, y, size) {
  let cursor = x
  const svg = parts.map(([content, fill, weight = 400]) => {
    const path = text(content, cursor, y, size, fill, weight)
    cursor += fonts[weight].getAdvanceWidth(content, size)
    return path
  })
  return { svg: svg.join('\n  '), end: cursor }
}

const prompt = [
  ['victor@cesar', BLUE],
  [':', DIM],
  ['~', SKY],
  ['$ ', DIM],
]

const PHOTO_SIZE = 240
const PHOTO_X = WIDTH - MARGIN - PHOTO_SIZE
const PHOTO_Y = 160

const whoami = segments([...prompt, ['whoami', WHITE]], MARGIN, 122, 28)
const open = segments([...prompt, ['open victorcesar.com.br', WHITE]], MARGIN, 548, 28)

// A imagem serve para os dois idiomas: sem "currículo" nem "desenvolvedor".
const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="100%" height="100%" fill="${BG}"/>

  ${whoami.svg}
  ${text('Víctor César', MARGIN, 232, 80, WHITE, 500)}
  ${text('da Rocha Bastos', MARGIN, 322, 80, WHITE, 500)}
  ${text('Full Stack / DevOps', MARGIN, 392, 34, SKY_LIGHT)}
  ${text(stack.join(' · '), MARGIN, 440, 22, MUTED)}

  ${open.svg}
  <rect x="${open.end + 8}" y="522" width="17" height="33" fill="${SKY}"/>

  <!-- borda da foto (a foto é colada por cima, 2px para dentro) -->
  <rect x="${PHOTO_X - 2}" y="${PHOTO_Y - 2}" width="${PHOTO_SIZE + 4}" height="${PHOTO_SIZE + 4}" rx="6" fill="${BORDER}"/>

  <!-- logo (variação F3) no canto, alinhada com a primeira linha -->
  <g transform="translate(${WIDTH - MARGIN - 58 * 0.8} 86) scale(0.8)">
    <polygon points="${V_LEFT}" fill="${WHITE}"/>
    <polygon points="${V_RIGHT}" fill="#3b82f6"/>
    <rect ${CURSOR} fill="${SKY}"/>
  </g>
</svg>`

const mask = Buffer.from(
  `<svg width="${PHOTO_SIZE}" height="${PHOTO_SIZE}"><rect width="${PHOTO_SIZE}" height="${PHOTO_SIZE}" rx="4"/></svg>`,
)

const photo = await sharp(fileURLToPath(new URL('foto-perfil.jpg', PUBLIC)))
  .resize(PHOTO_SIZE, PHOTO_SIZE)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

await sharp(Buffer.from(background))
  .composite([{ input: photo, left: PHOTO_X, top: PHOTO_Y }])
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(fileURLToPath(new URL('og-terminal.jpg', PUBLIC)))

// Ícone da tela inicial: o selo escuro do favicon, mas ocupando o quadrado todo
// (o celular arredonda os cantos sozinho, e o iOS não aceita transparência).
const touchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180">
  <rect width="64" height="64" fill="#0f172a"/>
  <g transform="translate(8 8) scale(0.75)">
    <polygon points="${V_FULL}" fill="#ffffff"/>
    <rect ${CURSOR} fill="#3b82f6"/>
  </g>
</svg>`

await sharp(Buffer.from(touchIcon), { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL('apple-touch-icon.png', PUBLIC)))

// Prévia do link da palestra: o visual da capa dos slides (cores da apresentação, não do site).
// O bloco de texto fica no centro para que a miniatura quadrada de alguns apps mostre o título.
const TALK = { bg: '#060B17', accent: '#4CC3F5', title: '#EEF2F7', text: '#C3CDDB', muted: '#8592A6', line: '#22304A' }
const talkFonts = { sans400: loadFont(400, 'ibm-plex-sans'), sans600: loadFont(600, 'ibm-plex-sans') }
const talkText = (font, content, x, y, size, fill) =>
  `<path d="${font.getPath(content, x, y, size).toPathData(2)}" fill="${fill}"/>`

const TALK_TITLE_SIZE = 84
const talkTitleWidth = fonts[500].getAdvanceWidth('Em produção', TALK_TITLE_SIZE)
const talkX = Math.round((WIDTH - talkTitleWidth) / 2)
const talkLine2End = talkX + fonts[500].getAdvanceWidth('desde 2023', TALK_TITLE_SIZE)

const talkCover = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="100%" height="100%" fill="${TALK.bg}"/>

  <!-- circuito dos slides de abertura e encerramento -->
  <g fill="none" stroke="${TALK.line}" stroke-width="3" stroke-linejoin="round">
    <path d="M1200 110H1090L1050 150V300H960"/>
    <path d="M1200 360H1110L1070 400V520H985"/>
    <path d="M1200 470H1150V630"/>
    <path d="M0 190H70L110 230V420H210"/>
    <path d="M0 520H150"/>
  </g>
  <g fill="${TALK.line}">
    <circle cx="960" cy="300" r="7"/><circle cx="985" cy="520" r="6"/>
    <circle cx="210" cy="420" r="7"/><circle cx="150" cy="520" r="6"/>
  </g>
  <g fill="${TALK.accent}"><circle cx="1050" cy="235" r="5"/><circle cx="110" cy="330" r="5"/></g>

  ${talkText(fonts[400], 'victor@palestra:~$ uptime', talkX, 168, 24, TALK.accent)}
  ${talkText(fonts[500], 'Em produção', talkX, 266, TALK_TITLE_SIZE, TALK.title)}
  ${talkText(fonts[500], 'desde 2023', talkX, 360, TALK_TITLE_SIZE, TALK.title)}
  <rect x="${Math.round(talkLine2End + 10)}" y="300" width="44" height="62" fill="${TALK.accent}"/>

  <rect x="${talkX}" y="408" width="${Math.round(talkTitleWidth)}" height="2" fill="${TALK.line}"/>
  ${talkText(talkFonts.sans600, 'Víctor César', talkX, 462, 34, TALK.title)}
  ${talkText(talkFonts.sans400, 'Desenvolvedor Full Stack / DevOps', talkX, 500, 24, TALK.text)}
  ${talkText(fonts[400], 'Café com TI 2026 · 21/10/2026', talkX, 540, 20, TALK.muted)}
</svg>`

await sharp(Buffer.from(talkCover))
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(fileURLToPath(new URL('palestra/og-palestra.jpg', PUBLIC)))

console.log('Imagens geradas em public/: og-terminal.jpg, apple-touch-icon.png, palestra/og-palestra.jpg')
