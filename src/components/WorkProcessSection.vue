<script setup>
import { ref } from 'vue'
import {
  Compass,
  GitBranch,
  Code2,
  ShieldCheck,
  Rocket,
  GraduationCap,
  Sparkles,
  Quote,
  CheckCircle2,
  ArrowRight
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

const skillsList = [
  'Laravel',
  'PHP',
  'MySQL',
  'REST API',
  'JavaScript',
  'Tailwind CSS',
  'Bootstrap',
  'jQuery',
  'Next.js',
  'Vue.js',
  'Go',
  'Solidity',
  'WordPress',
  'Git',
  'Postman',
  'Payment Gateway'
]

const steps = [
  {
    num: '01',
    title: 'DISCOVER',
    icon: Compass,
    desc: 'Understanding business goals, user personas, domain workflows, and technical constraints.'
  },
  {
    num: '02',
    title: 'ARCHITECTURE',
    icon: GitBranch,
    desc: 'Schema modeling, modular system design, API contracts, and secure-by-design baseline.'
  },
  {
    num: '03',
    title: 'DEVELOP',
    icon: Code2,
    desc: 'Writing clean, testable backend code in Laravel/PHP and crafting responsive, fast frontend interfaces.'
  },
  {
    num: '04',
    title: 'AUDIT & HARDENING',
    icon: ShieldCheck,
    desc: 'Review system, query profiling, edge-case validation, and performance tuning.'
  },
  {
    num: '05',
    title: 'DELIVER & SCALE',
    icon: Rocket,
    desc: 'Seamless server deployment, automated CI/CD pipeline, documentation, and ongoing maintenance.'
  }
]
</script>

<template>
  <section id="process" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
    <!-- Grid matching the editorial reference layout: Education & Skills (Left) | Work Process (Center) | Quote Card (Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      <!-- COLUMN 1: EDUCATION & SKILLS (4 Cols) -->
      <div
        v-tilt="{ max: 4, scale: 1.01 }"
        class="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0e244d]/80 border border-white/20 shadow-2xl relative overflow-hidden group will-change-transform backdrop-blur-xl"
      >
        <!-- Top subtle red accent glow -->
        <div class="absolute -top-16 -left-16 w-36 h-36 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <!-- Section Title -->
          <div class="flex items-center gap-2 mb-6">
            <span class="w-1.5 h-4 bg-crimson-600 rounded-sm"></span>
            <h3 class="font-poster text-2xl tracking-wider text-white uppercase">
              EDUCATION & SKILLS
            </h3>
          </div>

          <!-- Education Sub-block -->
          <div class="space-y-4 mb-8">
            <span class="text-[11px] font-mono tracking-widest text-crimson-500 uppercase font-bold flex items-center gap-2">
              <GraduationCap class="w-3.5 h-3.5" />
              EDUCATION
            </span>

            <div class="space-y-4 border-l border-white/10 pl-4 ml-1">
              <div v-for="(edu, idx) in personalData.education" :key="idx" class="relative group/item">
                <span class="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-crimson-600 ring-4 ring-[#0e244d]"></span>
                <div class="flex justify-between items-baseline">
                  <h4 class="font-bold text-white text-sm tracking-tight">{{ edu.institution }}</h4>
                  <span class="text-[10px] font-mono text-crimson-500/80">{{ edu.period }}</span>
                </div>
                <p class="text-xs text-white/80 mt-0.5">{{ edu.major }}</p>
              </div>
            </div>
          </div>

          <!-- Skills Sub-block -->
          <div>
            <span class="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-bold flex items-center gap-2 mb-3">
              <Sparkles class="w-3.5 h-3.5" />
              CORE STACK & TOOLS
            </span>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, sIdx) in skillsList"
                :key="sIdx"
                v-magnetic="{ strength: 0.2 }"
                class="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/15 border border-white/20 text-white/90 hover:border-amber-300 hover:text-white hover:bg-white/25 transition-colors cursor-default will-change-transform inline-block"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 2: WORK PROCESS (5 Cols) -->
      <div
        v-tilt="{ max: 4, scale: 1.01 }"
        class="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0e244d]/80 border border-white/20 shadow-2xl relative overflow-hidden will-change-transform backdrop-blur-xl"
      >
        <div>
          <!-- Section Title -->
          <div class="flex items-center gap-2 mb-6">
            <span class="w-1.5 h-4 bg-crimson-600 rounded-sm"></span>
            <h3 class="font-poster text-2xl tracking-wider text-white uppercase">
              WORK PROCESS
            </h3>
          </div>

          <!-- 5-Step Process Timeline matching Reference 1 -->
          <div class="relative pl-12 space-y-6">
            <!-- Connecting vertical line -->
            <div class="absolute left-4 top-2 bottom-4 w-px bg-white/10"></div>

            <div
              v-for="(step, sIdx) in steps"
              :key="sIdx"
              class="relative group"
            >
              <!-- Step Number Badge in Circle -->
              <div class="absolute -left-12 top-0.5 w-8 h-8 rounded-full bg-[#121215] border border-white/20 group-hover:border-crimson-500 flex items-center justify-center text-xs font-mono font-bold text-neutral-300 group-hover:text-white group-hover:bg-crimson-600/20 transition-all shadow-sm">
                {{ step.num }}
              </div>

              <div>
                <h4 class="font-mono text-xs uppercase tracking-widest font-bold text-white group-hover:text-crimson-500 transition-colors flex items-center gap-2">
                  <span>{{ step.title }}</span>
                  <component :is="step.icon" class="w-3.5 h-3.5 text-neutral-500 group-hover:text-crimson-500 transition-colors" />
                </h4>
                <p class="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {{ step.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN 3: PHILOSOPHY QUOTE CARD (3 Cols - Sky Luxury Dark) -->
      <div
        v-tilt="{ max: 4, scale: 1.01 }"
        class="lg:col-span-3 flex flex-col justify-between p-7 rounded-2xl bg-gradient-to-b from-[#13326b] via-[#0d234d] to-[#081736] border border-sky-400/30 shadow-2xl relative overflow-hidden group will-change-transform backdrop-blur-xl"
      >
        <!-- Crimson ambient highlights -->
        <div class="absolute top-0 right-0 w-44 h-44 bg-crimson-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-crimson-800/20 rounded-full blur-2xl pointer-events-none"></div>

        <div>
          <!-- Big Quote Icon -->
          <div class="w-12 h-12 rounded-xl bg-crimson-600/20 border border-crimson-500/40 flex items-center justify-center text-crimson-500 mb-6">
            <Quote class="w-6 h-6 rotate-180" />
          </div>

          <!-- Quote Text -->
          <p class="text-base sm:text-lg text-neutral-100 font-sans leading-relaxed tracking-tight mb-8">
            "Life is about choices; when you choose not to choose, that in itself is your choice."
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
