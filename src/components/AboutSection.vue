<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin,
  Sparkles,
  Zap,
  Layers,
  Code2,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  GraduationCap,
  Lock,
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

gsap.registerPlugin(ScrollTrigger)

const aboutRef = ref(null)

const traits = [
  {
    icon: ShieldCheck,
    title: 'Secure SDLC & OWASP',
    description: 'Penerapan standar keamanan web OWASP Top 10 / ASVS, Secure SDLC (SAMM), dan review arsitektur aman.',
  },
  {
    icon: Layers,
    title: 'Backend & API Integration',
    description: 'Spesialisasi Laravel & PHP, manajemen database MySQL, Redis caching, dan integrasi API pihak ketiga.',
  },
  {
    icon: Zap,
    title: 'Modern Frontend & UI',
    description: 'Antarmuka responsif dan reaktif dengan Tailwind CSS, Bootstrap, jQuery, TypeScript, dan JavaScript modern.',
  },
  {
    icon: Cpu,
    title: 'Production Maintenance',
    description: 'Berpengalaman menangani maintenance sistem manajemen hotel dan platform POS SaaS multi-tenant.',
  },
]

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.about-header', {
      scrollTrigger: {
        trigger: aboutRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.about-content-left', {
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%',
      },
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out',
    })

    gsap.from('.about-card-cyber', {
      scrollTrigger: {
        trigger: '.about-grid',
        start: 'top 75%',
      },
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out',
    })

    gsap.from('.trait-item', {
      scrollTrigger: {
        trigger: '.traits-container',
        start: 'top 85%',
      },
      opacity: 0,
      y: 25,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    })
  }, aboutRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="about"
    ref="aboutRef"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header -->
    <div class="about-header mb-16">
      <div class="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-widest uppercase mb-2">
        <span class="text-slate-500">//</span>
        <span>01. ABOUT ME</span>
        <div class="h-px bg-cyan-500/30 flex-grow max-w-[120px]"></div>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
        Dedikasi Membangun Sistem <span class="cyber-gradient-text">Web Tangguh & Aman</span>.
      </h2>
    </div>

    <!-- Main Grid -->
    <div class="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
      <!-- Left Narrative -->
      <div class="about-content-left lg:col-span-7 space-y-6 text-slate-300">
        <p class="text-base sm:text-lg leading-relaxed text-slate-300">
          {{ personalData.bio }}
        </p>

        <p class="text-sm sm:text-base leading-relaxed text-slate-400">
          Memiliki fokus kuat dalam membangun solusi web yang tidak hanya andal secara fungsional, tetapi juga memprioritaskan keamanan (<em class="text-slate-200 not-italic">security by design</em>). Dengan penguasaan stack backend <strong class="text-neon-cyan font-normal">PHP & Laravel</strong>, didukung fleksibilitas <strong class="text-neon-cyan font-normal">Go, TypeScript, JavaScript</strong>, serta kemampuan integrasi API pihak ketiga (third-party API), saya terbiasa mengawal proyek dari tahap perancangan arsitektur, optimasi database, hingga deployment di lingkungan produksi.
        </p>

        <!-- Philosophy Highlight Card -->
        <div class="p-6 rounded-2xl glass-panel border-l-4 border-l-neon-cyan shadow-glass relative overflow-hidden group">
          <div class="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
          <div class="flex items-start gap-4">
            <Sparkles class="w-6 h-6 text-neon-cyan flex-shrink-0 mt-1" />
            <div>
              <h4 class="font-mono text-xs uppercase tracking-widest text-neon-cyan mb-1 font-semibold">
                Core Philosophy
              </h4>
              <p class="text-slate-200 italic font-sans text-sm sm:text-base">
                "{{ personalData.philosophy }}"
              </p>
            </div>
          </div>
        </div>

        <!-- Education & Academics Box -->
        <div class="p-6 rounded-2xl glass-panel border border-white/10 shadow-glass space-y-4">
          <div class="flex items-center gap-2 text-neon-cyan font-mono text-xs uppercase tracking-wider font-semibold">
            <GraduationCap class="w-4 h-4" />
            <span>Riwayat Pendidikan (Education)</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div
              v-for="(edu, eIdx) in personalData.education"
              :key="eIdx"
              class="p-3.5 rounded-xl bg-cyber-surfaceLight/80 border border-white/5 space-y-1"
            >
              <span class="text-[11px] font-mono text-cyan-400">{{ edu.period }}</span>
              <h4 class="font-display font-bold text-white text-sm">{{ edu.institution }}</h4>
              <p class="text-xs text-slate-400 font-sans">{{ edu.major }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Spec Pills -->
        <div class="flex flex-wrap gap-2 pt-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-white/10 text-xs font-mono text-slate-300">
            <MapPin class="w-3.5 h-3.5 text-neon-cyan" />
            <span>{{ personalData.location }}</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-white/10 text-xs font-mono text-slate-300">
            <Lock class="w-3.5 h-3.5 text-purple-400" />
            <span>OWASP Top 10 / SAMM Security</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-white/10 text-xs font-mono text-slate-300">
            <CheckCircle2 class="w-3.5 h-3.5 text-emerald-400" />
            <span>Open for Full-Time & Freelance</span>
          </div>
        </div>
      </div>

      <!-- Right Cyberpunk Avatar & Spec Card -->
      <div class="about-card-cyber lg:col-span-5 flex justify-center sticky top-28">
        <div class="relative w-full max-w-sm rounded-2xl glass-panel p-6 border border-cyan-500/30 shadow-glass-cyan overflow-hidden group">
          <!-- Cyberpunk Corner Accents -->
          <div class="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-neon-cyan pointer-events-none"></div>
          <div class="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-neon-cyan pointer-events-none"></div>
          <div class="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-neon-cyan pointer-events-none"></div>
          <div class="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-neon-cyan pointer-events-none"></div>

          <!-- Card Header Terminal -->
          <div class="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
            <span class="text-slate-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              ROZAKI_DEV.profile
            </span>
            <span class="text-neon-cyan tracking-wider">VERIFIED // 2026</span>
          </div>

          <!-- Avatar Mockup Frame -->
          <div class="my-6 relative rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-cyan-950/60 via-slate-900 to-purple-950/60 border border-white/10 flex flex-col items-center justify-center p-6 text-center group-hover:border-cyan-500/50 transition-colors">
            <!-- Grid overlay -->
            <div class="absolute inset-0 cyber-grid-bg opacity-40"></div>

            <!-- Stylized Hologram Developer Graphic -->
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-neon-cyan mb-4 transform group-hover:scale-105 transition-transform duration-300">
                <div class="w-full h-full rounded-2xl bg-cyber-bg flex items-center justify-center">
                  <Code2 class="w-12 h-12 text-neon-cyan animate-pulse-slow" />
                </div>
              </div>
              <h3 class="font-display font-bold text-white text-xl">{{ personalData.name }}</h3>
              <p class="font-mono text-xs text-neon-cyan mt-1">{{ personalData.role }}</p>
              <p class="font-mono text-[11px] text-slate-400 mt-1">Yogyakarta, Indonesia</p>
            </div>

            <!-- Holographic Scanline bar -->
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
          </div>

          <!-- Card Meta Details -->
          <div class="space-y-2.5 font-mono text-xs border-t border-white/10 pt-4">
            <div class="flex justify-between items-center text-slate-400">
              <span>SPECIALIZATION:</span>
              <span class="text-slate-200 font-semibold">Laravel, PHP & Full Stack</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>SECURITY:</span>
              <span class="text-purple-400 font-semibold">OWASP SAMM & ASVS</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>EDUCATION:</span>
              <span class="text-slate-200">AMIKOM Yogyakarta</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>STATUS:</span>
              <span class="text-emerald-400 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Active Freelance & Career
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Key Trait Cards -->
    <div class="traits-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(trait, idx) in traits"
        :key="idx"
        class="trait-item p-5 rounded-xl glass-panel glass-panel-hover border border-white/5 hover:border-cyan-500/40 transition-all duration-300"
      >
        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-neon-cyan mb-3">
          <component :is="trait.icon" class="w-5 h-5" />
        </div>
        <h4 class="font-display font-bold text-white text-base mb-1">{{ trait.title }}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">{{ trait.description }}</p>
      </div>
    </div>
  </section>
</template>
