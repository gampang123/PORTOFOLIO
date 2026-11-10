<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { personalData } from '../../data/personal'

const props = defineProps({
  wordmark: {
    type: String,
    default: 'rozaki'
  },
  label: {
    type: String,
    default: 'Gampang Rozaki'
  },
  meta: {
    type: String,
    default: '© 2026 · Full-Stack Web Developer'
  },
  dotGap: {
    type: Number,
    default: 6
  },
  radius: {
    type: Number,
    default: 85
  },
  crop: {
    type: Number,
    default: 0.18
  },
  grain: {
    type: Number,
    default: 0.45
  },
  interactive: {
    type: Boolean,
    default: true
  },
  fontFamily: {
    type: String,
    default: '"Space Grotesk", "Plus Jakarta Sans", "Inter", sans-serif'
  },
  fontWeight: {
    type: [Number, String],
    default: 800
  },
  monoFamily: {
    type: String,
    default: '"JetBrains Mono", monospace'
  },
  height: {
    type: String,
    default: '460px'
  },
  palette: {
    type: Object,
    default: () => ({
      background: '#050507',
      ink: '#e2e8f0',
      warm: '#dc2626'
    })
  }
})

const rootRef = ref(null)
const canvasRef = ref(null)

// Pure Halftone Helpers
function hwfHex(hex) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || '').trim())
  if (!m) return null
  const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function hwfRadius(coverage, gap) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage
  return Math.sqrt(c) * gap * 0.56
}

function hwfStep(x, y, vx, vy, hx, hy, px, py, r) {
  const dx = x - px
  const dy = y - py
  const d2 = dx * dx + dy * dy
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001
    const f = (1 - d / r) * 2.6
    vx += (dx / d) * f
    vy += (dy / d) * f
  }
  vx = (vx + (hx - x) * 0.05) * 0.84
  vy = (vy + (hy - y) * 0.05) * 0.84
  return [x + vx, y + vy, vx, vy]
}

function hwfWarmth(x, y, hx, hy, span) {
  const d = Math.hypot(x - hx, y - hy)
  return span > 0 ? Math.min(1, d / span) : 0
}

function hwfFitSize(measured, width) {
  return measured > 0 ? (width / measured) * 100 : 0
}

let cleanup = null

