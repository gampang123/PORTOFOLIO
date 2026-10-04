<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const cursorX = ref(-100)
const cursorY = ref(-100)
const ringX = ref(-100)
const ringY = ref(-100)
const isHovering = ref(false)
const isVisible = ref(false)
const isTouchDevice = ref(false)

let animationFrameId

const updateCursor = (e) => {
  cursorX.value = e.clientX
  cursorY.value = e.clientY
  if (!isVisible.value) isVisible.value = true
}

const renderRing = () => {
  // Smooth lerp follow
  const ease = 0.18
  ringX.value += (cursorX.value - ringX.value) * ease
  ringY.value += (cursorY.value - ringY.value) * ease
  animationFrameId = requestAnimationFrame(renderRing)
}

const handleMouseOver = (e) => {
  const target = e.target.closest('a, button, input, textarea, [role="button"], .hover-interactive')
  if (target) {
    isHovering.value = true
  } else {
    isHovering.value = false
  }
}

const handleMouseLeave = () => {
  isVisible.value = false
}

const handleMouseEnter = () => {
  isVisible.value = true
}

onMounted(() => {
  isTouchDevice.value = window.matchMedia('(pointer: coarse)').matches
  if (isTouchDevice.value) return

  window.addEventListener('mousemove', updateCursor, { passive: true })
  window.addEventListener('mouseover', handleMouseOver, { passive: true })
  document.body.addEventListener('mouseleave', handleMouseLeave)
  document.body.addEventListener('mouseenter', handleMouseEnter)

  animationFrameId = requestAnimationFrame(renderRing)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', updateCursor)
  window.removeEventListener('mouseover', handleMouseOver)
  document.body.removeEventListener('mouseleave', handleMouseLeave)
  document.body.removeEventListener('mouseenter', handleMouseEnter)
})
</script>

<template>
  <div v-if="!isTouchDevice" class="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
    <!-- Inner Dot -->
    <div
      class="fixed w-2 h-2 -ml-1 -mt-1 rounded-full bg-white transition-opacity duration-300 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
      :class="[isVisible ? 'opacity-100' : 'opacity-0', isHovering ? 'scale-0' : 'scale-100']"
      :style="{
        transform: `translate3d(${cursorX}px, ${cursorY}px, 0)`,
      }"
    ></div>

    <!-- Outer Ring Aura -->
    <div
      class="fixed -ml-5 -mt-5 rounded-full border border-white/40 transition-transform duration-200 ease-out pointer-events-none"
      :class="[
        isVisible ? 'opacity-100' : 'opacity-0',
        isHovering
          ? 'w-14 h-14 -ml-7 -mt-7 bg-white/10 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110'
          : 'w-10 h-10 scale-100',
      ]"
      :style="{
        transform: `translate3d(${ringX}px, ${ringY}px, 0)`,
      }"
    ></div>
  </div>
</template>
