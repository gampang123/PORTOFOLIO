<script setup>
import {
  Calendar,
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingCart,
  Users,
  Building,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  Shield,
  Activity,
  Layers,
  Sparkles,
} from 'lucide-vue-next'

defineProps({
  project: {
    type: Object,
    required: true,
  },
  isModal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="w-full h-full flex flex-col bg-slate-50 text-slate-800 overflow-hidden select-none font-sans border-b border-slate-200">
    <!-- Window Bar Header in Clean Modern macOS Light Chrome -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-100/90 backdrop-blur-md text-xs font-mono">
      <!-- Traffic Light Window Controls -->
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-xs"></span>
        <span class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-xs"></span>
        <span class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-xs"></span>
      </div>

      <!-- Simulated URL Address Bar in Clean Light Pill -->
      <div class="flex items-center gap-2 px-3.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] max-w-[320px] truncate shadow-xs">
        <span class="text-sky-600 font-bold font-mono">https://</span>
        <span class="text-slate-800 truncate font-mono font-medium">{{ project.mockupUrl ? project.mockupUrl.replace('https://', '') : project.id + '.internal' }}</span>
      </div>

      <!-- Live Production Status Indicator -->
      <div class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-mono font-semibold">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{{ project.systemStatus || 'Active' }}</span>
      </div>
    </div>

    <!-- Image View if Available -->
    <div v-if="project.image" class="relative w-full h-full overflow-hidden bg-slate-100 flex items-center justify-center">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-top"
        loading="lazy"
      />
    </div>

    <!-- Realistic UI Interface Mockup View in Clean White & Sky Design -->
    <div v-else class="relative w-full h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-sky-50/30">
      
      <!-- Subtle Ambient Lighting Glow -->
      <div class="absolute -top-10 -right-10 w-48 h-48 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <!-- 1. Hotel Management System UI Mockup -->
      <div v-if="project.previewType === 'hotel'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <!-- Top Metrics Row -->
        <div class="grid grid-cols-3 gap-2.5">
          <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span class="text-[9px] font-mono text-slate-500 block font-bold uppercase tracking-wider">OCCUPANCY</span>
            <span class="text-xs sm:text-sm font-bold text-emerald-600 font-mono">88.4%</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span class="text-[9px] font-mono text-slate-500 block font-bold uppercase tracking-wider">ROOMS OCCUPIED</span>
            <span class="text-xs sm:text-sm font-bold text-slate-900 font-mono">142 / 160</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span class="text-[9px] font-mono text-amber-700 block font-bold uppercase tracking-wider">TODAY REV</span>
            <span class="text-xs sm:text-sm font-bold text-amber-600 font-mono">Rp 48.5M</span>
          </div>
        </div>

        <!-- Room Calendar Simulation -->
        <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex-grow flex flex-col justify-center">
          <div class="flex items-center justify-between text-[10px] font-mono text-slate-600 mb-2">
            <span class="font-bold text-slate-700">ROOM RESERVATION TIMELINE</span>
            <span class="text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">OCTOBER 2026</span>
          </div>
          <div class="space-y-1.5 text-[10px] font-mono">
            <div class="flex items-center gap-2">
              <span class="w-16 text-slate-500 font-medium">Deluxe 101</span>
              <div class="flex-grow h-5 rounded-lg bg-sky-50 border border-sky-200 flex items-center px-2.5 text-sky-800 text-[9px] font-semibold">
                Mr. Pratama (Booked)
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-slate-500 font-medium">Suite 204</span>
              <div class="flex-grow h-5 rounded-lg bg-slate-50 border border-slate-200 flex items-center px-2.5 text-slate-600 text-[9px]">
                Available for Check-in
              </div>
            </div>
            <div v-if="isModal" class="flex items-center gap-2">
              <span class="w-16 text-slate-500 font-medium">VIP 301</span>
              <div class="flex-grow h-5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center px-2.5 text-emerald-800 text-[9px] font-semibold">
                Corporate Booking (Confirmed)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. POS SaaS Platform UI Mockup -->
      <div v-else-if="project.previewType === 'pos'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <!-- POS Barcode & Cashier Header -->
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono shadow-xs">
          <div class="flex items-center gap-2">
            <ShoppingCart class="w-4 h-4 text-sky-600" />
            <span class="text-slate-900 font-bold">REGISTER #01</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">CASHIER: ACTIVE</span>
        </div>

        <!-- Order Items Grid Preview -->
        <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex-grow flex flex-col justify-between">
          <div class="space-y-1.5 text-[10px] font-mono">
            <div class="flex justify-between items-center pb-1 border-b border-slate-100 text-slate-500 font-bold">
              <span>Item & SKU</span>
              <span>Subtotal</span>
            </div>
            <div class="flex justify-between items-center text-slate-800">
              <span>Artisan Coffee Beans 500g</span>
              <span class="text-slate-900 font-semibold font-mono">Rp 125.000</span>
            </div>
            <div class="flex justify-between items-center text-slate-800">
              <span>Ceramic Pour-Over Mug x2</span>
              <span class="text-slate-900 font-semibold font-mono">Rp 180.000</span>
            </div>
          </div>

          <div class="pt-2.5 border-t border-slate-100 flex justify-between items-center font-mono">
            <span class="text-[10px] text-slate-500 font-bold uppercase">TOTAL DUE</span>
            <span class="text-xs sm:text-sm font-bold text-crimson-600">Rp 305.000</span>
          </div>
        </div>
      </div>

      <!-- 3. DeFi Crypto Analytics UI Mockup -->
      <div v-else-if="project.previewType === 'defi'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div>
            <span class="text-[9px] font-mono text-slate-500 block font-bold uppercase">TOTAL LIQUIDITY TRACKED</span>
            <span class="text-sm sm:text-base font-bold text-slate-900 font-mono">$24,850,120</span>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
            24h Vol +12.4%
          </span>
        </div>

        <!-- Candlestick Trend Simulation -->
        <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex-grow flex flex-col justify-between">
          <span class="text-[9px] font-mono text-slate-500 font-bold uppercase">LIQUIDITY VOLUME // REALTIME CHART</span>
          <div class="flex items-end justify-between h-14 gap-2 px-2 pt-2">
            <div class="w-full bg-sky-200 h-[45%] rounded-t-sm"></div>
            <div class="w-full bg-sky-300 h-[60%] rounded-t-sm"></div>
            <div class="w-full bg-sky-200 h-[40%] rounded-t-sm"></div>
            <div class="w-full bg-sky-400 h-[75%] rounded-t-sm"></div>
            <div class="w-full bg-sky-500 h-[90%] rounded-t-sm"></div>
            <div class="w-full bg-amber-500 h-[100%] rounded-t-sm shadow-xs"></div>
          </div>
        </div>
      </div>

      <!-- 4. RentHouse Property Platform UI Mockup -->
      <div v-else-if="project.previewType === 'rental'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <Building class="w-3.5 h-3.5 text-sky-600" />
            <span class="text-slate-900 font-bold">INVITATION & RSVP PORTAL</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold">GUEST LIST ACTIVE</span>
        </div>

        <div class="grid grid-cols-2 gap-2.5 flex-grow">
          <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <span class="text-[10px] font-mono text-slate-800 font-semibold">Mr. H. Sudirman</span>
            <span class="text-[10px] font-bold text-amber-700 font-mono">RSVP: Confirmed (2 Guests)</span>
            <span class="text-[9px] text-slate-500 font-mono">Seat: VIP Table 04</span>
          </div>
          <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <span class="text-[10px] font-mono text-slate-800 font-semibold">Wijaya Family</span>
            <span class="text-[10px] font-bold text-emerald-700 font-mono">RSVP: Attending</span>
            <span class="text-[9px] text-slate-500 font-mono">Digital Wishes Sent</span>
          </div>
        </div>
      </div>

      <!-- 5. Default/Portal UI Mockup (BatangToru, Web Platforms, etc.) -->
      <div v-else class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between text-xs font-mono">
          <span class="text-slate-900 font-bold truncate max-w-[220px]">{{ project.title }}</span>
          <span class="text-[9px] px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold uppercase">
            {{ project.category || 'SYSTEM ARCHITECTURE' }}
          </span>
        </div>

        <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex-grow flex flex-col justify-between">
          <div class="space-y-1.5 text-[10px] font-mono">
            <p class="text-slate-500 font-bold uppercase tracking-wider">// Core Stack & Framework</p>
            <div class="flex flex-wrap gap-1.5 pt-0.5">
              <span
                v-for="(t, idx) in project.tags.slice(0, 5)"
                :key="idx"
                class="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-medium"
              >
                {{ t }}
              </span>
            </div>
          </div>
          <div class="pt-2.5 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono">
            <span class="font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 class="w-3.5 h-3.5 text-emerald-600" />
              PERFORMANCE: 99/100
            </span>
            <span class="text-amber-700 font-bold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
              VERIFIED PRODUCTION
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
