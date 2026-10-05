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
    <div class="experience-header mb-14">
      <div class="flex items-center gap-3 mb-3">
        <span class="w-2 h-5 bg-crimson-600 rounded-sm"></span>
        <h2 class="font-poster text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider">
          PROFESSIONAL EXPERIENCE
        </h2>
      </div>
      <p class="text-neutral-400 text-xs sm:text-sm font-sans max-w-xl">
        Pengalaman membangun sistem web berskala produksi, integrasi API, arsitektur database, dan implementasi standar keamanan OWASP.
      </p>
    </div>

    <!-- Timeline Wrapper -->
    <div class="timeline-container relative max-w-4xl mx-auto pl-6 sm:pl-10">
      <!-- Vertical Line -->
      <div
        class="absolute left-2 sm:left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-crimson-600 via-neutral-700 to-transparent"
      ></div>

      <div class="space-y-10">
        <div
          v-for="(exp, idx) in experiencesData"
          :key="exp.id"
          class="timeline-entry relative group"
        >
          <!-- Node on Timeline -->
          <div
            class="absolute -left-6 sm:-left-10 top-1.5 w-5 h-5 rounded-full bg-black border-2 border-crimson-600 flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.5)] group-hover:scale-125 group-hover:bg-crimson-600 transition-all duration-300"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-crimson-500 group-hover:bg-white transition-colors"></span>
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
