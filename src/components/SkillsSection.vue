<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Layout,
  Sparkles,
  Server,
  Cpu,
  CheckCircle2,
  Terminal,
} from 'lucide-vue-next'
import { skillCategories } from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

const skillsRef = ref(null)

const getIcon = (iconName) => {
  switch (iconName) {
    case 'Layout':
      return Layout
    case 'Sparkles':
      return Sparkles
    case 'Server':
      return Server
    case 'Cpu':
      return Cpu
    default:
      return Terminal
  }
}

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header reveal
    gsap.from('.skills-header', {
      scrollTrigger: {
        trigger: skillsRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Category cards reveal
    gsap.from('.skill-category-card', {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 75%',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    })

    // Animate progress bars on scroll
    const bars = document.querySelectorAll('.skill-progress-bar')
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-level') + '%'
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: targetWidth,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
          },
        }
      )
    })
  }, skillsRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="skills"
    ref="skillsRef"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header -->
    <div class="skills-header mb-16">
      <div class="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-widest uppercase mb-2">
        <span class="text-slate-500">//</span>
        <span>02. SKILLS & EXPERTISE</span>
        <div class="h-px bg-cyan-500/30 flex-grow max-w-[120px]"></div>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
        Toolkit & <span class="cyber-gradient-text">Arsitektur Teknologi</span>.
      </h2>
      <p class="text-slate-400 text-sm sm:text-base max-w-2xl mt-3">
        Kombinasi teknologi modern untuk membangun produk web dari lapisan antarmuka grafis 3D interaktif hingga kestabilan infrastruktur server.
      </p>
    </div>

    <!-- Skills Category Grid -->
    <div class="skills-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="cat in skillCategories"
        :key="cat.id"
        class="skill-category-card rounded-2xl glass-panel p-6 sm:p-7 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-glass relative group"
      >
        <!-- Top Accent Glow line -->
        <div class="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-cyan-400/80 transition-all duration-300"></div>

        <!-- Category Title & Icon -->
        <div class="flex items-start gap-4 mb-4">
          <div class="w-11 h-11 rounded-xl bg-cyber-surfaceLight border border-cyan-500/30 flex items-center justify-center text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all">
            <component :is="getIcon(cat.icon)" class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-display font-bold text-xl text-white group-hover:text-neon-cyan transition-colors">
              {{ cat.title }}
            </h3>
            <p class="text-xs text-slate-400 mt-1 font-sans">
              {{ cat.description }}
            </p>
          </div>
        </div>

        <!-- Skills Progress List -->
        <div class="space-y-4 pt-3">
          <div
            v-for="(skill, sIdx) in cat.skills"
            :key="sIdx"
            class="space-y-1.5"
          >
            <div class="flex items-center justify-between text-xs font-mono">
              <div class="flex items-center gap-2">
                <span class="text-slate-200 font-medium">{{ skill.name }}</span>
                <span class="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-400">
                  {{ skill.tag }}
                </span>
              </div>
              <span class="text-neon-cyan font-semibold">{{ skill.level }}%</span>
            </div>

            <!-- Progress Track -->
            <div class="w-full h-1.5 rounded-full bg-cyber-surfaceLight overflow-hidden border border-white/5">
              <div
                class="skill-progress-bar h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(0,240,255,0.6)]"
                :data-level="skill.level"
                style="width: 0%"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
