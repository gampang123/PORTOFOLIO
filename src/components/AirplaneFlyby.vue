<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null
let timeoutId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = 0
  let height = 0
  const resize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Plane State
  let plane = null
  let smokeParticles = []

  // Airplane SVG Path data for sleek jet
  const drawJet = (ctx, x, y, angle, scale = 1) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.scale(scale, scale)

    // Jet shadow
    ctx.fillStyle = 'rgba(15, 35, 75, 0.25)'
    ctx.beginPath()
    ctx.ellipse(0, 16, 26, 7, 0, 0, Math.PI * 2)
    ctx.fill()

    // Main fuselage
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.moveTo(32, 0)
    ctx.bezierCurveTo(24, -4, 0, -5, -24, -4)
    ctx.lineTo(-30, -10)
    ctx.lineTo(-33, -10)
    ctx.lineTo(-30, 0)
    ctx.lineTo(-33, 10)
    ctx.lineTo(-30, 10)
    ctx.lineTo(-24, 4)
    ctx.bezierCurveTo(0, 5, 24, 4, 32, 0)
    ctx.fill()

    // Cockpit windshield
    ctx.fillStyle = '#1e3a8a'
    ctx.beginPath()
    ctx.moveTo(18, -2)
    ctx.lineTo(24, 0)
    ctx.lineTo(18, 2)
    ctx.closePath()
    ctx.fill()

    // Main Wings (Swept-back airliner style)
    ctx.fillStyle = '#f1f5f9'
    ctx.beginPath()
    ctx.moveTo(4, -3)
    ctx.lineTo(-12, -34)
    ctx.lineTo(-18, -34)
    ctx.lineTo(-10, -3)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(4, 3)
    ctx.lineTo(-12, 34)
    ctx.lineTo(-18, 34)
    ctx.lineTo(-10, 3)
    ctx.closePath()
    ctx.fill()

    // Jet engines under wings
    ctx.fillStyle = '#cbd5e1'
    ctx.beginPath()
    ctx.roundRect(-4, -16, 12, 4, 2)
    ctx.roundRect(-4, 12, 12, 4, 2)
    ctx.fill()

    // Wingtip red & green navigation lights
    ctx.fillStyle = '#ef4444' // Red on port
    ctx.beginPath()
    ctx.arc(-15, -34, 1.8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#22c55e' // Green on starboard
    ctx.beginPath()
    ctx.arc(-15, 34, 1.8, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  const launchPlane = () => {
    const isLeftToRight = Math.random() > 0.3
    const startY = height * (0.15 + Math.random() * 0.45)
    const targetY = startY - (height * (0.15 + Math.random() * 0.25))
    const startX = isLeftToRight ? -80 : width + 80
    const targetX = isLeftToRight ? width + 120 : -120

    const angle = Math.atan2(targetY - startY, targetX - startX)
    const totalDist = Math.hypot(targetX - startX, targetY - startY)
    const speed = 2.4 + Math.random() * 0.8 // cruising speed

    plane = {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      angle,
      scale: 0.75 + Math.random() * 0.35,
      active: true,
      leftEngineOffset: { x: -8, y: -14 },
      rightEngineOffset: { x: -8, y: 14 }
    }
  }

  const scheduleNextFlight = (delayMs = 12000) => {
    timeoutId = setTimeout(() => {
      launchPlane()
    }, delayMs)
  }

  // First launch shortly after mount
  scheduleNextFlight(3500)

  // Allow launching on demand via custom event
  const onLaunchDemand = () => {
    if (timeoutId) clearTimeout(timeoutId)
    launchPlane()
  }
  window.addEventListener('launch-airplane', onLaunchDemand)

  let lastTime = performance.now()

  const animate = (currentTime) => {
    const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
    lastTime = currentTime

    ctx.clearRect(0, 0, width, height)

    // Update and draw smoke particles
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
      const p = smokeParticles[i]
      p.x += p.vx * dt
      p.y += p.vy * dt
      p.radius += p.growth * dt
      p.alpha -= p.decay * dt

      if (p.alpha <= 0) {
        smokeParticles.splice(i, 1)
        continue
      }

      ctx.save()
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
      grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.75})`)
      grad.addColorStop(0.5, `rgba(240, 245, 255, ${p.alpha * 0.45})`)
      grad.addColorStop(1, `rgba(220, 235, 255, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // Update and draw plane
    if (plane && plane.active) {
      plane.x += plane.vx
      plane.y += plane.vy

      // Emit smoke puffs from wing engines
      const cos = Math.cos(plane.angle)
      const sin = Math.sin(plane.angle)

      // Left engine world pos
      const lx = plane.x + (plane.leftEngineOffset.x * cos - plane.leftEngineOffset.y * sin) * plane.scale
      const ly = plane.y + (plane.leftEngineOffset.x * sin + plane.leftEngineOffset.y * cos) * plane.scale

      // Right engine world pos
      const rx = plane.x + (plane.rightEngineOffset.x * cos - plane.rightEngineOffset.y * sin) * plane.scale
      const ry = plane.y + (plane.rightEngineOffset.x * sin + plane.rightEngineOffset.y * cos) * plane.scale

      // Add smoke puffs
      for (const pos of [{ x: lx, y: ly }, { x: rx, y: ry }]) {
        smokeParticles.push({
          x: pos.x + (Math.random() - 0.5) * 2,
          y: pos.y + (Math.random() - 0.5) * 2,
          vx: -plane.vx * 0.15 + (Math.random() - 0.5) * 4,
          vy: -plane.vy * 0.15 + (Math.random() - 0.5) * 4 + 1.5, // slight downward drift
          radius: 3.5 * plane.scale,
          growth: 16 * plane.scale,
          alpha: 0.65,
          decay: 0.28 + Math.random() * 0.12 // persists for ~2-3 seconds
        })
      }

      // Draw jet
      drawJet(ctx, plane.x, plane.y, plane.angle, plane.scale)

      // Check bounds
      if (
        (plane.vx > 0 && plane.x > width + 150) ||
        (plane.vx < 0 && plane.x < -150) ||
        plane.y < -150 ||
        plane.y > height + 150
      ) {
        plane.active = false
        plane = null
        scheduleNextFlight(14000 + Math.random() * 8000) // Next plane in 14-22s
      }
    }

    animId = requestAnimationFrame(animate)
  }

  animId = requestAnimationFrame(animate)

  onUnmounted(() => {
    if (animId) cancelAnimationFrame(animId)
    if (timeoutId) clearTimeout(timeoutId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-[5] w-full h-full overflow-hidden"
    aria-hidden="true"
  />
</template>

