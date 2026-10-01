// Gera as imagens estáticas do site: `npm run images`.
// - public/og-image.jpg: prévia do link no LinkedIn, WhatsApp etc. (1200×630, JPEG leve: o WhatsApp no celular é exigente com o tamanho)
// - public/apple-touch-icon.png: ícone ao salvar o site na tela inicial do celular (180×180)
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
// Geometria da logo (design/logos): V com cursor de terminal.
const V_FULL = '6,14 18,14 27,38 36,14 48,14 33,50 21,50'
const V_LEFT = '6,14 18,14 27,38 27,50 21,50'
const V_RIGHT = '27,38 36,14 48,14 33,50 27,50'
const CURSOR = 'x="44" y="42" width="14" height="8" rx="2"'

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

    <text x="498" y="560" font-size="26" font-weight="600" fill="#cbd5e1">victorcesar.com.br</text>
  </g>

  <!-- logo (variação F3) ao lado do endereço -->
  <g transform="translate(440 527) scale(0.72)">
    <polygon points="${V_LEFT}" fill="#ffffff"/>
    <polygon points="${V_RIGHT}" fill="#3b82f6"/>
    <rect ${CURSOR} fill="#38bdf8"/>
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
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(fileURLToPath(new URL('og-image.jpg', PUBLIC)))

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

console.log('Imagens geradas em public/: og-image.jpg, apple-touch-icon.png')

