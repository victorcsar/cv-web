// Gera as imagens estáticas do site: `npm run images`.
// - public/og-image.png: prévia do link no LinkedIn, WhatsApp etc. (1200×630)
// - public/apple-touch-icon.png: ícone ao salvar o site na tela inicial do celular (180×180)
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = new URL('../public/', import.meta.url)
const WIDTH = 1200
const HEIGHT = 630

const PHOTO_SIZE = 260
const PHOTO_X = 100
const PHOTO_Y = (HEIGHT - PHOTO_SIZE) / 2
const cx = PHOTO_X + PHOTO_SIZE / 2
const cy = PHOTO_Y + PHOTO_SIZE / 2

const font = "'Segoe UI', 'Inter', Arial, sans-serif"
const stack = ['TypeScript', 'NestJS', 'React', 'Python', 'Docker', 'Nginx']

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glowA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#2563eb" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#2563eb" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#0ea5e9" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="0.5" stop-color="#38bdf8"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="role" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#93c5fd"/>
      <stop offset="1" stop-color="#7dd3fc"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="#020617"/>
  <circle cx="230" cy="120" r="460" fill="url(#glowA)"/>
  <circle cx="1050" cy="40" r="420" fill="url(#glowB)"/>

  <!-- anel em gradiente atrás da foto -->
  <circle cx="${cx}" cy="${cy}" r="${PHOTO_SIZE / 2 + 16}" fill="url(#ring)" opacity="0.35"/>
  <circle cx="${cx}" cy="${cy}" r="${PHOTO_SIZE / 2 + 6}" fill="url(#ring)"/>
  <circle cx="${cx}" cy="${cy}" r="${PHOTO_SIZE / 2 + 2}" fill="#020617"/>

  <g font-family="${font}">
    <text x="440" y="250" font-size="30" font-weight="600" fill="#94a3b8" letter-spacing="1">CURRÍCULO</text>
    <text x="440" y="330" font-size="76" font-weight="700" fill="#ffffff">Víctor César</text>
    <text x="440" y="392" font-size="38" font-weight="600" fill="url(#role)">Desenvolvedor Full Stack / DevOps</text>
    <text x="440" y="450" font-size="26" fill="#94a3b8">${stack.join('  ·  ')}</text>

    <circle cx="449" cy="551" r="7" fill="#3b82f6"/>
    <text x="468" y="560" font-size="26" font-weight="600" fill="#cbd5e1">victorcesar.com.br</text>
  </g>
</svg>`

const mask = Buffer.from(
  `<svg width="${PHOTO_SIZE}" height="${PHOTO_SIZE}"><circle cx="${PHOTO_SIZE / 2}" cy="${PHOTO_SIZE / 2}" r="${PHOTO_SIZE / 2}"/></svg>`,
)

const photo = await sharp(fileURLToPath(new URL('foto-perfil.jpg', PUBLIC)))
  .resize(PHOTO_SIZE, PHOTO_SIZE)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer()

await sharp(Buffer.from(background))
  .composite([{ input: photo, left: PHOTO_X, top: PHOTO_Y }])
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(new URL('og-image.png', PUBLIC)))

// Ícone da tela inicial: o mesmo "VC" do favicon, sem transparência (iOS não aceita).
const favicon = await readFile(new URL('favicon.svg', PUBLIC))
await sharp(favicon, { density: 300 })
  .resize(180, 180)
  .flatten({ background: '#1d4ed8' })
  .png()
  .toFile(fileURLToPath(new URL('apple-touch-icon.png', PUBLIC)))

console.log('Imagens geradas em public/: og-image.png, apple-touch-icon.png')

