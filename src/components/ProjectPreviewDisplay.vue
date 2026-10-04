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
  <div class="w-full h-full flex flex-col bg-[#09090b] text-white overflow-hidden select-none font-sans">
    <!-- Window Bar Header -->
    <div class="flex items-center justify-between px-3.5 py-2 border-b border-white/10 bg-[#0f0f13] text-[11px] font-mono">
      <div class="flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-neutral-600"></span>
      </div>

      <!-- Simulated URL Address Bar -->
      <div class="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/60 border border-white/5 text-neutral-400 text-[10px] max-w-[260px] truncate">
        <span class="text-neutral-600">https://</span>
        <span class="text-neutral-300 truncate">{{ project.mockupUrl ? project.mockupUrl.replace('https://', '') : project.id + '.internal' }}</span>
      </div>

      <!-- Live Indicator -->
      <div class="flex items-center gap-1 text-[10px] text-neutral-400">
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        <span>{{ project.systemStatus || 'Active' }}</span>
      </div>
    </div>

    <!-- Image View if Available -->
    <div v-if="project.image" class="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover object-top"
        loading="lazy"
      />
    </div>

    <!-- Realistic UI Interface Mockup View (When Image is not provided yet) -->
    <div v-else class="relative w-full h-full p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0c0c10] to-[#060608]">
      <!-- Background Matrix Grid -->
      <div class="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

      <!-- 1. Hotel Management System UI Mockup -->
      <div v-if="project.previewType === 'hotel'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <!-- Top Metrics Row -->
        <div class="grid grid-cols-3 gap-2">
          <div class="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span class="text-[10px] font-mono text-neutral-400 block">OCCUPANCY</span>
            <span class="text-sm font-bold text-white font-mono">88.4%</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span class="text-[10px] font-mono text-neutral-400 block">ROOMS OCCUPIED</span>
            <span class="text-sm font-bold text-white font-mono">142 / 160</span>
          </div>
          <div class="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span class="text-[10px] font-mono text-neutral-400 block">TODAY'S REV</span>
            <span class="text-sm font-bold text-white font-mono">Rp 48.5M</span>
          </div>
        </div>

        <!-- Room Calendar Simulation -->
        <div class="p-3 rounded-xl bg-black/60 border border-white/10 flex-grow flex flex-col justify-center">
          <div class="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
            <span>ROOM RESERVATION TIMELINE</span>
            <span class="text-white text-[10px]">OCTOBER 2026</span>
          </div>
          <div class="space-y-1.5 text-[10px] font-mono">
            <div class="flex items-center gap-2">
              <span class="w-14 text-neutral-500">Deluxe 101</span>
              <div class="flex-grow h-4 rounded bg-white/20 border border-white/30 flex items-center px-2 text-white">
                Bpk. Pratama (Booked)
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-14 text-neutral-500">Suite 204</span>
              <div class="flex-grow h-4 rounded bg-neutral-800 border border-white/10 flex items-center px-2 text-neutral-400">
                Available for Check-in
              </div>
            </div>
            <div v-if="isModal" class="flex items-center gap-2">
              <span class="w-14 text-neutral-500">VIP 301</span>
              <div class="flex-grow h-4 rounded bg-white/20 border border-white/30 flex items-center px-2 text-white">
                Corporate Booking (Confirmed)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. POS SaaS Platform UI Mockup -->
      <div v-else-if="project.previewType === 'pos'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <!-- POS Barcode & Cashier Header -->
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
          <div class="flex items-center gap-2">
            <ShoppingCart class="w-3.5 h-3.5 text-neutral-400" />
            <span class="text-white">REGISTER #01</span>
          </div>
          <span class="text-[10px] text-neutral-400">CASHIER: ACTIVE</span>
        </div>

        <!-- Order Items Grid Preview -->
        <div class="p-3 rounded-xl bg-black/60 border border-white/10 flex-grow flex flex-col justify-between">
          <div class="space-y-1.5 text-[11px] font-mono">
            <div class="flex justify-between items-center pb-1 border-b border-white/5 text-neutral-400">
              <span>Item & SKU</span>
              <span>Subtotal</span>
            </div>
            <div class="flex justify-between items-center text-neutral-300">
              <span>Artisan Coffee Beans 500g</span>
              <span class="text-white">Rp 125.000</span>
            </div>
            <div class="flex justify-between items-center text-neutral-300">
              <span>Ceramic Pour-Over Mug x2</span>
              <span class="text-white">Rp 180.000</span>
            </div>
          </div>

          <div class="pt-2 border-t border-white/10 flex justify-between items-center font-mono">
            <span class="text-xs text-neutral-400">TOTAL DUE</span>
            <span class="text-sm font-bold text-white">Rp 305.000</span>
          </div>
        </div>
      </div>

      <!-- 3. DeFi Crypto Analytics UI Mockup -->
      <div v-else-if="project.previewType === 'defi'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[10px] font-mono text-neutral-400 block">TOTAL LIQUIDITY TRACKED</span>
            <span class="text-base font-bold text-white font-mono">$24,850,120</span>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/20 text-white">
            24h Vol +12.4%
          </span>
        </div>

        <!-- Candlestick Trend Simulation -->
        <div class="p-3 rounded-xl bg-black/60 border border-white/10 flex-grow flex flex-col justify-between">
          <span class="text-[10px] font-mono text-neutral-400">LIQUIDITY VOLUME // REALTIME CHART</span>
          <div class="flex items-end justify-between h-14 gap-1.5 px-2 pt-2">
            <div class="w-full bg-neutral-700 h-[45%] rounded-t-sm"></div>
            <div class="w-full bg-neutral-600 h-[60%] rounded-t-sm"></div>
            <div class="w-full bg-neutral-500 h-[40%] rounded-t-sm"></div>
            <div class="w-full bg-neutral-400 h-[75%] rounded-t-sm"></div>
            <div class="w-full bg-neutral-300 h-[90%] rounded-t-sm"></div>
            <div class="w-full bg-white h-[100%] rounded-t-sm shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
          </div>
        </div>
      </div>

      <!-- 4. RentHouse Property Platform UI Mockup -->
      <div v-else-if="project.previewType === 'rental'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <Building class="w-3.5 h-3.5 text-neutral-400" />
            <span class="text-white">PROPERTY SEARCH</span>
          </div>
          <span class="text-[10px] text-neutral-400">320+ UNITS AVAILABLE</span>
        </div>

        <div class="grid grid-cols-2 gap-2 flex-grow">
          <div class="p-2.5 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
            <span class="text-[10px] font-mono text-neutral-400">Villa Melati Sleman</span>
            <span class="text-xs font-bold text-white font-mono">Rp 3.5M / bln</span>
            <span class="text-[9px] text-neutral-500">3 KT • 2 KM • Wi-Fi</span>
          </div>
          <div class="p-2.5 rounded-xl bg-black/60 border border-white/10 flex flex-col justify-between">
            <span class="text-[10px] font-mono text-neutral-400">Pavilion Seturan</span>
            <span class="text-xs font-bold text-white font-mono">Rp 1.8M / bln</span>
            <span class="text-[9px] text-neutral-500">1 KT • AC • Ready</span>
          </div>
        </div>
      </div>

      <!-- 5. e-Reporting & Workflow UI Mockup -->
      <div v-else-if="project.previewType === 'workflow'" class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="flex items-center justify-between text-xs font-mono">
          <div class="flex items-center gap-1.5">
            <FileText class="w-3.5 h-3.5 text-neutral-400" />
            <span class="text-white">DOCUMENT APPROVAL QUEUE</span>
          </div>
          <span class="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white">4 PENDING</span>
        </div>

        <div class="p-3 rounded-xl bg-black/60 border border-white/10 flex-grow space-y-1.5 text-[11px] font-mono">
          <div class="flex justify-between items-center p-1.5 rounded bg-white/5">
            <span class="truncate max-w-[140px]">Laporan_Q3_Divisi_IT.pdf</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/20 text-white">APPROVED</span>
          </div>
          <div class="flex justify-between items-center p-1.5 rounded bg-white/5">
            <span class="truncate max-w-[140px]">Audit_Operasional_2026.pdf</span>
            <span class="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">IN REVIEW</span>
          </div>
        </div>
      </div>

      <!-- Default/Portal UI Mockup -->
      <div v-else class="relative z-10 flex flex-col h-full justify-between gap-3 text-left">
        <div class="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs font-mono">
          <span class="text-white font-medium">{{ project.title }}</span>
          <span class="text-[10px] text-neutral-400">SYSTEM ARCHITECTURE</span>
        </div>

        <div class="p-3 rounded-xl bg-black/60 border border-white/10 flex-grow flex flex-col justify-between">
          <div class="space-y-1 text-[11px] font-mono text-neutral-300">
            <p class="text-neutral-400">// Core Stack & Framework</p>
            <p class="text-white font-semibold">{{ project.tags.join(' • ') }}</p>
          </div>
          <div class="pt-2 border-t border-white/5 flex justify-between text-[10px] font-mono text-neutral-400">
            <span>PERFORMANCE: 98/100</span>
            <span class="text-white">VERIFIED PRODUCTION</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
