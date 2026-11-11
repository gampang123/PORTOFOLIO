<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import {
  ExternalLink,
  Github,
  Maximize2,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  ChevronUp,
  FolderOpen,
  Code2,
  CheckCircle2,
  Compass,
} from 'lucide-vue-next'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['open-modal'])

const rootRef = ref(null)
const canvasRef = ref(null)
const isOpen = ref(false)
const isHovered = ref(false)
const activeSheet = ref(null)

// Geometry constants matching folder physics
const W = 360
const H = 280
const HEADROOM = 84
const FRONT_TOP = 76
const FRONT_H = H - FRONT_TOP

const BACK_PATH =
  "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L338 0A22 22 0 0 1 360 22L360 258A22 22 0 0 1 338 280L22 280A22 22 0 0 1 0 258Z"

const FRONT_PATH =
  "M0 22A22 22 0 0 1 22 0L126 0C152 0 154 32 180 32L338 32A22 22 0 0 1 360 54L360 " +
  (FRONT_H - 22) +
  "A22 22 0 0 1 338 " +
  FRONT_H +
  "L22 " +
  FRONT_H +
  "A22 22 0 0 1 0 " +
  (FRONT_H - 22) +
  "Z"

const uid = 'gfc-' + Math.random().toString(36).slice(2, 9)

// 4 distinct sheets per project folder
const sheets = computed(() => {
  const p = props.project
  return [
    {
      id: 'specs',
      type: 'action',
      title: 'Full System Specs',
      badge: 'DEEP DIVE',
      actionText: 'Lihat Detail & Specs',
      color: 'amber',
    },
    {
      id: 'metrics',
      type: 'metrics',
      title: 'Performance & Metrics',
      badge: 'METRICS',
      items: p.metrics || [
        { label: 'Status', value: 'Production' },
        { label: 'Uptime', value: '99.9%' },
      ],
      color: 'emerald',
    },
    {
      id: 'arch',
      type: 'arch',
      title: 'Architecture & Security',
      badge: 'ARCH // SEC',
      framework: p.architectureDetails?.framework || 'Laravel MVC',
      security: p.architectureDetails?.security || 'OWASP Top 10 Compliant',
      color: 'sky',
    },
    {
      id: 'preview',
      type: 'preview',
      title: p.title,
      badge: 'LIVE SYSTEM',
      url: p.mockupUrl ? p.mockupUrl.replace('https://', '') : p.id + '.internal',
      tags: p.tags ? p.tags.slice(0, 3) : [],
      color: 'crimson',
    },
  ]
})

// Curated atmospheric palette recipes for back panel generative canvas
const SKY_THEMES = [
  // 0: Deep Azure & White Clouds
  ['#19447d', '#2862a5', '#5791cf', '#b8d8f8', '#ffffff'],
  // 1: Amber Sunset Sky
  ['#162a52', '#22487e', '#48689c', '#d97706', '#fef3c7'],
  // 2: Cobalt & Cyan Aerospace
  ['#0e2d57', '#1b4a83', '#337cb8', '#38bdf8', '#e0f2fe'],
  // 3: Emerald Mountain Horizon
  ['#103554', '#19506e', '#2e7a85', '#34d399', '#f0fdf4'],
  // 4: Twilight Violet
  ['#1a2b56', '#313a77', '#5f5399', '#a78bfa', '#f5f3ff'],
]

// Render procedural atmospheric art on canvas
const drawCanvasArt = () => {
  const canvas = canvasRef.current
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = W
  const height = H
  canvas.width = width
  canvas.height = height

  const palette = SKY_THEMES[props.index % SKY_THEMES.length]
  const grad = ctx.createLinearGradient(0, 0, width, height)
  palette.forEach((color, i) => {
    grad.addColorStop(i / (palette.length - 1), color)
  })

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  // Soft atmospheric cloud / light orbs
  for (let i = 0; i < 4; i++) {
    const x = ((props.index * 73 + i * 97) % width)
    const y = ((props.index * 47 + i * 61) % height)
    const radius = 60 + ((props.index * 31 + i * 29) % 70)

    const radial = ctx.createRadialGradient(x, y, 0, x, y, radius)
    radial.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
    radial.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)')
    radial.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = radial
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  // Micro dot grid pattern overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
  const dotGap = 16
  for (let dx = 8; dx < width; dx += dotGap) {
    for (let dy = 8; dy < height; dy += dotGap) {
      ctx.fillRect(dx, dy, 1.2, 1.2)
    }
  }
}

