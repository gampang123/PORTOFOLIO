<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Phone,
} from 'lucide-vue-next'
import { personalData } from '../data/personal'

gsap.registerPlugin(ScrollTrigger)

const contactRef = ref(null)
const isCopied = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

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
  // Simulate network dispatch
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
  }, 1200)
}

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.contact-header', {
      scrollTrigger: {
        trigger: contactRef.value,
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.contact-card-left', {
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 75%',
      },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.contact-form-right', {
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 75%',
      },
      opacity: 0,
      x: 40,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, contactRef.value)

  return () => ctx.revert()
})
</script>

<template>
  <section
    id="contact"
    ref="contactRef"
    class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
  >
    <!-- Section Header -->
    <div class="contact-header mb-16">
      <div class="flex items-center gap-2 font-mono text-xs text-neutral-400 tracking-widest uppercase mb-2">
        <span class="text-neutral-600">//</span>
        <span>05. CONNECT WITH ME</span>
        <div class="h-px bg-white/20 flex-grow max-w-[120px]"></div>
      </div>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
        Mari Wujudkan Ide <span class="cyber-gradient-text">Hebat Berikutnya</span>.
      </h2>
      <p class="text-neutral-400 text-sm sm:text-base max-w-xl mt-3">
        Apakah Anda memiliki ide produk baru, butuh kolaborasi teknik, atau sekadar ingin menyapa? Kotak masuk saya selalu terbuka.
      </p>
    </div>

    <!-- Contact Content Grid -->
    <div class="contact-wrapper grid grid-cols-1 lg:grid-cols-12 gap-10">
      <!-- Left Column: Info & Socials -->
      <div class="contact-card-left lg:col-span-5 space-y-6">
        <!-- Direct Email Card with Copy button -->
        <div class="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/35 transition-all shadow-glass">
          <div class="flex items-center gap-3 mb-3 text-white font-mono text-xs uppercase tracking-wider">
            <Mail class="w-4 h-4 text-white" />
            <span>DIRECT INBOX</span>
          </div>
          <p class="font-mono text-base sm:text-lg text-white font-medium break-all mb-4">
            {{ personalData.socials.email }}
          </p>
          <button
            @click="copyEmail"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-surfaceLight border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/40 transition-all"
          >
            <Check v-if="isCopied" class="w-4 h-4 text-white" />
            <Copy v-else class="w-4 h-4 text-white" />
            <span>{{ isCopied ? 'EMAIL DISALIN!' : 'SALIN ALAMAT EMAIL' }}</span>
          </button>
        </div>

        <!-- Location & Availability status -->
        <div class="p-6 rounded-2xl glass-panel border border-white/10 shadow-glass space-y-4">
          <div class="flex items-center gap-3 text-xs font-mono text-neutral-300">
            <MapPin class="w-4 h-4 text-white flex-shrink-0" />
            <span>{{ personalData.location }}</span>
          </div>
          <div v-if="personalData.phone" class="flex items-center gap-3 text-xs font-mono text-neutral-300">
            <Phone class="w-4 h-4 text-white flex-shrink-0" />
            <span>{{ personalData.phone }} (WhatsApp / Phone)</span>
          </div>
          <div class="flex items-center gap-3 text-xs font-mono text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span class="w-2 h-2 -ml-5 rounded-full bg-white"></span>
            <span>Status: {{ personalData.status }}</span>
          </div>
          <div class="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <Clock class="w-4 h-4 text-neutral-400 flex-shrink-0" />
            <span>Typical Response Time: &lt; 24 Jam</span>
          </div>
        </div>

        <!-- Social Media Buttons -->
        <div>
          <h4 class="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
            Social Networks
          </h4>
          <div class="grid grid-cols-2 gap-3">
            <a
              :href="personalData.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/5 hover:border-white/40 hover:text-white text-neutral-300 font-mono text-xs transition-all hover:-translate-y-0.5"
            >
              <Github class="w-4 h-4 text-white" />
              <span>GitHub</span>
            </a>
            <a
              :href="personalData.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/5 hover:border-white/40 hover:text-white text-neutral-300 font-mono text-xs transition-all hover:-translate-y-0.5"
            >
              <Linkedin class="w-4 h-4 text-white" />
              <span>LinkedIn</span>
            </a>
            <a
              :href="personalData.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/5 hover:border-white/40 hover:text-white text-neutral-300 font-mono text-xs transition-all hover:-translate-y-0.5"
            >
              <Instagram class="w-4 h-4 text-white" />
              <span>Instagram</span>
            </a>
            <a
              :href="personalData.socials.twitter"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3.5 rounded-xl glass-panel border border-white/5 hover:border-white/40 hover:text-white text-neutral-300 font-mono text-xs transition-all hover:-translate-y-0.5"
            >
              <Sparkles class="w-4 h-4 text-white" />
              <span>X / Twitter</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Contact Form -->
      <div class="contact-form-right lg:col-span-7">
        <form
          @submit.prevent="handleSubmit"
          class="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 shadow-glass relative space-y-5"
        >
          <!-- Success Notification Banner -->
          <div
            v-if="isSubmitted"
            class="p-4 rounded-xl bg-white/10 border border-white/30 text-white text-xs font-mono flex items-center gap-3 animate-fade-in"
          >
            <Sparkles class="w-5 h-5 text-white flex-shrink-0" />
            <div>
              <p class="font-bold">PESAN BERHASIL TERKIRIM!</p>
              <p class="text-neutral-300">Terima kasih telah menghubungi. Saya akan merespons secepat mungkin.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Name Input -->
            <div class="space-y-2">
              <label class="block font-mono text-xs uppercase tracking-wider text-neutral-300">
                Nama Anda <span class="text-white">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="misal: Rian S."
                class="w-full px-4 py-3 rounded-xl bg-cyber-surfaceLight/80 border border-white/10 focus:border-white focus:bg-white/[0.06] focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors font-sans"
              />
            </div>

            <!-- Email Input -->
            <div class="space-y-2">
              <label class="block font-mono text-xs uppercase tracking-wider text-neutral-300">
                Email Anda <span class="text-white">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="nama@perusahaan.com"
                class="w-full px-4 py-3 rounded-xl bg-cyber-surfaceLight/80 border border-white/10 focus:border-white focus:bg-white/[0.06] focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors font-sans"
              />
            </div>
          </div>

          <!-- Subject Input -->
          <div class="space-y-2">
            <label class="block font-mono text-xs uppercase tracking-wider text-neutral-300">
              Subjek / Topik Proyek
            </label>
            <input
              v-model="form.subject"
              type="text"
              placeholder="Contoh: Pengembangan Web App Modern / Kolaborasi"
              class="w-full px-4 py-3 rounded-xl bg-cyber-surfaceLight/80 border border-white/10 focus:border-white focus:bg-white/[0.06] focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors font-sans"
            />
          </div>

          <!-- Message Input -->
          <div class="space-y-2">
            <label class="block font-mono text-xs uppercase tracking-wider text-neutral-300">
              Pesan atau Detail Kebutuhan <span class="text-white">*</span>
            </label>
            <textarea
              v-model="form.message"
              required
              rows="5"
              placeholder="Ceritakan gambaran proyek, target waktu, atau hal apa yang bisa saya bantu..."
              class="w-full px-4 py-3 rounded-xl bg-cyber-surfaceLight/80 border border-white/10 focus:border-white focus:bg-white/[0.06] focus:outline-none text-white text-sm placeholder-neutral-500 transition-colors font-sans resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 px-6 rounded-xl bg-white text-black font-mono font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-neutral-200 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span v-if="isSubmitting" class="flex items-center gap-2">
              <span class="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin"></span>
              <span>MENGIRIM PESAN...</span>
            </span>
            <span v-else class="flex items-center gap-2">
              <Send class="w-4 h-4" />
              <span>KIRIM PESAN SEKARANG</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
