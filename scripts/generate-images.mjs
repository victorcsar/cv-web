// Gera as imagens estáticas do site: `npm run images`.
// - public/og-terminal.jpg: prévia do link no LinkedIn, WhatsApp etc. (1200×630, JPEG leve:
//   o WhatsApp no celular só mostra o cartão grande com imagem leve)
// - public/apple-touch-icon.png: ícone ao salvar o site na tela inicial do celular (180×180)
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
function loadFont(weight) {
  const file = new URL(`../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${weight}-normal.woff`, import.meta.url)
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

console.log('Imagens geradas em public/: og-terminal.jpg, apple-touch-icon.png')
