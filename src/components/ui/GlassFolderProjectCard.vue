<script setup>
import { ref, computed } from 'vue'
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

// 4 distinct sheets per project folder
const sheets = computed(() => {
  const p = props.project
  return [
    {
      id: 'specs',
      type: 'action',
      title: 'Full System Specs',
      badge: 'DEEP DIVE',
      actionText: 'View Details & Specs',
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
    },
    {
      id: 'arch',
      type: 'arch',
      title: 'Architecture & Security',
      badge: 'ARCH // SEC',
      framework: p.architectureDetails?.framework || 'Laravel MVC',
      security: p.architectureDetails?.security || 'OWASP Top 10 Compliant',
    },
    {
      id: 'preview',
      type: 'preview',
      title: p.title,
      badge: 'LIVE SYSTEM',
      url: p.mockupUrl ? p.mockupUrl.replace('https://', '') : p.id + '.internal',
      tags: p.tags ? p.tags.slice(0, 3) : [],
    },
  ]
})

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
        
        <!-- Ambient Ground Drop Shadow under white folder -->
        <div class="gfc-shadow absolute left-4 right-4 -bottom-3 h-14 rounded-full bg-slate-900/25 blur-xl pointer-events-none transition-all duration-700"></div>

        <!-- 1. BACK PANEL: Solid Clean White/Light Folder Back with Header Tab -->
        <div
          class="gfc-back absolute inset-0 overflow-hidden rounded-[22px] bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] shadow-xl transition-transform duration-700"
          :style="{
            clipPath: `path('${BACK_PATH}')`,
            WebkitClipPath: `path('${BACK_PATH}')`,
          }"
        >
          <!-- Subtle top gradient accent on tab -->
          <div class="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-sky-400/20 via-white/50 to-amber-400/20 pointer-events-none"></div>

          <!-- Top Tab Meta Header -->
          <div class="absolute top-2.5 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-slate-600">
            <span class="font-bold tracking-widest text-slate-700 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-crimson-600"></span>
              DOSSIER // 0{{ index + 1 }}
            </span>
            <span class="px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-slate-700 text-[9px] uppercase font-bold shadow-sm">
              {{ project.category }}
            </span>
          </div>
        </div>

        <!-- Back Panel Perimeter Stroke SVG -->
        <svg
          class="absolute inset-0 w-[360px] h-[280px] pointer-events-none z-0"
          viewBox="0 0 360 280"
          fill="none"
        >
          <path
            :d="BACK_PATH"
            stroke="#cbd5e1"
            stroke-width="1.6"
          />
        </svg>

        <!-- 2. MIDDLE LAYER: Interactive Dossier Sheets that Fan Out! -->
        <div class="gfc-sheets-container absolute inset-0 z-10 pointer-events-none">
          <div
            v-for="(sheet, sIdx) in sheets"
            :key="sheet.id"
            class="gfc-sheet absolute left-6 top-16 w-[312px] h-[190px] rounded-2xl p-4 flex flex-col justify-between cursor-pointer pointer-events-auto border transition-all duration-500 shadow-lg"
            :class="[
              activeSheet === sIdx ? 'gfc-sheet--active ring-2 ring-crimson-500 shadow-2xl' : '',
              sheet.type === 'action'
                ? 'bg-gradient-to-br from-slate-900 via-[#182335] to-[#0f172a] border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-800',
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
              :class="sheet.type === 'action' ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'"
            >
              <span class="font-bold uppercase tracking-wider"
                :class="sheet.type === 'action' ? 'text-amber-400' : sheet.type === 'metrics' ? 'text-emerald-600' : sheet.type === 'arch' ? 'text-sky-600' : 'text-crimson-600'"
              >
                {{ sheet.badge }}
              </span>
              <span>DOC 0{{ sIdx + 1 }}</span>
            </div>

            <!-- Sheet Specific Dynamic Content -->
            <!-- 1. Action / Deep Dive Sheet -->
            <div v-if="sheet.type === 'action'" class="space-y-1.5 py-1 text-left">
              <p class="font-display font-bold text-sm text-white leading-tight">
                {{ project.title }}
              </p>
              <p class="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {{ project.shortDescription }}
              </p>
              <div class="pt-1 flex items-center justify-between text-[11px] font-mono text-amber-300 font-semibold">
                <span>Click for Details & Specs</span>
                <Maximize2 class="w-3.5 h-3.5" />
              </div>
            </div>

            <!-- 2. Metrics Sheet -->
            <div v-else-if="sheet.type === 'metrics'" class="space-y-1.5 py-1 text-left">
              <span class="text-[10px] font-mono font-bold uppercase text-slate-400 block">KEY PROJECT METRICS</span>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(m, mIdx) in sheet.items.slice(0, 2)"
                  :key="mIdx"
                  class="p-2 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <span class="text-[9px] font-mono text-slate-500 block truncate">{{ m.label }}</span>
                  <span class="text-xs sm:text-sm font-bold text-slate-900 font-mono">{{ m.value }}</span>
                </div>
              </div>
            </div>

            <!-- 3. Architecture Sheet -->
            <div v-else-if="sheet.type === 'arch'" class="space-y-1.5 py-1 text-left">
              <div class="space-y-1 text-[11px] font-mono">
                <div class="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <ShieldCheck class="w-3.5 h-3.5 text-emerald-600" />
                  <span>{{ sheet.security }}</span>
                </div>
                <div class="flex items-center gap-1.5 text-slate-600">
                  <Layers class="w-3.5 h-3.5 text-sky-600" />
                  <span>{{ sheet.framework }}</span>
                </div>
              </div>
              <div class="flex flex-wrap gap-1 pt-1">
                <span
                  v-for="(t, tIdx) in project.tags.slice(0, 3)"
                  :key="tIdx"
                  class="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {{ t }}
                </span>
              </div>
            </div>

            <!-- 4. Preview / Live URL Sheet -->
            <div v-else class="space-y-1.5 py-1 text-left">
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-600 truncate">
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
              :class="sheet.type === 'action' ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'"
            >
              <span>{{ project.id }}</span>
              <span class="font-bold text-amber-500">#0{{ sIdx + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- 3. FRONT PANEL: SOLID PURE WHITE POCKET (100% Opaque - No transparency bleed!) -->
        <div
          class="gfc-front absolute left-0 z-20 overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(15,23,42,0.14)]"
          :style="{
            top: FRONT_TOP + 'px',
            width: W + 'px',
            height: FRONT_H + 'px',
            clipPath: `path('${FRONT_PATH}')`,
            WebkitClipPath: `path('${FRONT_PATH}')`,
          }"
          @click="toggleOpen"
        >
          <!-- 100% OPAQUE SOLID WHITE BACKGROUND -->
          <div class="absolute inset-0 bg-white"></div>
          
          <!-- Subtle clean paper gradient sheen -->
          <div class="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#ffffff] to-[#f8fafc] pointer-events-none"></div>

          <!-- Front Pocket Perimeter Stroke SVG -->
          <svg
            class="absolute inset-0 w-[360px] pointer-events-none z-10"
            :style="{ height: FRONT_H + 'px' }"
            viewBox="0 0 360 204"
            fill="none"
          >
            <path
              :d="FRONT_PATH"
              stroke="#e2e8f0"
              stroke-width="1.8"
            />
          </svg>

          <!-- Front Pocket Clean Dark Typography (High Contrast & 100% Readable) -->
          <div class="relative z-20 p-6 flex flex-col justify-between h-full text-left text-slate-800">
            
            <!-- Top Status Row -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[10px] font-mono tracking-wider uppercase font-bold text-emerald-700">
                  {{ project.systemStatus || '' }}
                </span>
              </div>
            </div>

            <!-- Center: Project Title & Serial Number -->
            <div class="space-y-1.5 pt-2">
              <div class="flex items-center gap-2">
                <span class="font-poster text-3xl text-crimson-600 tracking-wider leading-none">
                  0{{ index + 1 }}
                </span>
                <span class="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  // {{ project.category }}
                </span>
              </div>

              <h3 class="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
                {{ project.title }}
              </h3>
            </div>

            <!-- Bottom: Tech Stack Chips & Action Trigger -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div class="flex flex-wrap gap-1.5 max-w-[210px]">
                <span
                  v-for="(tag, tIdx) in project.tags.slice(0, 3)"
                  :key="tIdx"
                  class="px-2 py-0.5 rounded-lg text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="project.tags.length > 3"
                  class="px-1.5 py-0.5 rounded-lg text-[10px] font-mono bg-amber-50 border border-amber-200 text-amber-700 font-bold"
                >
                  +{{ project.tags.length - 3 }}
                </span>
              </div>

              <!-- Interactive Key Trigger Button -->
              <button
                type="button"
                class="w-10 h-10 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(220,38,38,0.35)] transition-all hover:scale-110 active:scale-95 cursor-pointer z-30"
                title="Open Dossier / Modal"
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