// Interactive pointer tracking for realistic 3D specular glare & tilt
const handlePointerMove = (e) => {
  if (e.pointerType === 'touch') return
  const el = rootRef.current
  if (!el) return
  const rect = el.getBoundingClientRect()
  const px = ((e.clientX - rect.left) / rect.width) * 2 - 1
  const py = ((e.clientY - rect.top) / rect.height) * 2 - 1

  el.style.setProperty('--gfc-px', px.toFixed(3))
  el.style.setProperty('--gfc-py', py.toFixed(3))
}

const handlePointerLeave = () => {
  const el = rootRef.current
  if (!el) return
  el.style.setProperty('--gfc-px', '0')
  el.style.setProperty('--gfc-py', '0')
  isHovered.value = false
}

const handlePointerEnter = () => {
  isHovered.value = true
}

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const triggerModal = (e) => {
  if (e) e.stopPropagation()
  emit('open-modal', props.project)
}

onMounted(() => {
  nextTick(() => {
    drawCanvasArt()
  })
})
</script>

<template>
  <div
    ref="rootRef"
    class="gfc-root relative select-none"
    :class="[
      isOpen ? 'gfc-open' : '',
      isHovered ? 'gfc-hovered' : '',
    ]"
    :data-open="isOpen ? 'true' : undefined"
    @pointermove="handlePointerMove"
    @pointerenter="handlePointerEnter"
    @pointerleave="handlePointerLeave"
    :style="{ width: W + 'px', height: (H + HEADROOM) + 'px' }"
  >
    <!-- Stage with fixed perspective for clean 3D mechanical fold -->
    <div
      class="gfc-stage absolute inset-0"
      :style="{ paddingTop: HEADROOM + 'px' }"
    >
      <div class="gfc-tilt relative w-full h-[280px]">
        
        <!-- Ambient Ground Drop Shadow that expands when open -->
        <div class="gfc-shadow absolute left-4 right-4 -bottom-3 h-14 rounded-full bg-[#0a1e3d]/40 blur-xl pointer-events-none transition-all duration-700"></div>

        <!-- 1. BACK PANEL: Organic Folder Tab with Procedural Sky Art -->
        <div
          class="gfc-back absolute inset-0 overflow-hidden rounded-[22px] shadow-2xl transition-transform duration-700"
          :style="{ clipPath: `path('${BACK_PATH}')` }"
        >
          <!-- Canvas with dynamic sky & cloud art -->
          <canvas
            ref="canvasRef"
            class="w-full h-full object-cover pointer-events-none"
          ></canvas>

          <!-- Back Sheen Lighting Overlay -->
          <div class="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/25 pointer-events-none"></div>

          <!-- Top Tab Meta Header -->
          <div class="absolute top-2 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-white/90">
            <span class="font-bold tracking-widest text-amber-300">
              DOSSIER // 0{{ index + 1 }}
            </span>
            <span class="px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[9px] uppercase font-semibold">
              {{ project.category }}
            </span>
          </div>
        </div>

        <!-- Back Panel Perimeter Glass Rim SVG -->
        <svg
          class="absolute inset-0 w-[360px] h-[280px] pointer-events-none z-0"
          viewBox="0 0 360 280"
          fill="none"
        >
          <path
            :d="BACK_PATH"
            stroke="rgba(255, 255, 255, 0.45)"
            stroke-width="1.2"
          />
        </svg>

        <!-- 2. MIDDLE LAYER: Interactive Dossier Sheets that Fan Out! -->
        <div class="gfc-sheets-container absolute inset-0 z-10 pointer-events-none">
          <div
            v-for="(sheet, sIdx) in sheets"
            :key="sheet.id"
            class="gfc-sheet absolute left-6 top-16 w-[312px] h-[190px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer pointer-events-auto border transition-all duration-500 shadow-xl"
            :class="[
              activeSheet === sIdx ? 'gfc-sheet--active ring-2 ring-amber-300' : '',
              sheet.type === 'action'
                ? 'bg-gradient-to-br from-[#1d4c82] via-[#163f6f] to-[#0f2c4f] border-amber-300/40 text-white'
                : sheet.type === 'metrics'
                  ? 'bg-gradient-to-br from-white/95 via-slate-50/95 to-slate-100/95 border-emerald-400/40 text-slate-800'
                  : sheet.type === 'arch'
                    ? 'bg-gradient-to-br from-slate-900/95 via-[#0c1f3d]/95 to-[#122e54]/95 border-sky-400/40 text-white'
                    : 'bg-gradient-to-br from-white/95 via-white/95 to-sky-50/95 border-white/60 text-slate-900',
            ]"
            :style="{
              '--gfc-sheet-idx': sIdx,
              '--gfc-sheet-total': sheets.length,
              zIndex: sIdx + 1,
            }"
            @mouseenter="activeSheet = sIdx"
            @mouseleave="activeSheet = null"
            @click="triggerModal"
          >
            <!-- Sheet Top Header -->
            <div class="flex items-center justify-between font-mono text-[10px] pb-1.5 border-b"
              :class="sheet.type === 'metrics' || sheet.type === 'preview' ? 'border-slate-200 text-slate-500' : 'border-white/15 text-white/70'"
            >
              <span class="font-bold uppercase tracking-wider"
                :class="sheet.type === 'action' ? 'text-amber-300' : sheet.type === 'metrics' ? 'text-emerald-600' : sheet.type === 'arch' ? 'text-sky-300' : 'text-crimson-600'"
              >
                {{ sheet.badge }}
              </span>
              <span>PAGE 0{{ sIdx + 1 }}</span>
            </div>

            <!-- Sheet Specific Dynamic Content -->
            <!-- 1. Action / Deep Dive Sheet -->
            <div v-if="sheet.type === 'action'" class="space-y-2 py-1">
              <p class="font-display font-bold text-sm text-white leading-tight">
                {{ project.title }}
              </p>
              <p class="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                {{ project.shortDescription }}
              </p>
              <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-amber-300 font-semibold">
                <span>Klik untuk Detail & Specs</span>
                <Maximize2 class="w-3.5 h-3.5" />
              </div>
            </div>

            <!-- 2. Metrics Sheet -->
            <div v-else-if="sheet.type === 'metrics'" class="space-y-2 py-1">
              <span class="text-[10px] font-mono font-bold uppercase text-slate-500 block">KEY PROJECT METRICS</span>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(m, mIdx) in sheet.items.slice(0, 2)"
                  :key="mIdx"
                  class="p-2 rounded-xl bg-slate-100/90 border border-slate-200"
                >
                  <span class="text-[9px] font-mono text-slate-500 block truncate">{{ m.label }}</span>
                  <span class="text-xs sm:text-sm font-bold text-slate-900 font-mono">{{ m.value }}</span>
                </div>
              </div>
            </div>

            <!-- 3. Architecture Sheet -->
            <div v-else-if="sheet.type === 'arch'" class="space-y-2 py-1 text-left">
              <div class="space-y-1 text-[11px] font-mono">
                <div class="flex items-center gap-1.5 text-sky-300 font-semibold">
                  <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
                  <span>{{ sheet.security }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-white/90">
                  <Layers class="w-3.5 h-3.5 text-sky-400" />
                  <span>{{ sheet.framework }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-1 pt-1">
                <span
                  v-for="(t, tIdx) in project.tags.slice(0, 3)"
                  :key="tIdx"
                  class="px-2 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white"
                >
                  {{ t }}
                </span>
              </div>
            </div>

            <!-- 4. Preview / Live URL Sheet -->
            <div v-else class="space-y-2 py-1 text-left">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-600 truncate">
                <span class="text-sky-600 font-bold">https://</span>
                <span class="truncate text-slate-800">{{ sheet.url }}</span>
              </div>
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-700">
                <span class="flex items-center gap-1 font-semibold text-emerald-600">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {{ project.systemStatus || 'Active' }}
                </span>
                <span class="text-sky-600 font-semibold flex items-center gap-1">
                  Preview ↗
                </span>
              </div>
            </div>

            <!-- Sheet Bottom Bar -->
            <div class="pt-1.5 border-t flex items-center justify-between text-[10px] font-mono"
              :class="sheet.type === 'metrics' || sheet.type === 'preview' ? 'border-slate-200 text-slate-400' : 'border-white/10 text-white/50'"
            >
              <span>{{ project.id }}</span>
              <span class="font-bold text-amber-400">#0{{ sIdx + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- 3. FRONT PANEL: Frosted Glass Pocket with 3D Bottom Hinge -->
        <div
          class="gfc-front absolute left-0 z-20 overflow-hidden cursor-pointer shadow-[0_15px_40px_rgba(10,35,75,0.28)]"
          :style="{
            top: FRONT_TOP + 'px',
            width: W + 'px',
            height: FRONT_H + 'px',
            clipPath: `path('${FRONT_PATH}')`,
          }"
          @click="toggleOpen"
        >
          <!-- Multi-layer Glassmorphic Frosted Blur -->
          <div class="gfc-front-glass absolute inset-0 backdrop-blur-2xl bg-gradient-to-b from-white/35 via-white/20 to-white/10"></div>
          
          <!-- Specular Light Reflection tracking cursor -->
          <div class="gfc-spec absolute inset-0 pointer-events-none"></div>

          <!-- Bottom Ambient Frost Glow -->
          <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e274b]/80 via-[#0e274b]/30 to-transparent pointer-events-none"></div>

          <!-- Glass Pocket Front Perimeter Rim SVG -->
          <svg
            class="absolute inset-0 w-[360px] pointer-events-none z-10"
            :style="{ height: FRONT_H + 'px' }"
            viewBox="0 0 360 204"
            fill="none"
          >
            <defs>
              <linearGradient :id="'rim-' + uid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
                <stop offset="30%" stop-color="#ffffff" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
              </linearGradient>
            </defs>
            <path
              :d="FRONT_PATH"
              :stroke="`url(#rim-${uid})`"
              stroke-width="2"
            />
          </svg>

          <!-- Front Pocket Printed Details (High Legibility & Aviation HUD) -->
          <div class="relative z-20 p-6 flex flex-col justify-between h-full text-left text-white">
            
            <!-- Top Index Row -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-[10px] font-mono tracking-widest uppercase font-bold text-sky-200">
                  {{ project.systemStatus || 'PRODUCTION READY' }}
                </span>
              </div>

              <!-- Folder Open Indicator / Flip Tag -->
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 border border-white/25 text-white flex items-center gap-1 transition-transform group-hover:scale-105">
                <span>{{ isOpen ? 'CLOSE' : 'OPEN DOSSIER' }}</span>
                <ChevronUp class="w-3 h-3 transition-transform duration-300" :class="isOpen ? 'rotate-180' : ''" />
              </span>
            </div>

            <!-- Center: Project Title & Serial Number -->
            <div class="space-y-1.5 pt-2">
              <div class="flex items-center gap-2">
                <span class="font-poster text-3xl text-amber-300 tracking-wider drop-shadow-sm leading-none">
                  0{{ index + 1 }}
                </span>
                <span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">
                  // {{ project.category }}
                </span>
              </div>

              <h3 class="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug drop-shadow-md">
                {{ project.title }}
              </h3>
            </div>

            <!-- Bottom: Tech Stack Chips & Action Trigger -->
            <div class="pt-3 border-t border-white/20 flex items-center justify-between">
              <div class="flex flex-wrap gap-1.5 max-w-[210px]">
                <span
                  v-for="(tag, tIdx) in project.tags.slice(0, 3)"
                  :key="tIdx"
                  class="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-white/20 border border-white/25 text-white/95"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="project.tags.length > 3"
                  class="px-1.5 py-0.5 rounded-lg text-[10px] font-mono bg-white/25 text-amber-200 font-bold"
                >
                  +{{ project.tags.length - 3 }}
                </span>
              </div>

              <!-- Interactive Key Trigger Button -->
              <button
                type="button"
                class="w-10 h-10 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white flex items-center justify-center shadow-[0_4px_15px_rgba(220,38,38,0.45)] transition-all hover:scale-110 active:scale-95 cursor-pointer z-30"
                title="Buka Lembar Arsip / Modal"
                @click.stop="triggerModal"
              >
                <Maximize2 class="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.gfc-root {
  --gfc-px: 0;
  --gfc-py: 0;
  --gfc-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --gfc-spring: cubic-bezier(0.34, 1.36, 0.5, 1);
  --gfc-hinge: 0deg;
  --gfc-lift: 28px;
  --gfc-spread: 0px;
  --gfc-fan: 0deg;
  perspective: 1200px;
}

