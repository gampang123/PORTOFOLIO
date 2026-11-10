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
  Compass,
  MapPin,
  CheckCircle2,
  Terminal
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

const heroRef = ref(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-top-bar', {
      opacity: 0,
      y: -15,
      duration: 0.6,
      delay: 0.1
    })
      .from('.hero-backdrop-text', {
        opacity: 0,
        scale: 0.96,
        y: 20,
        duration: 1.1
      }, '-=0.3')
      .from('.hero-portrait', {
        opacity: 0,
        scale: 0.98,
        y: 30,
        duration: 1
      }, '-=0.8')
      .from('.hero-left-content > *', {
        opacity: 0,
        x: -25,
        stagger: 0.12,
        duration: 0.8
      }, '-=0.7')
      .from('.hero-right-stats > *', {
        opacity: 0,
        x: 25,
        stagger: 0.12,
        duration: 0.8
      }, '-=0.7')
  }, heroRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative z-10 min-h-[92vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
  >
    <!-- TOP META BAR (Sky Theme) -->
    <div class="hero-top-bar flex items-center justify-between border-b border-white/20 pb-4 mb-6 text-xs font-mono">
      <div class="flex items-center gap-2 text-white/90 drop-shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
        <span class="text-white font-semibold tracking-wider">FULL STACK WEB DEVELOPER</span>
        <span class="text-white/60">//</span>
        <span class="hidden sm:inline text-white/80">LARAVEL & HOTEL MANAGEMENT EXPERT</span>
      </div>

      <div class="flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-crimson-500"></span>
        </span>
        <span class="text-white font-medium tracking-wide uppercase text-[11px] drop-shadow-sm">AVAILABLE FOR FREELANCE & FULL-TIME</span>
      </div>
    </div>

    <!-- MAIN EDITORIAL HERO POSTER COMPOSITION -->
    <div class="relative flex-grow flex items-center justify-center my-auto min-h-[580px] sm:min-h-[640px]">
      
      <!-- GIANT BACKDROP CONDENSED TYPOGRAPHY ("PORTFOLIO") - Layer 1: Solid behind user -->
      <div
        class="hero-backdrop-text absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span
          class="font-poster text-[21vw] sm:text-[19vw] lg:text-[17.5vw] font-black uppercase tracking-tight text-white/20 leading-none text-center transform scale-y-110 drop-shadow-md"
        >
          PORTFOLIO
        </span>
      </div>

      <!-- CENTER USER PORTRAIT (Seamlessly cut and layered over the backdrop text) -->
      <div class="hero-portrait absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
        <div class="relative w-full max-w-md sm:max-w-lg lg:max-w-xl h-full flex items-end justify-center">
          <!-- Sun-kissed soft backlight behind user -->
          <div class="absolute bottom-16 w-3/4 h-3/4 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- User photo (pang.png) with gentle bottom fade -->
          <img
            src="/pang.png"
            alt="Gampang Rozaki - Full Stack Web Developer"
            class="relative z-10 w-auto h-[480px] sm:h-[560px] lg:h-[620px] object-contain object-bottom filter contrast-105 brightness-100 drop-shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
            style="mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%);"
          />
        </div>
      </div>

      <!-- GIANT OUTLINE CONDENSED TYPOGRAPHY ("PORTFOLIO") - Layer 2: Outlined in front of user -->
      <div
        class="hero-backdrop-text absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-15 overflow-hidden"
        style="z-index: 15;"
        aria-hidden="true"
      >
        <span
          class="font-poster text-[21vw] sm:text-[19vw] lg:text-[17.5vw] font-black uppercase tracking-tight text-stroke-white leading-none text-center transform scale-y-110 drop-shadow-sm"
        >
          PORTFOLIO
        </span>
      </div>

      <!-- FOREGROUND CONTENT: 2-COLUMN OVERLAY (Left: Bio/Name | Right: Quote/Stats) -->
      <div class="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto py-6">
        
        <!-- LEFT COLUMN: Script Intro, Huge Name, Subtitle, Bio, CTAs -->
        <div class="hero-left-content lg:col-span-6 space-y-4 max-w-xl">
          <!-- Cursive script "Hello, I'm" -->
          <div class="font-script text-3xl sm:text-4xl text-amber-300 font-bold tracking-wide drop-shadow-md">
            Hello, I'm
          </div>

          <!-- Giant Bold Condensed Name -->
          <h1 class="font-poster text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.88] drop-shadow-lg">
            GAMPANG<br />
            <span class="text-white">ROZAKI</span>
          </h1>

          <!-- Role Subtitle -->
          <div class="space-y-1 pt-1">
            <h2 class="text-xs sm:text-sm font-mono tracking-widest text-amber-300 uppercase font-bold flex items-center gap-2 drop-shadow-sm">
              <span class="w-2 h-0.5 bg-amber-300"></span>
              FULL STACK WEB DEVELOPER
            </h2>
            <p class="text-xs sm:text-sm text-white/90 leading-relaxed font-sans max-w-lg drop-shadow-sm">
              Spesialis pengembangan dan pemeliharaan aplikasi web berbasis <strong class="text-white font-semibold">Laravel & PHP</strong>, mencakup hotel management systems, arsitektur multi-tenant, dan integrasi third-party API.
            </p>
          </div>

          <!-- Availability & Location Tag -->
          <div class="flex items-center gap-2 text-xs font-mono text-white/90 pt-1">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 border border-white/25 text-white shadow-sm backdrop-blur-md">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>AVAILABLE WORLDWIDE</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 border border-white/25 text-white shadow-sm backdrop-blur-md">
              <MapPin class="w-3 h-3 text-amber-300" />
              <span>YOGYAKARTA, ID</span>
            </div>
          </div>

          <!-- Action Buttons with GSAP Magnetic Interaction -->
          <div class="flex flex-wrap items-center gap-3 pt-3">
            <a
              v-magnetic="{ strength: 0.3, innerStrength: 0.2 }"
              href="#projects"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold tracking-wider transition-colors shadow-[0_4px_20px_rgba(220,38,38,0.45)] cursor-pointer will-change-transform"
            >
              <span>SELECTED PROJECTS</span>
              <ArrowRight data-magnetic-inner class="w-4 h-4" />
            </a>

            <a
              v-magnetic="{ strength: 0.3, innerStrength: 0.2 }"
              href="#contact"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white font-mono text-xs font-semibold tracking-wider backdrop-blur-md transition-colors cursor-pointer will-change-transform shadow-sm"
            >
              <Mail data-magnetic-inner class="w-3.5 h-3.5 text-amber-300" />
              <span>LET'S CONNECT</span>
            </a>

            <!-- Quick Socials with Subtle Magnetic Float -->
            <div class="flex items-center gap-1.5 pl-2 border-l border-white/20">
              <a
                v-magnetic="{ strength: 0.4 }"
                :href="personalData.socials.github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-lg bg-white/15 border border-white/25 text-white hover:bg-white/30 transition-colors cursor-pointer will-change-transform shadow-sm"
                aria-label="GitHub"
              >
                <Github class="w-4 h-4" />
              </a>
              <a
                v-magnetic="{ strength: 0.4 }"
                :href="personalData.socials.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2.5 rounded-lg bg-white/15 border border-white/25 text-white hover:bg-white/30 transition-colors cursor-pointer will-change-transform shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sparkle Tagline & Vertical Stats Strip -->
        <div class="hero-right-stats lg:col-span-6 flex flex-col items-start lg:items-end justify-between h-full space-y-8 lg:space-y-0">
          <!-- Sparkle Mini-Card (Frosted Glass on Sky) -->
          <div class="p-4 rounded-xl bg-white/15 border border-white/25 backdrop-blur-md max-w-xs space-y-1.5 text-left shadow-lg text-white">
            <div class="flex items-center gap-2 text-amber-300">
              <Sparkles class="w-4 h-4" />
              <span class="text-[11px] font-mono tracking-widest font-bold uppercase text-white">DIGITAL EXCELLENCE</span>
            </div>
            <p class="text-xs text-white/90 leading-snug">
              Turning complex system requirements into powerful, high-speed, and secure digital realities.
            </p>
          </div>

          <!-- Vertical Stats Strip -->
          <div class="space-y-4 pt-6 lg:pt-24 text-left lg:text-right">
            <!-- Stat 1 -->
            <div class="space-y-0.5">
              <div class="font-poster text-4xl sm:text-5xl text-amber-300 leading-none tracking-tight flex items-baseline lg:justify-end gap-1 drop-shadow-sm">
                <span>1+</span>
              </div>
              <p class="text-[11px] font-mono tracking-widest uppercase text-white/80 font-semibold drop-shadow-sm">
                YEARS EXPERIENCE
              </p>
            </div>

            <!-- Stat 2 -->
            <div class="space-y-0.5">
              <div class="font-poster text-4xl sm:text-5xl text-white leading-none tracking-tight flex items-baseline lg:justify-end gap-1 drop-shadow-sm">
                <span>7+</span>
              </div>
              <p class="text-[11px] font-mono tracking-widest uppercase text-white/80 font-semibold drop-shadow-sm">
                PROJECTS COMPLETED
              </p>
            </div>

            <!-- Stat 3 -->
            <div class="space-y-0.5">
              <div class="font-poster text-4xl sm:text-5xl text-amber-300 leading-none tracking-tight flex items-baseline lg:justify-end gap-1 drop-shadow-sm">
                <span>90%+</span>
              </div>
              <p class="text-[11px] font-mono tracking-widest uppercase text-white/80 font-semibold drop-shadow-sm">
                PAYMENT SUCCESS RATE
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- BOTTOM STATS / SCROLL INDICATOR STRIP (Sky Theme) -->
    <div class="border-t border-white/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80">
      <div class="flex items-center gap-4">
        <span>TECH: LARAVEL • PHP • GO • SOLIDITY • MYSQL • TAILWIND</span>
      </div>
      <div class="flex items-center gap-2 text-white font-medium drop-shadow-sm">
        <span>SCROLL TO EXPLORE SELECTED WORK</span>
        <ArrowRight class="w-3.5 h-3.5 rotate-90 text-amber-300 animate-bounce" />
      </div>
    </div>
  </section>
</template>
