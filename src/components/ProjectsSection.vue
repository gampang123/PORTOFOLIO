<script setup>
import { ref, computed } from 'vue'
import {
  ExternalLink,
  Github,
  Maximize2,
  ArrowUpRight,
  Sparkles,
} from 'lucide-vue-next'
import { projectsData, projectCategories } from '../data/projects'
import ProjectModal from './ProjectModal.vue'
import ProjectPreviewDisplay from './ProjectPreviewDisplay.vue'

const selectedCategory = ref('All')
const activeModalProject = ref(null)
const isModalOpen = ref(false)

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projectsData
  }
  return projectsData.filter((p) => p.category === selectedCategory.value)
})

const openProjectModal = (project) => {
  activeModalProject.value = project
  isModalOpen.value = true
}

const closeProjectModal = () => {
  isModalOpen.value = false
  activeModalProject.value = null
}

const setCategory = (cat) => {
  selectedCategory.value = cat
}
</script>

<template>
  <section
    id="projects"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header matching Reference 1: SELECTED PROJECTS ────── VIEW ALL PROJECTS -->
    <div class="mb-10">
      <div class="flex items-center justify-between gap-4 mb-4">
        <div class="flex items-center gap-3">
          <span class="w-2 h-5 bg-crimson-600 rounded-sm"></span>
          <h2 class="font-poster text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-wider">
            SELECTED PROJECTS
          </h2>
        </div>

        <div class="flex items-center gap-2">
          <a
            v-magnetic="{ strength: 0.3, innerStrength: 0.2 }"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-mono tracking-widest text-white/90 hover:text-white uppercase flex items-center gap-2 transition-all px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 shadow-sm"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight data-magnetic-inner class="w-4 h-4 text-amber-300" />
          </a>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex items-center justify-between flex-wrap gap-4 pt-2">
        <p class="text-white/90 text-xs sm:text-sm font-sans max-w-xl drop-shadow-sm">
          Sistem web enterprise, platform kasir SaaS multi-tenant, dan portal digital dengan arsitektur aman.
        </p>

        <div class="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm">
          <button
            v-for="category in projectCategories"
            :key="category"
            @click="setCategory(category)"
            class="px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer font-medium"
            :class="[
              selectedCategory === category
                ? 'bg-crimson-600 text-white font-bold shadow-[0_4px_15px_rgba(220,38,38,0.4)]'
                : 'text-white/80 hover:text-white hover:bg-white/20',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid (Smooth 3D interactive tilt cards with GSAP) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1200px]">
      <div
        v-for="(project, pIdx) in filteredProjects"
        :key="project.id"
        v-tilt="{ max: 6, perspective: 1000, scale: 1.02 }"
        class="group rounded-3xl border border-white/30 hover:border-amber-300/60 bg-gradient-to-b from-white/25 via-white/15 to-white/10 hover:from-white/30 hover:via-white/20 hover:to-white/15 backdrop-blur-2xl flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(10,35,75,0.22)] hover:shadow-[0_25px_65px_rgba(10,35,75,0.32)] transition-all duration-300 will-change-transform"
      >
        <!-- Project Preview Graphic Container (Clickable to open modal) -->
        <div
          class="relative w-full h-52 overflow-hidden cursor-pointer bg-sky-950/30 border-b border-white/15"
          @click="openProjectModal(project)"
        >
          <!-- Rich Project UI Mockup Display Component -->
          <ProjectPreviewDisplay :project="project" />

          <!-- Hover Overlay with Inspect Hint -->
          <div class="absolute inset-0 bg-[#0e244d]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-[2px] pointer-events-none">
            <Maximize2 class="w-4 h-4 text-amber-300" />
            <span>Klik untuk Detail & Arsitektur</span>
          </div>
        </div>

        <!-- Card Body matching Sky Theme -->
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <!-- Top number & Category bar -->
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="font-poster text-3xl text-amber-300 tracking-wider drop-shadow-sm">
                0{{ pIdx + 1 }}
              </span>
              <span class="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 border border-white/25 text-white font-semibold uppercase shadow-sm">
                {{ project.category }}
              </span>
            </div>

            <!-- Title (Clickable) -->
            <h3
              @click="openProjectModal(project)"
              class="text-lg sm:text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer mb-2 flex items-center justify-between"
            >
              <span>{{ project.title }}</span>
              <ArrowUpRight class="w-4 h-4 text-white/60 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </h3>

            <!-- Short Description -->
            <p class="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-2 mb-4 font-sans drop-shadow-sm">
              {{ project.shortDescription }}
            </p>
          </div>

          <!-- Footer Tech Tags & Quick Actions -->
          <div>
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="(tag, tIdx) in project.tags.slice(0, 4)"
                :key="tIdx"
                class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/15 border border-white/25 text-white/95 shadow-sm"
              >
                {{ tag }}
              </span>
              <span
                v-if="project.tags.length > 4"
                class="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/20 border border-white/25 text-amber-200 font-bold"
              >
                +{{ project.tags.length - 4 }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3.5 border-t border-white/15">
              <button
                @click="openProjectModal(project)"
                class="text-xs font-mono text-white/90 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                <span>Lihat Detail & Specs</span>
                <Maximize2 class="w-3.5 h-3.5 text-amber-300" />
              </button>

              <div class="flex items-center gap-2">
                <a
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 rounded-xl text-white/90 hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 transition-all shadow-sm"
                  aria-label="GitHub Repository"
                >
                  <Github class="w-4 h-4" />
                </a>
                <a
                  v-if="project.demoUrl && project.demoUrl !== '#'"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-2 rounded-xl text-white/90 hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 transition-all shadow-sm"
                  aria-label="Live Demo Link"
                >
                  <ExternalLink class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <ProjectModal
      :is-open="isModalOpen"
      :project="activeModalProject"
      @close="closeProjectModal"
    />
  </section>
</template>
