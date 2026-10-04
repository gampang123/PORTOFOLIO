<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Terminal, Sparkles, Send } from 'lucide-vue-next'
import { personalData } from '../data/personal'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40

  const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
  const scrollPosition = window.scrollY + 200

  for (const section of sections) {
    const el = document.getElementById(section)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = section
        break
      }
    }
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="[
      isScrolled
        ? 'py-3.5 bg-cyber-bg/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        : 'py-6 bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Brand / Logo -->
      <a
        href="#hero"
        class="flex items-center gap-2 group font-mono text-lg tracking-wider"
      >
        <div
          class="w-9 h-9 rounded-lg bg-cyber-surfaceLight border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
        >
          <span class="font-bold text-base">&lt;/&gt;</span>
        </div>
        <div class="flex items-baseline">
          <span class="font-display font-bold text-white text-lg tracking-tight group-hover:text-neutral-300 transition-colors">
            {{ personalData.nickName }}
          </span>
          <span class="text-white font-bold text-xl leading-none">.</span>
          <span class="text-xs font-mono text-neutral-400 ml-1 hidden sm:inline-block">dev</span>
        </div>
      </a>

      <!-- Desktop Navigation Links -->
      <nav class="hidden md:flex items-center gap-1 bg-cyber-surface/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-inner">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="relative px-3.5 py-1.5 text-xs uppercase tracking-widest font-mono font-medium transition-all duration-200 rounded-full"
          :class="[
            activeSection === link.href.replace('#', '')
              ? 'text-white bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.15)] font-semibold border border-white/20'
              : 'text-neutral-400 hover:text-white hover:bg-white/5',
          ]"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Right Action: Status Pill & CTA Button -->
      <div class="hidden lg:flex items-center gap-4">
        <!-- Availability indicator -->
        <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-neutral-300">
          <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span class="w-2 h-2 -ml-4 rounded-full bg-white"></span>
          <span class="text-[11px] font-medium tracking-wide">Available for Hire</span>
        </div>

        <!-- Contact CTA Button -->
        <a
          href="#contact"
          class="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-black bg-white rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:bg-neutral-200 hover:scale-105"
        >
          <Send class="w-3.5 h-3.5" />
          <span>CONTACT</span>
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center md:hidden gap-3">
        <a
          href="#contact"
          class="text-xs font-mono font-semibold px-3 py-1.5 bg-white/10 border border-white/30 text-white rounded-md"
        >
          Contact
        </a>
        <button
          @click="toggleMobileMenu"
          class="p-2 rounded-lg bg-cyber-surface border border-white/10 text-neutral-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6 text-white" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-cyber-bg/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4"
      >
        <div class="flex items-center gap-2 pb-3 border-b border-white/5 text-xs font-mono text-neutral-300">
          <span class="w-2 h-2 rounded-full bg-white"></span>
          <span>{{ personalData.status }}</span>
        </div>
        <div class="flex flex-col space-y-2">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            @click="closeMobileMenu"
            class="px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider transition-colors flex items-center justify-between"
            :class="[
              activeSection === link.href.replace('#', '')
                ? 'bg-white/10 text-white font-semibold border border-white/20'
                : 'text-neutral-300 hover:bg-white/5 hover:text-white',
            ]"
          >
            <span>{{ link.name }}</span>
            <span class="text-xs text-neutral-500 font-mono">0{{ navLinks.indexOf(link) + 1 }}</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
