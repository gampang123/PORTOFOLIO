<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  X,
  ExternalLink,
  Github,
  CheckCircle,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-vue-next'

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

const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-3xl rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] p-6 sm:p-8 my-8 text-left bg-cyber-surface/95 overflow-hidden"
        >
          <!-- Close button -->
          <button
            @click="emit('close')"
            class="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors"
            aria-label="Tutup Modal"
          >
            <X class="w-5 h-5 text-neon-cyan" />
          </button>

          <!-- Modal Header -->
          <div class="mb-6">
            <div class="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-wider mb-2">
              <span class="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                {{ project.category }}
              </span>
              <span v-if="project.featured" class="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300">
                ★ FEATURED
              </span>
            </div>
            <h3 class="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {{ project.title }}
            </h3>
          </div>

          <!-- Project Visual Banner -->
          <div
            class="w-full h-52 sm:h-64 rounded-xl mb-6 relative overflow-hidden bg-gradient-to-br flex items-center justify-center border border-white/10"
            :class="project.imageGradient"
          >
            <div class="absolute inset-0 cyber-grid-bg opacity-40"></div>
            <div class="relative z-10 flex flex-col items-center p-4 text-center">
              <Terminal class="w-12 h-12 text-white/70 mb-2" />
              <p class="font-mono text-xs text-cyan-300 tracking-wider">
                LIVE PRODUCTION // REPO INSPECTED
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-4 mb-6">
            <div>
              <h4 class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Ikhtisar Proyek
              </h4>
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                {{ project.longDescription || project.shortDescription }}
              </p>
            </div>

            <!-- Key Highlights -->
            <div v-if="project.highlights && project.highlights.length">
              <h4 class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Pencapaian & Fitur Unggulan
              </h4>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li
                  v-for="(hl, hIdx) in project.highlights"
                  :key="hIdx"
                  class="flex items-start gap-2 text-xs font-sans text-slate-300 p-2 rounded-lg bg-white/5 border border-white/5"
                >
                  <CheckCircle class="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                  <span>{{ hl }}</span>
                </li>
              </ul>
            </div>

            <!-- Tech Stack Tags -->
            <div>
              <h4 class="font-mono text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Tech Stack
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(tag, tIdx) in project.tags"
                  :key="tIdx"
                  class="px-3 py-1 rounded-md text-xs font-mono bg-cyber-surfaceLight border border-white/10 text-cyan-300"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <a
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan text-slate-950 font-mono font-bold text-xs tracking-wider shadow-neon-cyan hover:bg-white hover:scale-105 transition-all"
            >
              <ExternalLink class="w-4 h-4" />
              <span>LIVE DEMO</span>
            </a>
            <a
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-surfaceLight border border-white/15 text-slate-200 hover:text-neon-cyan hover:border-cyan-500/40 font-mono font-semibold text-xs tracking-wider transition-all"
            >
              <Github class="w-4 h-4" />
              <span>VIEW SOURCE</span>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
