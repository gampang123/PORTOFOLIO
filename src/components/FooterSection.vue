<script setup>
import { ArrowUp, Terminal, Heart } from 'lucide-vue-next'
import { personalData } from '../data/personal'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <footer class="border-t border-white/10 bg-black/90 backdrop-blur-md relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-400">
      <!-- Left Brand & Copyright -->
      <div class="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
        <a href="#hero" class="font-display font-bold text-white text-base tracking-tight hover:text-neutral-300 transition-colors">
          {{ personalData.name }}
        </a>
        <span class="hidden sm:inline-block text-neutral-600">•</span>
        <span>© {{ new Date().getFullYear() }} All Rights Reserved.</span>
      </div>

      <!-- Center Tech Credits -->
      <div class="flex items-center gap-2 text-center text-neutral-400">
        <span>Engineered with</span>
        <span class="text-white font-semibold">Vue 3</span>
        <span>•</span>
        <span class="text-neutral-300 font-semibold">Three.js</span>
        <span>•</span>
        <span class="text-neutral-400 font-semibold">GSAP</span>
      </div>

      <!-- Right Back to Top Button -->
      <div>
        <button
          @click="scrollToTop"
          class="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyber-surfaceLight border border-white/10 text-neutral-300 hover:text-white hover:border-white/40 transition-all hover:-translate-y-0.5"
          aria-label="Back to Top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp class="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  </footer>
</template>
