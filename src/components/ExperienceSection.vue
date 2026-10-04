<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from 'lucide-vue-next'
import { experiencesData } from '../data/experiences'

gsap.registerPlugin(ScrollTrigger)

const expRef = ref(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header reveal
    gsap.from('.experience-header', {
      scrollTrigger: {
        trigger: expRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Timeline items stagger reveal
    gsap.from('.timeline-entry', {
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 75%',
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      stagger: 0.25,
      ease: 'power3.out',
    })
  }, expRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="experience"
    ref="expRef"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header -->
    <div class="experience-header mb-16">
      <div class="flex items-center gap-2 font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
        <span class="text-neutral-600">//</span>
        <span>04. CAREER & MILESTONES</span>
        <div class="h-px bg-white/20 flex-grow max-w-[120px]"></div>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
        Rekam Jejak <span class="cyber-gradient-text">Profesional</span>.
      </h2>
      <p class="text-neutral-400 text-sm sm:text-base max-w-xl mt-3">
        Pengalaman membangun sistem web berskala produksi, memimpin arsitektur antarmuka, dan berkolaborasi dalam tim multidisiplin.
      </p>
    </div>

    <!-- Timeline Wrapper -->
    <div class="timeline-container relative max-w-4xl mx-auto pl-6 sm:pl-10">
      <!-- Vertical Glowing Line -->
      <div
        class="absolute left-2 sm:left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-white via-neutral-500 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.25)]"
      ></div>

      <div class="space-y-12">
        <div
          v-for="(exp, idx) in experiencesData"
          :key="exp.id"
          class="timeline-entry relative group"
        >
          <!-- Glowing Node on Timeline -->
          <div
            class="absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 rounded-full bg-black border-2 border-white flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.5)] group-hover:scale-125 group-hover:bg-white transition-all duration-300"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black transition-colors"></span>
          </div>

          <!-- Content Card -->
          <div
            class="p-6 sm:p-7 rounded-2xl glass-panel border border-white/10 hover:border-white/35 transition-all duration-300 shadow-glass group-hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.06)]"
          >
            <!-- Top meta row -->
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div class="flex items-center gap-2 font-mono text-xs text-neutral-300">
                <Calendar class="w-3.5 h-3.5 text-white" />
                <span>{{ exp.period }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <MapPin class="w-3.5 h-3.5 text-neutral-500" />
                <span>{{ exp.location }}</span>
              </div>
            </div>

            <!-- Role & Company -->
            <div class="mb-3">
              <h3 class="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-neutral-200 transition-colors">
                {{ exp.role }}
              </h3>
              <p class="text-sm font-mono text-neutral-400 font-medium mt-0.5">
                @ {{ exp.company }}
              </p>
            </div>

            <!-- Description -->
            <p class="text-neutral-300 text-sm leading-relaxed mb-4">
              {{ exp.description }}
            </p>

            <!-- Key Achievements -->
            <div class="space-y-2 mb-5">
              <div
                v-for="(ach, aIdx) in exp.achievements"
                :key="aIdx"
                class="flex items-start gap-2 text-xs sm:text-sm text-neutral-400"
              >
                <ChevronRight class="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>{{ ach }}</span>
              </div>
            </div>

            <!-- Technologies Chips -->
            <div class="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              <span
                v-for="(tech, tIdx) in exp.technologies"
                :key="tIdx"
                class="px-2.5 py-1 rounded-md text-xs font-mono bg-cyber-surfaceLight border border-white/10 text-neutral-300"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
