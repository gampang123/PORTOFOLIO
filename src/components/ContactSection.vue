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
    <!-- Main "LET'S WORK TOGETHER" Banner matching Reference 1 bottom section -->
    <div class="rounded-3xl bg-[#09090b] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
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

          <p class="text-sm text-neutral-400 font-sans leading-relaxed">
            I'm currently open for new projects, full-time engineering roles, and high-impact collaborations. Let's build something remarkable that scales and drives results.
          </p>

          <div>
            <button
              @click="showForm = !showForm"
              class="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] group"
            >
              <span>{{ showForm ? 'TUTUP FORM PESAN' : 'KIRIM PESAN LANGSUNG' }}</span>
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <!-- CENTER COLUMN: Contact Details with Circular Icons matching Reference 1 -->
        <div class="lg:col-span-4 space-y-4">
          <!-- Email row -->
          <div
            @click="copyEmail"
            class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-crimson-500/50 flex items-center justify-center text-crimson-500 flex-shrink-0 transition-colors">
              <Mail class="w-4 h-4" />
            </div>
            <div class="min-w-0">
              <p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">EMAIL ADDRESS</p>
              <p class="text-xs sm:text-sm font-mono text-neutral-200 group-hover:text-white truncate">
                {{ personalData.socials.email }}
              </p>
            </div>
          </div>

          <!-- Location row -->
          <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-crimson-500 flex-shrink-0">
              <MapPin class="w-4 h-4" />
            </div>
            <div>
              <p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">LOCATION</p>
              <p class="text-xs sm:text-sm font-mono text-neutral-200">
                {{ personalData.location }}
              </p>
            </div>
          </div>

          <!-- Phone / WA row -->
          <div v-if="personalData.phone" class="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-crimson-500 flex-shrink-0">
              <Phone class="w-4 h-4" />
            </div>
            <div>
              <p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">CONTACT / WHATSAPP</p>
              <p class="text-xs sm:text-sm font-mono text-neutral-200">
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
              class="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-crimson-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105"
              aria-label="GitHub"
            >
              <Github class="w-4 h-4" />
            </a>
            <a
              :href="personalData.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-crimson-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a
              :href="personalData.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-crimson-500 flex items-center justify-center text-neutral-400 hover:text-white transition-all hover:scale-105"
              aria-label="Instagram"
            >
              <Instagram class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- RIGHT COLUMN: Sleek Code / Laptop / UI Mockup matching Reference 1 -->
        <div class="lg:col-span-4 flex justify-center">
          <div class="w-full max-w-sm rounded-2xl bg-black border border-white/15 p-4 shadow-2xl relative group overflow-hidden">
            <!-- Terminal Header -->
            <div class="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <span class="text-neutral-400 text-[11px]">rozaki@production:~$</span>
            </div>

            <!-- Code display simulating clean architecture -->
            <div class="py-4 font-mono text-[11px] leading-relaxed text-neutral-300 space-y-1">
              <p><span class="text-crimson-500">class</span> <span class="text-white font-bold">FullStackSystem</span> {</p>
              <p class="pl-3 text-neutral-400">// Enterprise & Secure by Design</p>
              <p class="pl-3"><span class="text-crimson-500">public</span> $developer = <span class="text-neutral-100">"Gampang Rozaki"</span>;</p>
              <p class="pl-3"><span class="text-crimson-500">public</span> $backend = <span class="text-neutral-100">["Laravel", "PHP", "Go"]</span>;</p>
              <p class="pl-3"><span class="text-crimson-500">public</span> $frontend = <span class="text-neutral-100">["Vue.js", "Tailwind"]</span>;</p>
              <p class="pl-3"><span class="text-crimson-500">public</span> $standard = <span class="text-neutral-100">"OWASP Top 10"</span>;</p>
              <p class="pl-3"><span class="text-crimson-500">public function</span> <span class="text-white">deploy</span>() {</p>
              <p class="pl-6 text-crimson-400"><span class="text-neutral-400">return</span> Status::ONLINE_200;</p>
              <p class="pl-3">}</p>
              <p>}</p>
            </div>

            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span class="flex items-center gap-1.5 text-neutral-400">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                SYSTEM READY
              </span>
              <span>YOGYAKARTA • 2026</span>
            </div>
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
        <div v-if="showForm" class="mt-10 pt-8 border-t border-white/10">
          <h3 class="font-mono text-sm tracking-wider uppercase text-white font-bold mb-4 flex items-center gap-2">
            <Mail class="w-4 h-4 text-crimson-500" />
            <span>Kirim Pesan Cepat Langsung ke Inbox</span>
          </h3>

          <form @submit.prevent="handleSubmit" class="space-y-4 max-w-2xl">
            <div v-if="isSubmitted" class="p-4 rounded-xl bg-crimson-900/30 border border-crimson-600/50 text-white text-xs font-mono flex items-center gap-3">
              <Check class="w-4 h-4 text-crimson-400 flex-shrink-0" />
              <span>Terima kasih! Pesan Anda telah dikirim dan saya akan segera membalasnya.</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Nama Anda"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crimson-500 focus:outline-none text-white text-sm placeholder-neutral-500 font-sans"
              />
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="Email Anda"
                class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crimson-500 focus:outline-none text-white text-sm placeholder-neutral-500 font-sans"
              />
            </div>

            <textarea
              v-model="form.message"
              required
              rows="4"
              placeholder="Tulis pesan atau kebutuhan proyek Anda di sini..."
              class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-crimson-500 focus:outline-none text-white text-sm placeholder-neutral-500 font-sans resize-none"
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
