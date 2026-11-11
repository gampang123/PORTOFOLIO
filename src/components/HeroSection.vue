<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import {
  ArrowRight,
  Sparkles,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Send,
  Code2,
  Globe,
  Activity
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

const heroRef = ref(null)

const triggerAirplane = () => {
  window.dispatchEvent(new CustomEvent('launch-airplane'))
}

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-title-part', {
      opacity: 0,
      y: 25,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.1
    })
      .from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.5')
      .from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.5')
      .from('.hero-3d-card', {
        opacity: 0,
        scale: 0.92,
        y: 35,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.6')
  }, heroRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative z-10 min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
      
      <!-- LEFT COLUMN: Dynamic Asymmetrical Editorial Copy & Actions (7 Cols) -->
      <div class="lg:col-span-7 space-y-6 text-left">
        <div class="space-y-2">
          <div class="hero-title-part font-script text-3xl sm:text-4xl text-amber-300 font-bold tracking-wide drop-shadow-md">
            Hello, I'm
          </div>
          
          <h1 class="hero-title-part font-poster text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.9] drop-shadow-lg">
            GAMPANG <span class="text-amber-300">ROZAKI</span>
          </h1>

          <div class="hero-title-part flex items-center gap-3 pt-1">
            <span class="w-8 h-1 bg-amber-400 rounded-full"></span>
            <h2 class="text-sm sm:text-base font-mono tracking-widest text-white/90 uppercase font-bold drop-shadow-sm">
              FULL-STACK DEVELOPER & SYSTEM ARCHITECT
            </h2>
          </div>
        </div>

        <!-- Description Paragraph that Breathes -->
        <p class="hero-desc text-sm sm:text-base text-white/90 leading-relaxed font-sans max-w-xl drop-shadow-sm">
          Spesialis rekayasa perangkat lunak dan sistem web berbasis <strong class="text-white font-semibold">Laravel & PHP</strong>. Berpengalaman membangun ekosistem hotel management system, platform SaaS multi-tenant, dan integrasi API pihak ketiga dengan standar keamanan andal.
        </p>

        <!-- Location & Availability Micro-Chips -->
        <div class="hero-desc flex flex-wrap items-center gap-2.5 text-xs font-mono text-white/90 pt-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 border border-white/25 backdrop-blur-md shadow-sm">
            <MapPin class="w-3.5 h-3.5 text-amber-300" />
            <span>YOGYAKARTA, INDONESIA</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 border border-white/25 backdrop-blur-md shadow-sm">
            <ShieldCheck class="w-3.5 h-3.5 text-emerald-300" />
            <span>OWASP TOP 10 COMPLIANT</span>
          </div>
        </div>

        <!-- Interactive Action Buttons -->
        <div class="hero-actions flex flex-wrap items-center gap-3.5 pt-4">
          <a
            v-magnetic="{ strength: 0.35, innerStrength: 0.2 }"
            href="#projects"
            class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-[0_4px_25px_rgba(220,38,38,0.5)] cursor-pointer will-change-transform"
          >
            <span>EXPLORE SELECTED WORK</span>
            <ArrowRight data-magnetic-inner class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            v-magnetic="{ strength: 0.3, innerStrength: 0.2 }"
            :href="personalData.cvUrl"
            download="CV_Gampang_Rozaki_2026.pdf"
            target="_blank"
            class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-mono text-xs font-semibold tracking-wider backdrop-blur-md transition-all shadow-sm cursor-pointer will-change-transform"
          >
            <Download data-magnetic-inner class="w-4 h-4 text-amber-300" />
            <span>RESUME 2026</span>
          </a>

          <a
            v-magnetic="{ strength: 0.3, innerStrength: 0.2 }"
            href="#contact"
            class="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-mono text-xs font-semibold tracking-wider backdrop-blur-md transition-all shadow-sm cursor-pointer will-change-transform"
          >
            <Mail data-magnetic-inner class="w-3.5 h-3.5 text-amber-300" />
            <span>LET'S CONNECT</span>
          </a>

          <!-- Social Icons -->
          <div class="flex items-center gap-2 pl-2 border-l border-white/20">
            <a
              v-magnetic="{ strength: 0.4 }"
              :href="personalData.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-xl bg-white/15 border border-white/25 text-white hover:bg-white/30 transition-colors shadow-sm cursor-pointer will-change-transform"
              aria-label="GitHub"
            >
              <Github class="w-4 h-4" />
            </a>
            <a
              v-magnetic="{ strength: 0.4 }"
              :href="personalData.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 rounded-xl bg-white/15 border border-white/25 text-white hover:bg-white/30 transition-colors shadow-sm cursor-pointer will-change-transform"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Key Metric Badges Strip -->
        <div class="hero-actions pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg">
          <div>
            <div class="font-poster text-3xl sm:text-4xl text-amber-300 leading-none">1+</div>
            <p class="text-[10px] font-mono tracking-widest uppercase text-white/80 mt-1">YEARS EXP</p>
          </div>
          <div>
            <div class="font-poster text-3xl sm:text-4xl text-white leading-none">7+</div>
            <p class="text-[10px] font-mono tracking-widest uppercase text-white/80 mt-1">PROJECTS</p>
          </div>
          <div>
            <div class="font-poster text-3xl sm:text-4xl text-amber-300 leading-none">90%+</div>
            <p class="text-[10px] font-mono tracking-widest uppercase text-white/80 mt-1">TRANSACTION RATE</p>
          </div>
        </div>

      </div>

      <!-- RIGHT COLUMN: Interactive 3D Aviation Glass Portal Card (5 Cols) -->
      <div class="lg:col-span-5 flex items-center justify-center relative">
        
        <!-- Ambient Sun Glow behind Portal -->
        <div class="absolute -inset-4 bg-gradient-to-r from-amber-400/20 via-sky-300/30 to-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 3D Interactive Tilt Glass Portal Card -->
        <div
          v-tilt="{ max: 8, perspective: 1000, scale: 1.02 }"
          class="hero-3d-card group relative w-full max-w-sm sm:max-w-md rounded-3xl bg-gradient-to-b from-white/30 via-white/15 to-white/10 border border-white/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(10,35,75,0.35)] p-4 select-none will-change-transform animate-float-gentle"
        >
          <!-- Specular Light Reflection at Top of Glass -->
          <div class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/35 to-transparent rounded-t-3xl pointer-events-none"></div>

          <!-- Inner Image Frame with Soft Cloud Aura & Sky Image -->
          <div class="relative w-full h-[400px] sm:h-[460px] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-400/25 via-sky-300/10 to-[#0e244d]/60 flex items-end justify-center">
            
            <!-- Soft glowing cloud aura behind portrait -->
            <div class="absolute inset-x-8 top-10 bottom-16 rounded-full bg-sky-200/30 blur-3xl pointer-events-none"></div>

            <!-- Portrait Photo seamlessly blended with theme sky -->
            <img
              src="/gampang-sky.jpg"
              alt="Gampang Rozaki"
              class="relative z-0 w-full h-full object-cover object-top filter contrast-[1.02] brightness-100 transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <!-- Ambient depth gradient at bottom of frame -->
            <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e244d]/85 via-[#0e244d]/30 to-transparent pointer-events-none z-10"></div>

            <!-- Nameplate Pill inside frame -->
            <div class="absolute bottom-3.5 inset-x-3.5 z-20 p-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-between text-xs font-mono text-white shadow-lg">
              <div>
                <p class="font-bold text-white tracking-wide">GAMPANG ROZAKI</p>
                <p class="text-[10px] text-amber-300 font-semibold">Full Stack Web Developer</p>
              </div>
              <div class="w-8 h-8 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center">
                <Code2 class="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes floatGentle {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-12px) rotate(0.6deg);
  }
}

.animate-float-gentle {
  animation: floatGentle 5.5s ease-in-out infinite;
}
</style>
