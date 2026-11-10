import gsap from 'gsap'

/**
 * v-magnetic: Makes buttons attract toward the cursor with GSAP elastic spring physics
 */
export const magneticDirective = {
  mounted(el, binding) {
    const strength = binding?.value?.strength ?? 0.35
    const innerStrength = binding?.value?.innerStrength ?? 0.22
    const innerEl = el.querySelector('[data-magnetic-inner]')

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      if (innerEl) {
        gsap.to(innerEl, {
          x: x * innerStrength,
          y: y * innerStrength,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      })

      if (innerEl) {
        gsap.to(innerEl, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1.1, 0.4)',
          overwrite: 'auto',
        })
      }
    }

    el._magneticCleanup = () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
  },
  unmounted(el) {
    if (el._magneticCleanup) el._magneticCleanup()
  },
}

/**
 * v-tilt: Interactive 3D tilt perspective on hover with smooth GSAP damping
 */
export const tiltDirective = {
  mounted(el, binding) {
    const max = binding?.value?.max ?? 6
    const perspective = binding?.value?.perspective ?? 900
    const scale = binding?.value?.scale ?? 1.015

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -max
      const rotateY = ((x - centerX) / centerX) * max

      gsap.to(el, {
        transformPerspective: perspective,
        rotateX,
        rotateY,
        scale,
        duration: 0.35,
        ease: 'power1.out',
        overwrite: 'auto',
      })
    }

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    el._tiltCleanup = () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
  },
  unmounted(el) {
    if (el._tiltCleanup) el._tiltCleanup()
  },
}

