<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import {
  X,
  ExternalLink,
  Github,
  CheckCircle,
  Layers,
  Sparkles,
  Terminal,
  ShieldCheck,
  Database,
  Cpu,
  ArrowUpRight,
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
        class="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#0a1e3d]/80 backdrop-blur-xl"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-white/30 shadow-[0_25px_60px_rgba(10,35,75,0.4)] bg-gradient-to-b from-[#18457c]/95 to-[#0f2d54]/95 backdrop-blur-2xl text-left overflow-hidden my-auto"
        >
          <!-- Modal Top Bar -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/15">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/15 border border-white/20 text-white font-semibold">
                {{ project.category }}
              </span>
              <span v-if="project.featured" class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-amber-400/25 border border-amber-300/35 text-amber-200 font-bold">
                ★ FEATURED
              </span>
              <h3 class="text-lg sm:text-xl font-display font-bold text-white tracking-tight truncate max-w-md">
                {{ project.title }}
              </h3>
            </div>

            <button
              @click="emit('close')"
              class="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Tutup Modal"
            >
              <X class="w-5 h-5 text-white" />
            </button>
          </div>

          <!-- Modal Scrollable Content Body -->
          <div class="overflow-y-auto p-6 space-y-6 flex-grow">
            <!-- Project Interface Preview Screen -->
            <div class="rounded-2xl border border-white/20 overflow-hidden shadow-2xl h-64 sm:h-80 w-full bg-[#133560]">
              <ProjectPreviewDisplay :project="project" :is-modal="true" />
            </div>

            <!-- Modal Navigation Tabs -->
            <div class="flex border-b border-white/15 gap-2 pb-1">
              <button
                @click="activeTab = 'overview'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'overview'
                    ? 'bg-white/25 text-white font-bold border border-white/30 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10',
                ]"
              >
                Ikhtisar & Solusi
              </button>
              <button
                @click="activeTab = 'features'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'features'
                    ? 'bg-white/25 text-white font-bold border border-white/30 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10',
                ]"
              >
                Pencapaian & Fitur
              </button>
              <button
                @click="activeTab = 'architecture'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-xl cursor-pointer"
                :class="[
                  activeTab === 'architecture'
                    ? 'bg-white/25 text-white font-bold border border-white/30 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10',
                ]"
              >
                Arsitektur & Spesifikasi
              </button>
            </div>

            <!-- Tab 1: Overview -->
            <div v-if="activeTab === 'overview'" class="space-y-4">
              <p class="text-white/90 text-sm sm:text-base leading-relaxed font-sans">
                {{ project.longDescription || project.shortDescription }}
              </p>

              <!-- Key Metrics Strip -->
              <div v-if="project.metrics && project.metrics.length" class="grid grid-cols-3 gap-3 pt-2">
                <div
                  v-for="(metric, mIdx) in project.metrics"
                  :key="mIdx"
                  class="p-3.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md"
                >
                  <span class="text-[11px] font-mono text-sky-200 block font-semibold">{{ metric.label }}</span>
                  <span class="text-base sm:text-lg font-bold text-white font-mono mt-0.5 block">{{ metric.value }}</span>
                </div>
              </div>
            </div>

            <!-- Tab 2: Features & Highlights -->
            <div v-if="activeTab === 'features'" class="space-y-3">
              <div
                v-for="(hl, hIdx) in project.highlights"
                :key="hIdx"
                class="flex items-start gap-3 p-3.5 rounded-xl bg-white/15 border border-white/20 text-xs sm:text-sm text-white/95"
              >
                <CheckCircle class="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                <span>{{ hl }}</span>
              </div>
            </div>

            <!-- Tab 3: Architecture & Tech Specs -->
            <div v-if="activeTab === 'architecture'" class="space-y-3">
              <div v-if="project.architectureDetails" class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-3.5 rounded-xl bg-white/15 border border-white/20 space-y-1">
                  <span class="text-sky-200 uppercase text-[10px] block font-semibold">FRAMEWORK / LAYER</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.framework }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-white/15 border border-white/20 space-y-1">
                  <span class="text-sky-200 uppercase text-[10px] block font-semibold">DATABASE ENGINE</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.database }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-white/15 border border-white/20 space-y-1">
                  <span class="text-sky-200 uppercase text-[10px] block font-semibold">SECURITY STANDARDS</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.security }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-white/15 border border-white/20 space-y-1">
                  <span class="text-sky-200 uppercase text-[10px] block font-semibold">INTEGRATION & API</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.integration }}</span>
                </div>
              </div>

              <!-- Tech Stack Tags -->
              <div class="pt-2">
                <h4 class="font-mono text-xs font-semibold uppercase tracking-wider text-sky-200 mb-2">
                  Tags & Teknologi Terpasang
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, tIdx) in project.tags"
                    :key="tIdx"
                    class="px-3 py-1 rounded-lg text-xs font-mono bg-white/15 border border-white/20 text-white font-medium"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Action Footer -->
          <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/20 bg-white/10">
            <div class="text-xs font-mono text-white/80">
              Status: <span class="text-amber-300 font-semibold">{{ project.systemStatus || 'Active' }}</span>
            </div>

            <div class="flex items-center gap-3">
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 border border-white/25 text-white hover:bg-white/25 font-mono text-xs font-semibold transition-all shadow-sm"
              >
                <Github class="w-4 h-4" />
                <span>Source Code</span>
              </a>

              <a
                v-if="project.demoUrl && project.demoUrl !== '#'"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold shadow-[0_4px_15px_rgba(220,38,38,0.4)] transition-all"
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
