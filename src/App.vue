<script setup>
import { onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar.vue'
import CloudShader from './components/ui/CloudShader.vue'
import AirplaneFlyby from './components/AirplaneFlyby.vue'
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
  <div class="relative min-h-screen bg-[#3876ba] text-slate-100 selection:bg-crimson-600 selection:text-white font-sans overflow-x-hidden">
    <!-- Custom Reactive Mouse Cursor -->
    <CustomCursor />

    <!-- Global Dynamic Blue Sky Cloud Shader Canvas covering the ENTIRE page -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <CloudShader
        :speed="1"
        :count="6"
        cloudColor="#fbf8f2"
        skyTopColor="#3876ba"
        skyBottomColor="#8cbfe8"
        className="w-full h-full"
      />
      <!-- Soft atmospheric gradient over the clouds for optimal reading contrast -->
      <div class="absolute inset-0 bg-gradient-to-b from-sky-950/15 via-sky-950/25 to-sky-950/40 pointer-events-none"></div>
    </div>

    <!-- Airplane Flyby with Contrail Vapor Smoke Trail -->
    <AirplaneFlyby />

    <!-- Floating Glassmorphic Header / Navbar -->
    <Navbar />

    <!-- Main Single Page Content Flow -->
    <main class="relative z-10 space-y-16 sm:space-y-24">
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
