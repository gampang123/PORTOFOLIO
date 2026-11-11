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
  <div class="w-full h-full flex flex-col bg-gradient-to-br from-[#1d4c82]/90 via-[#183f6d]/90 to-[#122e50]/95 text-white overflow-hidden select-none font-sans">
    <!-- Window Bar Header in Frosted Glass -->
    <div class="flex items-center justify-between px-3.5 py-2 border-b border-white/20 bg-white/20 backdrop-blur-md text-[11px] font-mono">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-rose-400/90 shadow-sm"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400/90 shadow-sm"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-sm"></span>
      </div>

      <!-- Simulated URL Address Bar -->
      <div class="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/20 border border-white/25 text-white/90 text-[10px] max-w-[260px] truncate shadow-inner">
        <span class="text-sky-200 font-semibold">https://</span>
        <span class="text-white truncate font-medium">{{ project.mockupUrl ? project.mockupUrl.replace('https://', '') : project.id + '.internal' }}</span>
      </div>

      <!-- Live Indicator -->
      <div class="flex items-center gap-1 text-[10px] text-emerald-200">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-semibold">{{ project.systemStatus || 'Active' }}</span>
      </div>
    </div>

    <!-- Image View if Available -->
    <div v-if="project.image" class="relative w-full h-full overflow-hidden bg-sky-950 flex items-center justify-center">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-top"
        loading="lazy"
      />
    </div>

    <!-- Realistic UI Interface Mockup View in Sky Glass Design -->
    <div v-else class="relative w-full h-full p-3.5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1b4e8a]/40 to-[#0e2c52]/60">
      
      <!-- Ambient Lighting Effect -->
      <div class="absolute -top-10 -right-10 w-40 h-40 bg-sky-300/20 rounded-full blur-2xl pointer-events-none"></div>

      <!-- 1. Hotel Management System UI Mockup -->
      <div v-if="project.previewType === 'hotel'" class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <!-- Top Metrics Row -->
        <div class="grid grid-cols-3 gap-2">
          <div class="p-2 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md">
            <span class="text-[9px] font-mono text-sky-200 block font-semibold">OCCUPANCY</span>
            <span class="text-xs sm:text-sm font-bold text-white font-mono">88.4%</span>
          </div>
          <div class="p-2 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md">
            <span class="text-[9px] font-mono text-sky-200 block font-semibold">ROOMS</span>
            <span class="text-xs sm:text-sm font-bold text-white font-mono">142 / 160</span>
          </div>
          <div class="p-2 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md">
            <span class="text-[9px] font-mono text-amber-300 block font-semibold">TODAY REV</span>
            <span class="text-xs sm:text-sm font-bold text-white font-mono">Rp 48.5M</span>
          </div>
        </div>

        <!-- Room Calendar Simulation -->
        <div class="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex-grow flex flex-col justify-center">
          <div class="flex items-center justify-between text-[10px] font-mono text-sky-100 mb-2">
            <span class="font-semibold">ROOM RESERVATION TIMELINE</span>
            <span class="text-amber-300 text-[9px] font-bold">OCTOBER 2026</span>
          </div>
          <div class="space-y-1.5 text-[10px] font-mono">
            <div class="flex items-center gap-2">
              <span class="w-14 text-white/70">Deluxe 101</span>
              <div class="flex-grow h-4 rounded bg-sky-400/40 border border-sky-300/50 flex items-center px-2 text-white text-[9px] font-semibold">
                Bpk. Pratama (Booked)
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-14 text-white/70">Suite 204</span>
              <div class="flex-grow h-4 rounded bg-white/10 border border-white/20 flex items-center px-2 text-sky-200 text-[9px]">
                Available for Check-in
              </div>
            </div>
            <div v-if="isModal" class="flex items-center gap-2">
              <span class="w-14 text-white/70">VIP 301</span>
              <div class="flex-grow h-4 rounded bg-emerald-400/35 border border-emerald-300/50 flex items-center px-2 text-white text-[9px] font-semibold">
                Corporate Booking (Confirmed)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. POS SaaS Platform UI Mockup -->
      <div v-else-if="project.previewType === 'pos'" class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <!-- POS Barcode & Cashier Header -->
        <div class="flex items-center justify-between p-2 rounded-xl bg-white/15 border border-white/20 text-xs font-mono">
          <div class="flex items-center gap-2">
            <ShoppingCart class="w-3.5 h-3.5 text-sky-200" />
            <span class="text-white font-semibold">REGISTER #01</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 font-semibold">CASHIER: ACTIVE</span>
        </div>

        <!-- Order Items Grid Preview -->
        <div class="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex-grow flex flex-col justify-between">
          <div class="space-y-1 text-[10px] font-mono">
            <div class="flex justify-between items-center pb-1 border-b border-white/15 text-sky-200 font-semibold">
              <span>Item & SKU</span>
              <span>Subtotal</span>
            </div>
            <div class="flex justify-between items-center text-white/90">
              <span>Artisan Coffee Beans 500g</span>
              <span class="text-white font-semibold">Rp 125.000</span>
            </div>
            <div class="flex justify-between items-center text-white/90">
              <span>Ceramic Pour-Over Mug x2</span>
              <span class="text-white font-semibold">Rp 180.000</span>
            </div>
          </div>

          <div class="pt-2 border-t border-white/15 flex justify-between items-center font-mono">
            <span class="text-[10px] text-sky-200 font-semibold uppercase">TOTAL DUE</span>
            <span class="text-xs sm:text-sm font-bold text-amber-300">Rp 305.000</span>
          </div>
        </div>
      </div>

      <!-- 3. DeFi Crypto Analytics UI Mockup -->
      <div v-else-if="project.previewType === 'defi'" class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[9px] font-mono text-sky-200 block font-semibold">TOTAL LIQUIDITY TRACKED</span>
            <span class="text-sm sm:text-base font-bold text-white font-mono">$24,850,120</span>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/25 border border-emerald-300/40 text-emerald-200 font-semibold">
            24h Vol +12.4%
          </span>
        </div>

        <!-- Candlestick Trend Simulation -->
        <div class="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex-grow flex flex-col justify-between">
          <span class="text-[9px] font-mono text-sky-200 font-semibold uppercase">LIQUIDITY VOLUME // REALTIME CHART</span>
          <div class="flex items-end justify-between h-14 gap-1.5 px-2 pt-2">
            <div class="w-full bg-sky-300/40 h-[45%] rounded-t-sm"></div>
            <div class="w-full bg-sky-300/60 h-[60%] rounded-t-sm"></div>
            <div class="w-full bg-sky-300/50 h-[40%] rounded-t-sm"></div>
            <div class="w-full bg-sky-300/75 h-[75%] rounded-t-sm"></div>
            <div class="w-full bg-sky-200/90 h-[90%] rounded-t-sm"></div>
            <div class="w-full bg-amber-300 h-[100%] rounded-t-sm shadow-[0_0_10px_rgba(252,211,77,0.5)]"></div>
          </div>
        </div>
      </div>

      <!-- 4. RentHouse Property Platform UI Mockup -->
      <div v-else-if="project.previewType === 'rental'" class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <div class="p-2 rounded-xl bg-white/15 border border-white/20 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <Building class="w-3.5 h-3.5 text-sky-200" />
            <span class="text-white font-semibold">INVITATION & RSVP</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/40 text-amber-200 font-semibold">GUEST LIST ACTIVE</span>
        </div>

        <div class="grid grid-cols-2 gap-2 flex-grow">
          <div class="p-2 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex flex-col justify-between">
            <span class="text-[10px] font-mono text-white/90 font-medium">Bpk. H. Sudirman</span>
            <span class="text-[10px] font-bold text-amber-300 font-mono">RSVP: Confirmed (2 Pax)</span>
            <span class="text-[9px] text-sky-200 font-mono">Seat: VIP Table 04</span>
          </div>
          <div class="p-2 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex flex-col justify-between">
            <span class="text-[10px] font-mono text-white/90 font-medium">Keluarga Wijaya</span>
            <span class="text-[10px] font-bold text-emerald-300 font-mono">RSVP: Attending</span>
            <span class="text-[9px] text-sky-200 font-mono">Digital Wishes Sent</span>
          </div>
        </div>
      </div>

      <!-- 5. e-Reporting & Workflow UI Mockup -->
      <div v-else-if="project.previewType === 'workflow'" class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <FileText class="w-3.5 h-3.5 text-sky-200" />
            <span class="text-white font-semibold">COMPANY PORTAL & CMS</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">RBAC ACTIVE</span>
        </div>

        <div class="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex-grow space-y-1.5 text-[10px] font-mono">
          <div class="flex justify-between items-center p-1.5 rounded-lg bg-white/15">
            <span class="truncate max-w-[140px] text-white font-medium">Landing_Page_v2.vue</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-400/30 text-emerald-200 font-semibold">PUBLISHED</span>
          </div>
          <div class="flex justify-between items-center p-1.5 rounded-lg bg-white/15">
            <span class="truncate max-w-[140px] text-white font-medium">Corporate_Report_2026.pdf</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/30 text-amber-200 font-semibold">UPDATED</span>
          </div>
        </div>
      </div>

      <!-- Default/Portal UI Mockup -->
      <div v-else class="relative z-10 flex flex-col h-full justify-between gap-2.5 text-left">
        <div class="p-2 rounded-xl bg-white/15 border border-white/20 flex items-center justify-between text-xs font-mono">
          <span class="text-white font-semibold truncate max-w-[180px]">{{ project.title }}</span>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-sky-400/25 border border-sky-300/40 text-sky-200 font-semibold">ARCHITECTURE</span>
        </div>

        <div class="p-2.5 rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex-grow flex flex-col justify-between">
          <div class="space-y-1 text-[10px] font-mono text-white/90">
            <p class="text-sky-200 font-semibold">// Core Stack & Framework</p>
            <p class="text-white font-semibold">{{ project.tags.slice(0, 4).join(' • ') }}</p>
          </div>
          <div class="pt-2 border-t border-white/15 flex justify-between text-[9px] font-mono text-sky-200">
            <span>PERFORMANCE: 99/100</span>
            <span class="text-amber-300 font-semibold">VERIFIED PRODUCTION</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
