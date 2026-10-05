<script setup>
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar.vue'
import Background3D from './components/Background3D.vue'
import CustomCursor from './components/CustomCursor.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import WorkProcessSection from './components/WorkProcessSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
  await nextTick()
  // Refresh ScrollTrigger after elements render
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 300)
})
</script>

<template>
  <div class="relative min-h-screen bg-[#050507] text-slate-100 selection:bg-crimson-600 selection:text-white font-sans overflow-x-hidden">
    <!-- Custom Reactive Mouse Cursor -->
    <CustomCursor />

    <!-- Subtle Ambient Canvas -->
    <Background3D />

    <!-- Floating Glassmorphic Header / Navbar -->
    <Navbar />

    <!-- Main Single Page Content Flow matching Reference Editorial Layout -->
    <main class="relative z-10 space-y-12 sm:space-y-16">
      <HeroSection />
      <ProjectsSection />
      <WorkProcessSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>