/* 3D Mechanical Tilt & Glare */
.gfc-tilt {
  transform: perspective(1400px) rotateX(calc(var(--gfc-py) * -4deg)) rotateY(calc(var(--gfc-px) * 5deg));
  transition: transform 0.6s var(--gfc-ease);
}

/* Front Frosted Glass Panel Hinged at Bottom Edge */
.gfc-front {
  transform-origin: 50% 100%;
  transform: perspective(800px) rotateX(var(--gfc-hinge));
  transition: transform 0.7s var(--gfc-spring), box-shadow 0.6s var(--gfc-ease);
}

/* Specular Glare Movement following Cursor */
.gfc-spec {
  background: radial-gradient(
    280px 220px at calc(50% + var(--gfc-px) * 45%) calc(35% + var(--gfc-py) * 40%),
    rgba(255, 255, 255, 0.55),
    rgba(255, 255, 255, 0) 70%
  );
  mix-blend-mode: overlay;
  opacity: 0.8;
  transition: opacity 0.4s var(--gfc-ease);
}

/* Hover State: Glass pocket tilts open slightly, sheets peek out */
.gfc-hovered {
  --gfc-hinge: -12deg;
  --gfc-lift: -32px;
  --gfc-spread: 12px;
  --gfc-fan: 1.8deg;
}

