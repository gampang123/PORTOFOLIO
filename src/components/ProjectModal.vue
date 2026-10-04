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
        class="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.12)] bg-[#0d0d10] text-left overflow-hidden my-auto"
        >
          <!-- Modal Top Bar -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121216]/90">
            <div class="flex items-center gap-2.5">
              <span class="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 border border-white/15 text-white">
                {{ project.category }}
              </span>
              <span v-if="project.featured" class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/15 text-white font-medium">
                ★ FEATURED
              </span>
              <h3 class="text-lg sm:text-xl font-display font-bold text-white tracking-tight truncate max-w-md">
                {{ project.title }}
              </h3>
            </div>

            <button
              @click="emit('close')"
              class="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/10 transition-colors"
              aria-label="Tutup Modal"
            >
              <X class="w-5 h-5 text-white" />
            </button>
          </div>

          <!-- Modal Scrollable Content Body -->
          <div class="overflow-y-auto p-6 space-y-6 flex-grow">
            <!-- Project Interface Preview Screen -->
            <div class="rounded-xl border border-white/15 overflow-hidden shadow-2xl h-64 sm:h-80 w-full bg-black">
              <ProjectPreviewDisplay :project="project" :is-modal="true" />
            </div>

            <!-- Modal Navigation Tabs -->
            <div class="flex border-b border-white/10 gap-2 pb-1">
              <button
                @click="activeTab = 'overview'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-lg"
                :class="[
                  activeTab === 'overview'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5',
                ]"
              >
                Ikhtisar & Solusi
              </button>
              <button
                @click="activeTab = 'features'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-lg"
                :class="[
                  activeTab === 'features'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5',
                ]"
              >
                Pencapaian & Fitur
              </button>
              <button
                @click="activeTab = 'architecture'"
                class="px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-lg"
                :class="[
                  activeTab === 'architecture'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5',
                ]"
              >
                Arsitektur & Spesifikasi
              </button>
            </div>

            <!-- Tab 1: Overview -->
            <div v-if="activeTab === 'overview'" class="space-y-4">
              <p class="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {{ project.longDescription || project.shortDescription }}
              </p>

              <!-- Key Metrics Strip -->
              <div v-if="project.metrics && project.metrics.length" class="grid grid-cols-3 gap-3 pt-2">
                <div
                  v-for="(metric, mIdx) in project.metrics"
                  :key="mIdx"
                  class="p-3.5 rounded-xl bg-black/50 border border-white/10"
                >
                  <span class="text-[11px] font-mono text-neutral-400 block">{{ metric.label }}</span>
                  <span class="text-base sm:text-lg font-bold text-white font-mono mt-0.5 block">{{ metric.value }}</span>
                </div>
              </div>
            </div>

            <!-- Tab 2: Features & Highlights -->
            <div v-if="activeTab === 'features'" class="space-y-3">
              <div
                v-for="(hl, hIdx) in project.highlights"
                :key="hIdx"
                class="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-neutral-300"
              >
                <CheckCircle class="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>{{ hl }}</span>
              </div>
            </div>

            <!-- Tab 3: Architecture & Tech Specs -->
            <div v-if="activeTab === 'architecture'" class="space-y-3">
              <div v-if="project.architectureDetails" class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div class="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span class="text-neutral-500 uppercase text-[10px] block">FRAMEWORK / LAYER</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.framework }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span class="text-neutral-500 uppercase text-[10px] block">DATABASE ENGINE</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.database }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span class="text-neutral-500 uppercase text-[10px] block">SECURITY STANDARDS</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.security }}</span>
                </div>
                <div class="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span class="text-neutral-500 uppercase text-[10px] block">INTEGRATION & API</span>
                  <span class="text-white font-semibold">{{ project.architectureDetails.integration }}</span>
                </div>
              </div>

              <!-- Tech Stack Tags -->
              <div class="pt-2">
                <h4 class="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                  Tags & Teknologi Terpasang
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tag, tIdx) in project.tags"
                    :key="tIdx"
                    class="px-3 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-white"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Action Footer -->
          <div class="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-[#121216]/90">
            <div class="text-xs font-mono text-neutral-400">
              Status: <span class="text-white font-medium">{{ project.systemStatus || 'Active' }}</span>
            </div>

            <div class="flex items-center gap-3">
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-neutral-200 hover:text-white hover:border-white/40 font-mono text-xs font-semibold transition-all"
              >
                <Github class="w-4 h-4" />
                <span>Source Code</span>
              </a>

              <a
                v-if="project.demoUrl && project.demoUrl !== '#'"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-neutral-200 transition-all"
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
