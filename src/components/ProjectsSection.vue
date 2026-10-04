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
    <!-- Section Header & Filter Tabs -->
    <div class="mb-12">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 mb-3">
        <span>03</span>
        <span class="text-neutral-600">•</span>
        <span>PORTFOLIO SHOWCASE</span>
      </div>

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Karya Pilihan & <span class="cyber-gradient-text">Eksplorasi Kode</span>.
          </h2>
          <p class="text-neutral-400 text-sm sm:text-base max-w-xl mt-3 leading-relaxed">
            Koleksi aplikasi web enterprise, sistem kasir SaaS multi-tenant, dan portal publik yang telah saya rancang dan kembangkan.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-neutral-900/80 border border-white/10 backdrop-blur-md">
          <button
            v-for="category in projectCategories"
            :key="category"
            @click="setCategory(category)"
            class="px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer"
            :class="[
              selectedCategory === category
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid (Fast, instantaneous render with smooth CSS hover) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="group rounded-2xl border border-white/10 bg-[#0d0d10]/90 hover:border-white/30 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-glass transition-all duration-300 hover:-translate-y-1"
      >
        <!-- Project Preview Graphic Container (Clickable to open modal) -->
        <div
          class="relative w-full h-52 overflow-hidden border-b border-white/10 cursor-pointer bg-black"
          @click="openProjectModal(project)"
        >
          <!-- Rich Project UI Mockup Display Component -->
          <ProjectPreviewDisplay :project="project" />

          <!-- Hover Overlay with Inspect Hint -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-[2px] pointer-events-none">
            <Maximize2 class="w-4 h-4 text-white" />
            <span>Klik untuk Detail & Arsitektur</span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <!-- Category and Featured tags -->
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                {{ project.category }}
              </span>
              <span
                v-if="project.featured"
                class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/15 text-white font-medium"
              >
                ★ FEATURED
              </span>
            </div>

            <!-- Title (Clickable) -->
            <h3
              @click="openProjectModal(project)"
              class="text-lg sm:text-xl font-display font-bold text-white group-hover:text-neutral-200 transition-colors cursor-pointer mb-2 flex items-center justify-between"
            >
              <span>{{ project.title }}</span>
              <ArrowUpRight class="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </h3>

            <!-- Short Description -->
            <p class="text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 mb-4 font-sans">
              {{ project.shortDescription }}
            </p>
          </div>

          <!-- Footer Tech Tags & Quick Actions -->
          <div>
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="(tag, tIdx) in project.tags.slice(0, 4)"
                :key="tIdx"
                class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-neutral-300"
              >
                {{ tag }}
              </span>
              <span
                v-if="project.tags.length > 4"
                class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-neutral-500"
              >
                +{{ project.tags.length - 4 }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                @click="openProjectModal(project)"
                class="text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Lihat Detail & Specs</span>
                <Maximize2 class="w-3.5 h-3.5" />
              </button>

              <div class="flex items-center gap-2">
                <a
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github class="w-4 h-4" />
                </a>
                <a
                  v-if="project.demoUrl && project.demoUrl !== '#'"
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
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
