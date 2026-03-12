import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  opacity: number
  opacityDelta: number
  color: string
}

const COLORS = ['#0077B6', '#0077B6', '#90E0EF', '#90E0EF', '#48CAE4']

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function createParticle(width: number, height: number): Particle {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  const speed = randomBetween(0.8, 1.8)
  const angle = Math.random() * Math.PI * 2
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: randomBetween(1.5, 3.0),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    opacity: randomBetween(0.25, 0.55),
    opacityDelta: randomBetween(0.0005, 0.001) * (Math.random() < 0.5 ? 1 : -1),
    color,
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    const COUNT = 48

    function resize() {
      const { offsetWidth: w, offsetHeight: h } = canvas!.parentElement!
      const dpr = window.devicePixelRatio || 1
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.scale(dpr, dpr)
      particles = Array.from({ length: COUNT }, () => createParticle(w, h))
    }

    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    function draw() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.opacity += p.opacityDelta
        if (p.opacity > 0.60 || p.opacity < 0.18) p.opacityDelta *= -1

        p.x += p.vx
        p.y += p.vy

        if (p.x < -4) p.x = w + 4
        else if (p.x > w + 4) p.x = -4
        if (p.y < -4) p.y = h + 4
        else if (p.y > h + 4) p.y = -4

        const alpha = Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `${p.color}${alpha}`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