/* 3D Mechanical Tilt */
.gfc-tilt {
  transform: perspective(1400px) rotateX(calc(var(--gfc-py) * -3deg)) rotateY(calc(var(--gfc-px) * 4deg));
  transition: transform 0.6s var(--gfc-ease);
}

/* Front White Folder Panel Hinged at Bottom Edge */
.gfc-front {
  transform-origin: 50% 100%;
  transform: perspective(800px) rotateX(var(--gfc-hinge));
  transition: transform 0.7s var(--gfc-spring), box-shadow 0.6s var(--gfc-ease);
}

/* Hover State: Front pocket tilts open slightly, sheets peek out */
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

/* Open State: Front pocket swings forward, sheets rise high and fan out! */
.gfc-open {
  --gfc-hinge: -24deg;
  --gfc-lift: -94px;
  --gfc-spread: 38px;
  --gfc-fan: 5.2deg;
}

.gfc-open .gfc-front {
  box-shadow: 0 25px 45px -10px rgba(15, 23, 42, 0.22);
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
  box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.28) !important;
  z-index: 25 !important;
}

@media (max-width: 380px) {
  .gfc-stage {
    transform: scale(0.9);
    transform-origin: top center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gfc-root *, .gfc-tilt, .gfc-front, .gfc-sheet {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
</style>
