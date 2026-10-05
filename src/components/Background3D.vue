<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref(null)
let scene, camera, renderer, animationFrameId
let particlesMesh, geomMesh, pointsMesh
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

const initThree = () => {
  if (!canvasContainer.value) return

  // 1. Scene setup
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0018)

  const width = window.innerWidth
  const height = window.innerHeight

  // 2. Camera setup
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000)
  camera.position.z = 400
  camera.position.y = 80

  // 3. Renderer setup
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 1)
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. Create Interactive Particle Grid (Monochrome Wave Simulation)
  const particleCountX = 55
  const particleCountY = 55
  const totalParticles = particleCountX * particleCountY
  const positions = new Float32Array(totalParticles * 3)
  const scales = new Float32Array(totalParticles)
  const colors = new Float32Array(totalParticles * 3)

  const colorWhite = new THREE.Color(0xffffff)
  const colorSlate = new THREE.Color(0x71717a)
  const tempColor = new THREE.Color()

  const separation = 30
  let i = 0
  let cIndex = 0
  for (let ix = 0; ix < particleCountX; ix++) {
    for (let iy = 0; iy < particleCountY; iy++) {
      positions[i] = ix * separation - (particleCountX * separation) / 2
      positions[i + 1] = 0
      positions[i + 2] = iy * separation - (particleCountY * separation) / 2

      scales[cIndex] = 1.0

      // Monochrome gradient from pure white to slate grey
      const ratio = (ix + iy) / (particleCountX + particleCountY)
      tempColor.lerpColors(colorWhite, colorSlate, ratio)
      colors[i] = tempColor.r
      colors[i + 1] = tempColor.g
      colors[i + 2] = tempColor.b

      i += 3
      cIndex++
    }
  }

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // Custom particle material with vertex colors
  const particleMaterial = new THREE.PointsMaterial({
    size: 2.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
  })

  particlesMesh = new THREE.Points(particleGeometry, particleMaterial)
  particlesMesh.position.y = -80
  particlesMesh.rotation.x = 0.25
  scene.add(particlesMesh)

  // 5. Ambient subtle depth elements (no heavy spinning wireframe)
  const dustCount = 80
  const dustPositions = new Float32Array(dustCount * 3)
  for (let d = 0; d < dustCount * 3; d += 3) {
    dustPositions[d] = (Math.random() - 0.5) * 1200
    dustPositions[d + 1] = (Math.random() - 0.5) * 800
    dustPositions[d + 2] = (Math.random() - 0.5) * 1000
  }
  const dustGeometry = new THREE.BufferGeometry()
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
  const dustMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
  })
  const dustMesh = new THREE.Points(dustGeometry, dustMaterial)
  scene.add(dustMesh)
  // Event listeners
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onWindowResize, { passive: true })

  // Start loop
  animate()
}

const onMouseMove = (event) => {
  const windowHalfX = window.innerWidth / 2
  const windowHalfY = window.innerHeight / 2
  targetX = (event.clientX - windowHalfX) * 0.25
  targetY = (event.clientY - windowHalfY) * 0.25
}

const onWindowResize = () => {
  if (!renderer || !camera) return
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

let count = 0
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  count += 0.035

  // Smooth lerp mouse tracking
  currentX += (targetX - currentX) * 0.05
  currentY += (targetY - currentY) * 0.05

  // Animate particle wave
  if (particlesMesh) {
    const positionAttr = particlesMesh.geometry.attributes.position
    const pos = positionAttr.array
    let i = 1
    const particleCountX = 55
    const particleCountY = 55

    for (let ix = 0; ix < particleCountX; ix++) {
      for (let iy = 0; iy < particleCountY; iy++) {
        pos[i] =
          Math.sin((ix + count) * 0.3) * 22 +
          Math.sin((iy + count) * 0.5) * 22
        i += 3
      }
    }
    positionAttr.needsUpdate = true
    particlesMesh.rotation.z = currentX * 0.0003
  }

  // Camera parallax response
  camera.position.x += (currentX - camera.position.x) * 0.03
  camera.position.y += (-currentY + 80 - camera.position.y) * 0.03
  camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
}

onMounted(() => {
  initThree()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onWindowResize)

  if (renderer && renderer.domElement && canvasContainer.value) {
    canvasContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})
</script>

<template>
  <div
    ref="canvasContainer"
    class="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Ambient subtle monochrome radial light overlay -->
    <div
      class="absolute top-1/4 -left-48 w-96 h-96 bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-1/3 -right-48 w-96 h-96 bg-neutral-400/[0.03] rounded-full blur-[140px] pointer-events-none"
    ></div>
  </div>
</template>
