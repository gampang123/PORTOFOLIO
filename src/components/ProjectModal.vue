<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Database,
  Cpu,
  ArrowUpRight,
  FolderOpen,
} from 'lucide-vue-next'
import ProjectPreviewDisplay from './ProjectPreviewDisplay.vue'

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
const activeTab = ref('overview')

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
      activeTab.value = 'overview'
    } else {
      document.body.style.overflow = ''
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/50 backdrop-blur-md"
        @click.self="emit('close')"
      >
        <!-- Modal Card: Clean White Dossier Architectural Theme -->
        <div
          class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-slate-200/90 shadow-[0_25px_70px_rgba(15,23,42,0.32)] bg-white text-left overflow-hidden my-auto"
        >
          <!-- Modal Top Bar / Dossier Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
            <div class="flex items-center gap-2.5 flex-wrap">
              <!-- Dossier Serial Tag -->
              <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white border border-slate-200 text-slate-700 font-bold shadow-xs">
                <span class="w-2 h-2 rounded-full bg-crimson-600"></span>
                <span>DOSSIER</span>
              </span>

              <span class="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                {{ project.category }}
              </span>

              <span v-if="project.featured" class="px-2.5 py-1 rounded-full text-[11px] font-mono bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center gap-1 shadow-xs">
                ★ FEATURED
              </span>

              <h3 class="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight truncate max-w-sm sm:max-w-md ml-1">
                {{ project.title }}
              </h3>
            </div>

            <!-- Close Button -->
            <button
              @click="emit('close')"
              class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close Modal"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Scrollable Content Body -->
          <div class="overflow-y-auto p-6 space-y-6 flex-grow">
            <!-- Project Interface Preview Screen (Clean Light macOS Chrome) -->
            <div class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-64 sm:h-80 w-full bg-slate-50">
              <ProjectPreviewDisplay :project="project" :is-modal="true" />
            </div>

            <!-- Modal Navigation Tabs (Pill Segmented Control) -->
            <div class="flex border-b border-slate-100 gap-2 pb-2">
              <button
                @click="activeTab = 'overview'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'overview'
                    ? 'bg-crimson-600 text-white font-bold shadow-[0_4px_12px_rgba(220,38,38,0.3)]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-medium',
                ]"
              >
                Overview & Solutions
              </button>
              <button
                @click="activeTab = 'features'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'features'
                    ? 'bg-crimson-600 text-white font-bold shadow-[0_4px_12px_rgba(220,38,38,0.3)]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-medium',
                ]"
              >
                Achievements & Features
              </button>
              <button
                @click="activeTab = 'architecture'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'architecture'
                    ? 'bg-crimson-600 text-white font-bold shadow-[0_4px_12px_rgba(220,38,38,0.3)]'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 font-medium',
                ]"
              >
                Architecture & Specs
              </button>
            </div>

            <!-- Tab 1: Overview & Key Metrics -->
            <div v-if="activeTab === 'overview'" class="space-y-4">
              <p class="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {{ project.longDescription || project.shortDescription }}
              </p>

              <!-- Key Metrics Grid Cards -->
              <div v-if="project.metrics && project.metrics.length" class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div
                  v-for="(metric, mIdx) in project.metrics"
                  :key="mIdx"
                  class="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <span class="text-[10px] font-mono text-slate-500 block font-bold uppercase tracking-wider">{{ metric.label }}</span>
                  <span class="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-1 block">{{ metric.value }}</span>
                </div>
              </div>
            </div>

            <!-- Tab 2: Features & Deliverables -->
            <div v-if="activeTab === 'features'" class="space-y-3">
              <div
                v-for="(hl, hIdx) in project.highlights"
                :key="hIdx"
                class="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 shadow-xs hover:bg-white hover:border-slate-300 transition-all"
              >
                <div class="p-1 rounded-lg bg-emerald-50 border border-emerald-200 flex-shrink-0 mt-0.5">
                  <CheckCircle2 class="w-4 h-4 text-emerald-600" />
                </div>
                <span class="leading-relaxed font-medium">{{ hl }}</span>
              </div>
            </div>

            <!-- Tab 3: Architecture & Tech Specs -->
            <div v-if="activeTab === 'architecture'" class="space-y-4">
              <div v-if="project.architectureDetails" class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <!-- Framework Dimension -->
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div class="flex items-center gap-1.5 text-sky-700 font-bold uppercase text-[10px] tracking-wider">
                    <Layers class="w-3.5 h-3.5" />
                    <span>FRAMEWORK / LAYER</span>
                  </div>
                  <span class="text-slate-900 font-semibold text-xs sm:text-sm block">{{ project.architectureDetails.framework }}</span>
                </div>

                <!-- Database Dimension -->
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div class="flex items-center gap-1.5 text-amber-700 font-bold uppercase text-[10px] tracking-wider">
                    <Database class="w-3.5 h-3.5" />
                    <span>DATABASE ENGINE</span>
                  </div>
                  <span class="text-slate-900 font-semibold text-xs sm:text-sm block">{{ project.architectureDetails.database }}</span>
                </div>

                <!-- Security Dimension -->
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div class="flex items-center gap-1.5 text-emerald-700 font-bold uppercase text-[10px] tracking-wider">
                    <ShieldCheck class="w-3.5 h-3.5" />
                    <span>SECURITY STANDARDS</span>
                  </div>
                  <span class="text-slate-900 font-semibold text-xs sm:text-sm block">{{ project.architectureDetails.security }}</span>
                </div>

                <!-- Integration Dimension -->
                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div class="flex items-center gap-1.5 text-crimson-600 font-bold uppercase text-[10px] tracking-wider">
                    <Cpu class="w-3.5 h-3.5" />
                    <span>INTEGRATION & API</span>
                  </div>
                  <span class="text-slate-900 font-semibold text-xs sm:text-sm block">{{ project.architectureDetails.integration }}</span>
                </div>
              </div>

              <!-- Tech Stack Tags -->
              <div class="pt-2">
                <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Integrated Tech Stack & Tags
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, tIdx) in project.tags"
                    :key="tIdx"
                    class="px-3 py-1.5 rounded-xl text-xs font-mono bg-slate-100 border border-slate-200 text-slate-800 font-semibold shadow-xs hover:bg-white transition-colors"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Action Footer -->
          <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/80">
            <!-- Left: Status Indicator -->
            <div class="flex items-center gap-2 font-mono text-xs text-slate-600">
              <span class="font-semibold text-slate-500">Status:</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-emerald-700 font-bold uppercase">{{ project.systemStatus || 'Active' }}</span>
            </div>

            <!-- Right: Action Buttons -->
            <div class="flex items-center gap-3">
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-mono text-xs font-semibold transition-all shadow-xs"
              >
                <Github class="w-4 h-4" />
                <span>Source Code</span>
              </a>

              <a
                v-if="project.demoUrl && project.demoUrl !== '#'"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold shadow-[0_4px_14px_rgba(220,38,38,0.35)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.45)] transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
