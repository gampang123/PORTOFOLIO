<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ChevronDown,
  Terminal,
  Sparkles
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

const heroRef = ref(null)
const roleIndex = ref(0)
const roles = [
  'Full-Stack Web Developer',
  'Laravel & PHP Specialist',
  'Backend & Third-Party API',
  'OWASP Security Enthusiast',
]

// Role typewriter / rotator
onMounted(() => {
  const interval = setInterval(() => {
    roleIndex.value = (roleIndex.value + 1) % roles.length
  }, 3200)

  // GSAP Entrance Stagger
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-badge', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
    })
      .from('.hero-title-line', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
      }, '-=0.4')
      .from('.hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5')
      .from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.5')
      .from('.hero-stats', {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.4')
      .from('.hero-socials', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.6')
  }, heroRef.value)

  return () => {
    clearInterval(interval)
    ctx.revert()
  }
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
  >
    <!-- Top Terminal Tag Badge -->
    <div class="hero-badge inline-flex items-center gap-2 mb-6">
      <div
        class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs font-mono text-neutral-300 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
      >
        <span class="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
        <Terminal class="w-3.5 h-3.5 text-white" />
        <span class="tracking-wide">HELLO WORLD // SYSTEM READY</span>
      </div>
    </div>

    <!-- Main Bold Typography Headline -->
    <div class="space-y-2 mb-6">
      <h2 class="hero-title-line font-mono text-sm sm:text-base md:text-lg text-neutral-400 tracking-wider">
        Hi, my name is <span class="text-white font-medium">{{ personalData.name }}</span>
      </h2>

      <h1 class="hero-title-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white uppercase leading-[1.05]">
        Crafting <span class="cyber-gradient-text">Scalable</span><br />
        Digital Dimensions.
      </h1>

      <!-- Dynamic Role Switcher -->
      <div class="hero-title-line flex items-center gap-3 pt-2 text-xl sm:text-2xl md:text-3xl font-mono text-neutral-300">
        <span class="text-white font-bold">&gt;</span>
        <div class="relative overflow-hidden h-9 sm:h-10 flex items-center">
          <transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-4"
          >
            <span :key="roleIndex" class="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              {{ roles[roleIndex] }}
            </span>
          </transition>
        </div>
      </div>
    </div>

    <!-- Short Tagline -->
    <p class="hero-tagline max-w-2xl text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
      {{ personalData.bio }}
    </p>

    <!-- CTAs and Social Links -->
    <div class="hero-actions flex flex-wrap items-center gap-4 mb-14">
      <!-- Primary Action -->
      <a
        href="#projects"
        class="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-neutral-200 hover:-translate-y-0.5 transition-all duration-300"
      >
        <span>EXPLORE PROJECTS</span>
        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>

      <!-- Secondary Action: CV Download -->
      <a
        href="#contact"
        class="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyber-surface/80 border border-white/15 hover:border-white text-white font-mono text-sm font-semibold tracking-wider backdrop-blur-md hover:-translate-y-0.5 transition-all duration-300 shadow-glass"
      >
        <Mail class="w-4 h-4 text-white" />
        <span>LET'S CONNECT</span>
      </a>

      <!-- Quick Social Icons -->
      <div class="flex items-center gap-2 pl-2 sm:pl-4 border-l border-white/10">
        <a
          :href="personalData.socials.github"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-socials p-2.5 rounded-lg bg-cyber-surfaceLight/60 border border-white/10 text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-110"
          aria-label="GitHub Profile"
        >
          <Github class="w-4 h-4" />
        </a>
        <a
          :href="personalData.socials.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-socials p-2.5 rounded-lg bg-cyber-surfaceLight/60 border border-white/10 text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-110"
          aria-label="LinkedIn Profile"
        >
          <Linkedin class="w-4 h-4" />
        </a>
        <a
          :href="personalData.socials.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-socials p-2.5 rounded-lg bg-cyber-surfaceLight/60 border border-white/10 text-neutral-400 hover:text-white hover:border-white/40 transition-all hover:scale-110"
          aria-label="Instagram Profile"
        >
          <Instagram class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- Quick Stats Strip -->
    <div class="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl glass-panel border border-white/10 shadow-glass max-w-4xl">
      <div
        v-for="(stat, idx) in personalData.stats"
        :key="idx"
        class="flex flex-col border-r last:border-r-0 border-white/5 px-3 py-1"
      >
        <span class="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-baseline gap-1">
          <span class="cyber-gradient-text">{{ stat.value }}</span>
        </span>
        <span class="text-xs font-mono text-neutral-400 uppercase tracking-wider mt-0.5">
          {{ stat.label }}
        </span>
      </div>
    </div>

    <!-- Scroll Down Floating Indicator -->
    <a
      href="#about"
      class="mt-12 self-center inline-flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors font-mono text-xs tracking-widest uppercase group"
      aria-label="Scroll to About Section"
    >
      <span>Scroll To Explore</span>
      <ChevronDown class="w-4 h-4 animate-bounce text-white" />
    </a>
  </section>
</template>
