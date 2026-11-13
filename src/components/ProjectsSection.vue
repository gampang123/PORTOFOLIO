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
import GlassFolderProjectCard from './ui/GlassFolderProjectCard.vue'

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
            MY PROJECTS
          </h2>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <p class="text-white/90 text-xs sm:text-sm font-sans max-w-sm lg:max-w-md drop-shadow-sm leading-relaxed">
          Enterprise web applications, multi-tenant SaaS POS platforms, and secure digital platforms.
        </p>

        <div class="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-sm overflow-x-auto max-w-full">
          <button
            v-for="category in projectCategories"
            :key="category"
            @click="setCategory(category)"
            class="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer font-medium whitespace-nowrap"
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

    <!-- Projects Grid (Interactive 3D Glass Folder Dossiers with Fan-Out Mechanics) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center items-start pt-6">
      <GlassFolderProjectCard
        v-for="(project, pIdx) in filteredProjects"
        :key="project.id"
        :project="project"
        :index="pIdx"
        @open-modal="openProjectModal"
      />
    </div>

    <!-- Project Detail Modal -->
    <ProjectModal
      :is-open="isModalOpen"
      :project="activeModalProject"
      @close="closeProjectModal"
    />
  </section>
</template>