.gfc-hovered .gfc-shadow {
  transform: translateY(6px) scale(1.05);
  opacity: 0.8;
}

/* Open State: Glass swings forward, sheets rise high and fan out! */
.gfc-open {
  --gfc-hinge: -24deg;
  --gfc-lift: -94px;
  --gfc-spread: 38px;
  --gfc-fan: 5.2deg;
}

.gfc-open .gfc-front {
  box-shadow: 0 25px 50px -10px rgba(10, 35, 75, 0.4);
}

.gfc-open .gfc-shadow {
  transform: translateY(12px) scale(1.12);
  opacity: 0.9;
}

/* Fan Slot & Depth Mechanics for Sandwiched Sheets */
.gfc-sheet {
  transform-origin: 50% 100%;
  /* Calculate slot position: index 0..3 spreads horizontally and fans radially */
  --gfc-slot: calc((var(--gfc-sheet-idx) / (var(--gfc-sheet-total) - 1)) * 2 - 1);
  --gfc-depth: calc(var(--gfc-sheet-total) - 1 - var(--gfc-sheet-idx));

  transform:
    translate(
      calc(var(--gfc-slot) * var(--gfc-spread)),
      calc(var(--gfc-lift) + var(--gfc-depth) * -14px)
    )
    rotate(calc(var(--gfc-slot) * var(--gfc-fan)));

  transition:
    transform 0.65s var(--gfc-spring),
    box-shadow 0.35s var(--gfc-ease);
}

/* Individual Sheet Hovering when open */
.gfc-open .gfc-sheet:hover,
.gfc-sheet--active {
  transform:
    translate(
      calc(var(--gfc-slot) * var(--gfc-spread)),
      calc(var(--gfc-lift) - 22px)
    )
    rotate(calc(var(--gfc-slot) * var(--gfc-fan) * 0.4))
    scale(1.04) !important;
  box-shadow: 0 20px 40px -10px rgba(10, 35, 75, 0.45) !important;
  z-index: 25 !important;
}

@media (prefers-reduced-motion: reduce) {
  .gfc-root *, .gfc-tilt, .gfc-front, .gfc-sheet {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
</style>

