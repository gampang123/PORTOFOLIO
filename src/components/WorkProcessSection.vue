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
  'JavaScript',
  'TypeScript',
  'Go',
  'MySQL',
  'PostgreSQL',
  'Tailwind CSS',
  'Bootstrap',
  'jQuery',
  'REST API',
  'OWASP SAMM',
  'Docker',
  'Git'
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
    desc: 'Conducting OWASP security reviews, query profiling, edge-case validation, and performance tuning.'
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
      <div class="lg:col-span-4 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#09090b] border border-white/10 shadow-2xl relative overflow-hidden group">
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
                <span class="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-crimson-600 ring-4 ring-[#09090b]"></span>
                <div class="flex justify-between items-baseline">
                  <h4 class="font-bold text-white text-sm tracking-tight">{{ edu.institution }}</h4>
                  <span class="text-[10px] font-mono text-crimson-500/80">{{ edu.period }}</span>
                </div>
                <p class="text-xs text-neutral-400 mt-0.5">{{ edu.major }}</p>
              </div>
            </div>
          </div>

          <!-- Skills Sub-block -->
          <div>
            <span class="text-[11px] font-mono tracking-widest text-crimson-500 uppercase font-bold flex items-center gap-2 mb-3">
              <Sparkles class="w-3.5 h-3.5" />
              CORE STACK & TOOLS
            </span>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, sIdx) in skillsList"
                :key="sIdx"
                class="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/10 text-neutral-300 hover:border-crimson-500/50 hover:text-white hover:bg-crimson-600/10 transition-all cursor-default"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- Bottom verification note -->
        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>OWASP Top 10 • SAMM</span>
          <span class="text-neutral-400">YOGYAKARTA, ID</span>
        </div>
      </div>

      <!-- COLUMN 2: WORK PROCESS (5 Cols) -->
      <div class="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#09090b] border border-white/10 shadow-2xl relative overflow-hidden">
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

        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>HIGH-STANDARD WORKFLOW</span>
          <span class="text-crimson-500 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-crimson-600 animate-pulse"></span>
            PRODUCTION READY
          </span>
        </div>
      </div>

      <!-- COLUMN 3: PHILOSOPHY QUOTE CARD (3 Cols - Crimson / Luxury Dark) -->
      <div class="lg:col-span-3 flex flex-col justify-between p-7 rounded-2xl bg-gradient-to-b from-[#2a0808] via-[#1a0404] to-[#0d0101] border border-crimson-900/60 shadow-2xl relative overflow-hidden group">
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
            "Good design and architecture is not just how it looks, but how reliably it performs, scales, and protects data."
          </p>

          <!-- Signature matching reference -->
          <div class="space-y-1">
            <div class="font-script text-3xl sm:text-4xl text-crimson-400 select-none tracking-wide">
              Gampang Rozaki
            </div>
            <p class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              FULL-STACK DEVELOPER
            </p>
          </div>
        </div>

        <!-- Bottom Action CTA -->
        <div class="pt-8 mt-8 border-t border-crimson-900/40">
          <p class="text-xs font-mono uppercase tracking-widest text-crimson-300 font-semibold mb-3">
            LET'S CREATE SOMETHING GREAT TOGETHER.
          </p>
          <a
            href="#contact"
            class="inline-flex items-center gap-2 text-xs font-mono text-white bg-crimson-600 hover:bg-crimson-500 px-4 py-2.5 rounded-lg font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] group/btn"
          >
            <span>START A PROJECT</span>
            <ArrowRight class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