const initHalftone = () => {
  if (cleanup) {
    cleanup()
    cleanup = null
  }

  const root = rootRef.value
  const canvas = canvasRef.value
  if (!root || !canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let w = 0
  let h = 0
  let dpr = 1
  let px = -1e5
  let py = -1e5
  let raf = 0
  let visible = true
  let awake = true
  let ring = { x: 0, y: 0, t: -1 }
  let dots = new Float32Array(0)
  let count = 0
  let grainTile = null

  const colors = {
    background: props.palette?.background || '#050507',
    ink: props.palette?.ink || '#e2e8f0',
    warm: props.palette?.warm || '#dc2626'
  }

  const ink = hwfHex(colors.ink) || [226, 232, 240]
  const warm = hwfHex(colors.warm) || [220, 38, 38]

  const layout = () => {
    const rect = root.getBoundingClientRect()
    w = Math.max(1, Math.round(rect.width))
    h = Math.max(1, Math.round(rect.height))
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)

    // Mask for the wordmark
    const mask = document.createElement('canvas')
    mask.width = w
    mask.height = h
    const m = mask.getContext('2d', { willReadFrequently: true })
    if (!m) return
    const face = `${props.fontWeight} 100px ${props.fontFamily}`
    m.font = face
    const word = props.wordmark || ' '
    const fit = hwfFitSize(m.measureText(word).width, w * 1.02)
    m.font = `${props.fontWeight} ${fit}px ${props.fontFamily}`
    const box = m.measureText(word)
    const cap = box.actualBoundingBoxAscent || fit * 0.72
    const c = Math.max(0, Math.min(0.6, props.crop))
    m.fillStyle = '#000'
    m.textBaseline = 'alphabetic'
    m.fillText(word, (w - box.width) / 2, h + cap * c)
    const img = m.getImageData(0, 0, w, h).data

    const gap = Math.max(3, props.dotGap)
    const cols = Math.ceil(w / gap)
    const rows = Math.ceil(h / gap)
    const tmp = []
    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        let sum = 0
        for (let sy = 0; sy < 3; sy++) {
          for (let sx = 0; sx < 3; sx++) {
            const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
            const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
            sum += img[(y * w + x) * 4 + 3]
          }
        }
        const cov = sum / (9 * 255)
        if (cov < 0.06) continue
        const hx = gx * gap + gap / 2
        const hy = gy * gap + gap / 2
        tmp.push(hx, hy, 0, 0, hx, hy, hwfRadius(cov, gap))
      }
    }
    dots = new Float32Array(tmp)
    count = tmp.length / 7

    // Grain tile
    grainTile = document.createElement('canvas')
    grainTile.width = 256
    grainTile.height = 256
    const g = grainTile.getContext('2d')
    if (g) {
      const id = g.createImageData(256, 256)
      for (let i = 0; i < id.data.length; i += 4) {
        const v = Math.random() * 255
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v
        id.data[i + 3] = Math.random() < 0.5 ? 0 : 255
      }
      g.putImageData(id, 0, 0)
    }
    awake = true
  }

  const draw = (now) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, w, h)

    const r = props.interactive && !reduced ? Math.max(0, props.radius) : 0
    const ringAge = ring.t < 0 ? 1e9 : now - ring.t
    const ringR = ringAge * 0.9
    let moving = false
    for (let i = 0; i < count; i++) {
      const j = i * 7
      let x = dots[j]
      let y = dots[j + 1]
      let vx = dots[j + 2]
      let vy = dots[j + 3]
      const hx = dots[j + 4]
      const hy = dots[j + 5]

      if (!reduced) {
        if (ringAge < 900) {
          const dx = hx - ring.x
          const dy = hy - ring.y
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001
          const band = 1 - Math.min(1, Math.abs(d - ringR) / 26)
          if (band > 0) {
            const f = band * 3.2 * (1 - ringAge / 900)
            vx += (dx / d) * f
            vy += (dy / d) * f
          }
        }
        const s = hwfStep(x, y, vx, vy, hx, hy, px, py, r)
        x = s[0]
        y = s[1]
        vx = s[2]
        vy = s[3]
        if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) {
          moving = true
        } else {
          x = hx
          y = hy
          vx = 0
          vy = 0
        }
        dots[j] = x
        dots[j + 1] = y
        dots[j + 2] = vx
        dots[j + 3] = vy
      }

      const k = hwfWarmth(x, y, hx, hy, 28)
      ctx.fillStyle =
        k > 0.02
          ? 'rgb(' +
            Math.round(ink[0] + (warm[0] - ink[0]) * k) + ',' +
            Math.round(ink[1] + (warm[1] - ink[1]) * k) + ',' +
            Math.round(ink[2] + (warm[2] - ink[2]) * k) + ')'
          : colors.ink
      ctx.beginPath()
      ctx.arc(x, y, dots[j + 6], 0, 6.2832)
      ctx.fill()
    }

    if (grainTile && props.grain > 0) {
      ctx.globalAlpha = Math.min(1, props.grain) * 0.09
      ctx.globalCompositeOperation = 'overlay'
      const pattern = ctx.createPattern(grainTile, 'repeat')
      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, w, h)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    awake = moving || ringAge < 900 || px > -1e4
  }

  const loop = (now) => {
    raf = 0
    if (!visible) return
    draw(now)
    if (awake) raf = requestAnimationFrame(loop)
  }

  const wake = () => {
    awake = true
    if (!raf && visible) raf = requestAnimationFrame(loop)
  }

  const toLocal = (e) => {
    const b = canvas.getBoundingClientRect()
    return [e.clientX - b.left, e.clientY - b.top]
  }

  const onMove = (e) => {
    if (!props.interactive) return
    const p = toLocal(e)
    px = p[0]
    py = p[1]
    wake()
  }

  const onLeave = () => {
    px = -1e5
    py = -1e5
    wake()
  }

  const onDown = (e) => {
    if (!props.interactive || reduced) return
    if (e.target.closest('a, button')) return
    const p = toLocal(e)
    ring = { x: p[0], y: p[1], t: performance.now() }
    wake()
  }

  layout()
  draw(performance.now())
  wake()

  root.addEventListener('pointermove', onMove)
  root.addEventListener('pointerleave', onLeave)
  root.addEventListener('pointerdown', onDown)

  const ro = new ResizeObserver(() => {
    layout()
    wake()
  })
  ro.observe(root)

  const io = new IntersectionObserver((entries) => {
    visible = entries[0] ? entries[0].isIntersecting : true
    if (visible) wake()
  })
  io.observe(root)

  let alive = true
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (!alive) return
      layout()
      wake()
    })
  }

  cleanup = () => {
    alive = false
    if (raf) cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerleave', onLeave)
    root.removeEventListener('pointerdown', onDown)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  initHalftone()
})

onUnmounted(() => {
  if (cleanup) cleanup()
})

watch(
  () => [props.wordmark, props.dotGap, props.crop, props.grain, props.palette],
  () => {
    initHalftone()
  },
  { deep: true }
)
</script>

<template>
  <footer
    ref="rootRef"
    class="hwf-root relative w-full overflow-hidden select-none"
    :style="{
      height,
      '--hwf-bg': palette.background,
      '--hwf-ink': palette.ink,
      '--hwf-mono': monoFamily
    }"
  >
    <!-- Background Halftone Canvas -->
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full block pointer-events-auto" aria-hidden="true" />

    <!-- Accessible Screen Reader text -->
    <span class="sr-only">{{ wordmark }}</span>

    <!-- Sleek Minimalist Top Editorial Bar -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs tracking-wider text-neutral-400">
      
      <!-- Left: Identity & Year -->
      <div class="flex items-center gap-3">
        <a href="#hero" class="font-display font-bold text-white text-sm tracking-tight hover:text-crimson-400 transition-colors flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-crimson-600"></span>
          <span>{{ label }}</span>
        </a>
        <span class="text-neutral-600">•</span>
        <span class="text-[11px] text-neutral-400">{{ meta }}</span>
      </div>

      <!-- Center: Status & Live Interactive Hint -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-neutral-400">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
        </span>
        <span class="text-neutral-400">SPRING FIELD ACTIVE // HOVER & CLICK WORDMARK</span>
      </div>

      <!-- Right: Magnetic Back to Top Button -->
      <div>
        <button
          v-magnetic="{ strength: 0.35, innerStrength: 0.2 }"
          type="button"
          @click="scrollToTop"
          class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900/80 border border-white/15 text-neutral-300 hover:text-white hover:border-crimson-500/60 hover:bg-neutral-800 transition-colors cursor-pointer text-xs font-mono font-medium shadow-md active:scale-95"
        >
          <span>BACK TO TOP</span>
          <div data-magnetic-inner>
            <ArrowUp class="w-3.5 h-3.5 text-crimson-500" />
          </div>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.hwf-root {
  background: var(--hwf-bg);
  color: var(--hwf-ink);
  -webkit-font-smoothing: antialiased;
}
</style>

