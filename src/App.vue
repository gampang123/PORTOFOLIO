<script setup>
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar.vue'
import Background3D from './components/Background3D.vue'
import CustomCursor from './components/CustomCursor.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
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
  <div class="relative min-h-screen bg-cyber-bg text-slate-100 selection:bg-white selection:text-black font-sans">
    <!-- Custom Reactive Mouse Cursor -->
    <CustomCursor />

    <!-- Three.js Interactive 3D Background -->
    <Background3D />

    <!-- Floating Glassmorphic Header / Navbar -->
    <Navbar />

    <!-- Main Single Page Content Flow -->
    <main class="relative z-10 space-y-8 sm:space-y-12">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>
