<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  Github,
  Maximize2,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-vue-next'
import { projectsData, projectCategories } from '../data/projects'
import ProjectModal from './ProjectModal.vue'

gsap.registerPlugin(ScrollTrigger)

const projectsRef = ref(null)
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

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header reveal
    gsap.from('.projects-header', {
      scrollTrigger: {
        trigger: projectsRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Filter tabs reveal
    gsap.from('.project-filter-tabs', {
      scrollTrigger: {
        trigger: projectsRef.value,
        start: 'top 75%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    })

    // Project cards stagger
    gsap.from('.project-card-item', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 75%',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })
  }, projectsRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="projects"
    ref="projectsRef"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header -->
    <div class="projects-header mb-10">
      <div class="flex items-center gap-2 font-mono text-xs text-neon-cyan tracking-widest uppercase mb-2">
        <span class="text-slate-500">//</span>
        <span>03. PORTFOLIO SHOWCASE</span>
        <div class="h-px bg-cyan-500/30 flex-grow max-w-[120px]"></div>
      </div>
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Karya Pilihan & <span class="cyber-gradient-text">Eksplorasi Kode</span>.
          </h2>
          <p class="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Koleksi aplikasi web enterprise, sistem interaktif 3D, dan tool eksperimental yang telah saya rancang dan kembangkan.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="project-filter-tabs flex flex-wrap gap-2 p-1.5 rounded-xl bg-cyber-surface/80 border border-white/10 backdrop-blur-md">
          <button
            v-for="category in projectCategories"
            :key="category"
            @click="setCategory(category)"
            class="px-4 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200"
            :class="[
              selectedCategory === category
                ? 'bg-neon-cyan text-slate-950 font-bold shadow-neon-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card-item group rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-glass flex flex-col overflow-hidden hover:-translate-y-1.5"
      >
        <!-- Project Preview Graphic Container -->
        <div
          class="relative w-full h-48 bg-gradient-to-br overflow-hidden flex items-center justify-center cursor-pointer"
          :class="project.imageGradient"
          @click="openProjectModal(project)"
        >
          <!-- Cyber Grid Pattern -->
          <div class="absolute inset-0 cyber-grid-bg opacity-40"></div>

          <!-- Featured Badge -->
          <div
            v-if="project.featured"
            class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold tracking-wider bg-purple-950/80 border border-purple-500/40 text-purple-300 shadow-sm"
          >
            ★ FEATURED
          </div>

          <!-- Category Pill -->
          <div
            class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-cyan-300"
          >
            {{ project.category }}
          </div>

          <!-- Center Icon Graphic -->
          <div class="relative z-10 p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md transform group-hover:scale-110 transition-transform duration-300">
            <Sparkles class="w-8 h-8 text-neon-cyan" />
          </div>

          <!-- Hover Overlay with Inspect Hint -->
          <div class="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-xs font-mono text-white backdrop-blur-sm">
            <Maximize2 class="w-4 h-4 text-neon-cyan" />
            <span>Lihat Detail Proyek</span>
          </div>
        </div>

        <!-- Project Content -->
        <div class="p-6 flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3
                @click="openProjectModal(project)"
                class="text-xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors cursor-pointer"
              >
                {{ project.title }}
              </h3>
              <ArrowUpRight class="w-5 h-5 text-slate-500 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>

            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
              {{ project.shortDescription }}
            </p>
          </div>

          <!-- Footer Tech Tags & Quick Actions -->
          <div>
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span
                v-for="(tag, tIdx) in project.tags.slice(0, 4)"
                :key="tIdx"
                class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-slate-300"
              >
                {{ tag }}
              </span>
              <span
                v-if="project.tags.length > 4"
                class="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-slate-500"
              >
                +{{ project.tags.length - 4 }}
              </span>
            </div>

            <div class="flex items-center justify-between pt-3 border-t border-white/5">
              <button
                @click="openProjectModal(project)"
                class="text-xs font-mono text-slate-400 hover:text-neon-cyan transition-colors flex items-center gap-1.5"
              >
                <span>Detail & Specs</span>
              </button>

              <div class="flex items-center gap-3">
                <a
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github class="w-4 h-4" />
                </a>
                <a
                  :href="project.demoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 rounded-lg text-slate-400 hover:text-neon-cyan hover:bg-white/5 transition-colors"
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
