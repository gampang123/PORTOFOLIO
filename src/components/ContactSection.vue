<script setup>
import { ref } from 'vue'
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  MapPin,
  Phone,
  Globe,
  ArrowRight,
  Terminal,
  Code2,
  Sparkles
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

const isCopied = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const showForm = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(personalData.socials.email)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
    setTimeout(() => {
      isSubmitted.value = false
    }, 5000)
  }, 1000)
}
</script>

<template>
  <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
    <!-- Main "LET'S WORK TOGETHER" Banner matching Sky Theme -->
    <div class="rounded-3xl bg-[#0e244d]/85 border border-white/20 p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      <!-- Ambient red glow corner -->
      <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- LEFT COLUMN: Headline & Bio & Status -->
        <div class="lg:col-span-4 space-y-6">
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-crimson-500">
              <Sparkles class="w-4 h-4" />
              <span class="text-xs font-mono tracking-widest uppercase font-bold">GET IN TOUCH</span>
            </div>
            
            <h2 class="font-poster text-5xl sm:text-6xl text-white uppercase tracking-tight leading-[0.9]">
              LET'S WORK<br />
              <span class="text-crimson-500">TOGETHER</span>
            </h2>
          </div>

          <p class="text-sm text-white/85 font-sans leading-relaxed drop-shadow-sm">
            I'm currently open for new projects, full-time engineering roles, and high-impact collaborations. Let's build something remarkable that scales and drives results.
          </p>

          <div>
            <button
              v-magnetic="{ strength: 0.35, innerStrength: 0.2 }"
              @click="showForm = !showForm"
              class="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold tracking-wider transition-colors shadow-[0_4px_20px_rgba(220,38,38,0.4)] group cursor-pointer will-change-transform"
            >
              <span>{{ showForm ? 'TUTUP FORM PESAN' : 'KIRIM PESAN LANGSUNG' }}</span>
              <ArrowRight data-magnetic-inner class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <!-- CENTER COLUMN: Contact Details with Circular Icons matching Reference 1 -->
        <div class="lg:col-span-4 space-y-4">
          <!-- Email row -->
          <div
            @click="copyEmail"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div class="w-10 h-10 rounded-full bg-white/15 border border-white/20 group-hover:border-amber-300 flex items-center justify-center text-amber-300 flex-shrink-0 transition-colors">
              <Mail class="w-4 h-4" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] font-mono tracking-widest text-sky-200 uppercase font-semibold">EMAIL ADDRESS</p>
              <p class="text-xs sm:text-sm font-mono text-white group-hover:text-amber-300 truncate">
                {{ personalData.socials.email }}
              </p>
            </div>
          </div>

          <!-- Location row -->
          <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors">
            <div class="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-emerald-300 flex-shrink-0">
              <MapPin class="w-4 h-4" />
            </div>
            <div>
              <p class="text-[10px] font-mono tracking-widest text-sky-200 uppercase font-semibold">LOCATION</p>
              <p class="text-xs sm:text-sm font-mono text-white">
                {{ personalData.location }}
              </p>
            </div>
          </div>

          <!-- Phone / WA row -->
          <div v-if="personalData.phone" class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-colors">
            <div class="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-amber-300 flex-shrink-0">
              <Phone class="w-4 h-4" />
            </div>
            <div>
              <p class="text-[10px] font-mono tracking-widest text-sky-200 uppercase font-semibold">CONTACT / WHATSAPP</p>
              <p class="text-xs sm:text-sm font-mono text-white">
                {{ personalData.phone }}
              </p>
            </div>
          </div>

          <!-- Socials pill strip -->
          <div class="pt-3 pl-3 flex items-center gap-3">
            <a
              :href="personalData.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white/15 border border-white/20 hover:border-amber-300 flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-105"
              aria-label="GitHub"
            >
              <Github class="w-4 h-4" />
            </a>
            <a
              :href="personalData.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white/15 border border-white/20 hover:border-amber-300 flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a
              :href="personalData.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white/15 border border-white/20 hover:border-amber-300 flex items-center justify-center text-white/90 hover:text-white transition-all hover:scale-105"
              aria-label="Instagram"
            >
              <Instagram class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <!-- Collapsible / Direct Send Message Form -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="showForm" class="mt-10 pt-8 border-t border-white/15">
          <h3 class="font-mono text-sm tracking-wider uppercase text-white font-bold mb-4 flex items-center gap-2">
            <Mail class="w-4 h-4 text-amber-300" />
            <span>Kirim Pesan Cepat Langsung ke Inbox</span>
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-4 max-w-2xl">
            <div v-if="isSubmitted" class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-white text-xs font-mono flex items-center gap-3">
              <Check class="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Terima kasih! Pesan Anda telah dikirim dan saya akan segera membalasnya.</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Nama Anda"
                class="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 focus:border-amber-300 focus:outline-none text-white text-sm placeholder-white/50 font-sans backdrop-blur-md"
              />
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="Email Anda"
                class="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 focus:border-amber-300 focus:outline-none text-white text-sm placeholder-white/50 font-sans backdrop-blur-md"
              />
            </div>

            <textarea
              v-model="form.message"
              required
              rows="4"
              placeholder="Tulis pesan atau kebutuhan proyek Anda di sini..."
              class="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/20 focus:border-amber-300 focus:outline-none text-white text-sm placeholder-white/50 font-sans backdrop-blur-md resize-none"
            ></textarea>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            >
              <Send class="w-4 h-4" />
              <span>{{ isSubmitting ? 'MENGIRIM...' : 'KIRIM SEKARANG' }}</span>
            </button>
          </form>
        </div>
      </transition>

    </div>
  </section>
</template>
