import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Instagram, Target, Lightbulb, Handshake, Zap, Sprout, Globe, Stethoscope, Menu, X, Trophy, Award, Users, Lock } from 'lucide-react'
import ThreeBackground from './ThreeBackground'


// (Removed unused "CodeSnippets" and "BackgroundGlyphs" components)

// Matrix rain effect component (canvas-based)
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = canvas.clientWidth
    let height = canvas.clientHeight
    const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1))

    let isActive = true
    let lastFrame = 0
    const targetFrameMs = 1000 / 24

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    const onResize = () => {
      resize()
      rebuild()
    }
    window.addEventListener('resize', onResize)

    const fontSize = window.innerWidth <= 768 ? 18 : 20
    let columns = Math.max(1, Math.ceil(width / fontSize))
    let drops = new Array(columns).fill(0).map(() => Math.floor((Math.random() * height) / fontSize))
    const chars = '01'

    const rebuild = () => {
      columns = Math.max(1, Math.ceil(width / fontSize))
      drops = new Array(columns).fill(0).map(() => Math.floor((Math.random() * height) / fontSize))
    }

    const draw = (now: number) => {
      if (!isActive || document.hidden) return

      if (now - lastFrame < targetFrameMs) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastFrame = now

      // Very subtle background for trails
      ctx.fillStyle = 'rgba(7, 8, 20, 0.15)'
      ctx.fillRect(0, 0, width, height)

      // Very subtle numbers
      ctx.fillStyle = 'rgba(34, 211, 238, 0.3)' // cyan tone with 30% opacity
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillText(text, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (raf) cancelAnimationFrame(raf)
      lastFrame = performance.now()
      raf = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const onVis = () => {
      if (document.hidden) {
        stop()
        return
      }
      if (isActive) start()
    }

    const wrapEl = wrapRef.current
    const io = wrapEl
      ? new IntersectionObserver(
          entries => {
            const anyVisible = entries.some(e => e.isIntersecting)
            if (anyVisible) {
              isActive = true
              start()
            } else {
              isActive = false
              stop()
            }
          },
          { threshold: 0.02 },
        )
      : null

    if (wrapEl && io) io.observe(wrapEl)
    document.addEventListener('visibilitychange', onVis)

    start()
    return () => {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
      if (io) io.disconnect()
    }
  }, [])

  return (
    <div ref={wrapRef} className="matrix-rain">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <div className="matrix-rain-inner"></div>
    </div>
  )
}

// (Removed unused "RobotVisual" component)

type NavItem = {
  id: string
  label: string
}

const NAV: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'editions', label: 'Editions' },
  { id: 'rounds', label: 'Rounds' },
  { id: 'domains', label: 'Domains' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'prizes', label: 'Rewards' },
  { id: 'rules', label: 'Rules' },
  { id: 'coordinators', label: 'Coordinators' },
  { id: 'contact', label: 'Contact' },
]

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const EVENT = {
  name: 'Tech Savishkaar',
  organiser: 'Vasavi College of Engineering (A)',
  department: 'Department of Information Technology',
  tagline: 'Where Creativity Meets Code',
  dateLabel: 'Coming Soon',
  registrationUrl: 'https://unstop.com/p/tech-savishkaar-40-vasavi-college-of-engineering-vce-hyderabad-1620374?lb=0gRGFHMI&utm_medium=Share&utm_medium=social&utm_source=bommecha9705&utm_source=ig&utm_campaign=Online_coding_challenge&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnvFeGKlM6_NnpOgls9WRwdykEbPe3pc9wAoknauLJc07LWljUU2T2U_D2hPc_aem_8eZV1tVUYqEJNjzSQR7_Gg',
  brochureUrl: '/domains/TECH%20SAVISHKAR%20BROCHURE.png',
  registrationDeadline: 'Registration deadline: 31 January 2026',
  totalPrize: '₹1,25,000',
  teamSize: 'Team size: 1–4',
  roundsCount: '3 elimination',
  eventStartISO: '2026-01-31T09:00:00+05:30',
}

function getTimeLeft(targetISO: string) {
  const target = new Date(targetISO).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { diff, days, hours, minutes, seconds }
}

function TiltCard({ className, children }: { className: string; children: ReactNode | ((rotation: { rx: number; ry: number }) => ReactNode) }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const rotationRef = useRef({ rx: 0, ry: 0 })
  const rafRef = useRef<number | null>(null)
  const pendingRef = useRef<null | { rx: number; ry: number; px: number; py: number }>(null)

  const flush = () => {
    rafRef.current = null
    const el = ref.current
    const pending = pendingRef.current
    if (!el || !pending) return
    pendingRef.current = null

    rotationRef.current = { rx: pending.rx, ry: pending.ry }

    el.style.setProperty('--rx', `${pending.rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${pending.ry.toFixed(2)}deg`)
    el.style.setProperty('--px', pending.px.toFixed(4))
    el.style.setProperty('--py', pending.py.toFixed(4))
    el.style.setProperty('--tilt', '1')
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (e.pointerType !== 'mouse') return

    const r = el.getBoundingClientRect()
    const px = clamp((e.clientX - r.left) / Math.max(1, r.width), 0, 1)
    const py = clamp((e.clientY - r.top) / Math.max(1, r.height), 0, 1)

    const ry = (px - 0.5) * 10
    const rx = (0.5 - py) * 8

    pendingRef.current = { rx, ry, px, py }
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(flush)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    pendingRef.current = null
    rotationRef.current = { rx: 0, ry: 0 }
    el.style.setProperty('--tilt', '0')
    el.style.setProperty('--rx', `0deg`)
    el.style.setProperty('--ry', `0deg`)
    el.style.setProperty('--px', '0.5')
    el.style.setProperty('--py', '0.5')
  }

  return (
    <div ref={ref} className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {typeof children === 'function' ? children(rotationRef.current) : children}
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState<string>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT.eventStartISO))
  const partnersTrackRef = useRef<HTMLDivElement | null>(null)
  const prizesRef = useRef<HTMLElement | null>(null)
  const [, setPrizeValue] = useState(0)
  const [hasAnimatedPrize, setHasAnimatedPrize] = useState(false)
  const hexGridRef = useRef<HTMLDivElement | null>(null)
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth <= 992)
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Removed unused scrollToSection helper (native anchors used with scroll-margin-top)

  // Removed unused PREVIOUS_EDITIONS (replaced by GALLERY_IMAGES)

  // Use the same larger image set as the standalone gallery
  const GALLERY_IMAGES = useMemo(
    () => [
      '/domains/tech-savishkar-1.jpeg',
      '/domains/tech-savishkar-2.jpeg',
      '/domains/tech-savishkar-3.jpeg',
      '/domains/tech-savishkar-4.jpeg',
      '/domains/tech-savishkar-5.jpeg',
      '/domains/tech-savishkar-6.jpeg',
      '/domains/tech-savishkar-7.jpeg',
      '/domains/tech-savishkar-8.jpeg',
      '/domains/tech-savishkar-9.jpeg',
      '/domains/tech-savishkar-10.jpeg',
      '/domains/tech-savishkar-11.jpeg',
      '/domains/tech-savishkar-12.jpeg',
    ],
    []
  )

  type Coordinator = { name: string; role: 'Student Coordinator' | 'Faculty Coordinator' | 'Principal' | 'Professor & HOD, IT Department'; email?: string; phone?: string; image?: string }
  const COORDINATORS = useMemo<Coordinator[]>(
    () => [
      // Student coordinators
      { name: 'Sharath', role: 'Student Coordinator', phone: '+91 8688690015' },
      { name: 'Vaishnavi', role: 'Student Coordinator', phone: '+91 9182234630' },
      { name: 'Saakshi', role: 'Student Coordinator', phone: '+91 9041850029' },
      { name: 'Aashritha', role: 'Student Coordinator', phone: '+91 9985128512' },
      // Faculty coordinators
      { name: 'Dr. S.V.Ramana', role: 'Principal' },
      { name: 'Dr. K. Ram Mohan Rao', role: 'Professor & HOD, IT Department' },
      { name: 'C. Sireesha', role: 'Faculty Coordinator' },
      { name: ' Sathya Maranganti', role: 'Faculty Coordinator' },
      { name: 'Sruthi Anand', role: 'Faculty Coordinator' },
    ],
    []
  )

  // Removed unused scrollCarousel

  // Auto-scroll editions carousel with wrap-around
  useEffect(() => {
    // Deprecated carousel auto-scroll after switching to hex grid
    return () => {}
  }, [])

  // Auto-scroll partners logos horizontally with wrap-around
  useEffect(() => {
    const track = partnersTrackRef.current
    if (!track) return
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const coarse = window.matchMedia?.('(pointer: coarse)')?.matches
    if (reducedMotion || coarse || window.innerWidth <= 768) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      const maxScroll = track.scrollWidth - track.clientWidth
      const step = track.clientWidth
      const next = track.scrollLeft + step
      if (next >= maxScroll - 5) {
        track.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        track.scrollBy({ left: step, behavior: 'smooth' })
      }
    }, 3000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const grid = hexGridRef.current
    if (!grid) return

    grid.innerHTML = ''
    const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWQyYiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2ZmZiI+UHJldmlldyBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='
    GALLERY_IMAGES.forEach((src, idx) => {
      const btn = document.createElement('button')
      btn.className = 'hex'
      btn.type = 'button'
      btn.setAttribute('aria-label', `Edition ${idx + 1}`)
      
      const imgWrap = document.createElement('div')
      imgWrap.className = 'hex-in'
      
      // Front side (image)
      const frontDiv = document.createElement('div')
      frontDiv.className = 'hex-front'
      frontDiv.style.backgroundImage = `url(${src})`
      // Back side shows next image in sequence (wraps around)
      const backDiv = document.createElement('div')
      backDiv.className = 'hex-back'
      const otherIdx = (idx + 1) % GALLERY_IMAGES.length  // Next image, wraps around
      const otherSrc = GALLERY_IMAGES[otherIdx]
      backDiv.style.backgroundImage = `url(${otherSrc})`
      backDiv.style.backgroundSize = 'cover'
      backDiv.style.backgroundPosition = 'center'
      
      imgWrap.appendChild(frontDiv)
      imgWrap.appendChild(backDiv)
      btn.appendChild(imgWrap)
      
      // Flip on hover
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('flipped');
      });
      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('flipped');
      })
      // Fallbacks for front and back images
      const testFront = new Image()
      testFront.onerror = () => {
        frontDiv.style.backgroundImage = `url(${placeholder})`
        frontDiv.style.opacity = '0.5'
      }
      testFront.src = src
      const testBack = new Image()
      testBack.onerror = () => {
        backDiv.style.backgroundImage = `url(${placeholder})`
        backDiv.style.opacity = '0.5'
      }
      testBack.src = otherSrc
      grid.appendChild(btn)
    })

    const layoutHoneycomb = () => {
      const nodes = Array.from(grid.children) as HTMLElement[]
      const containerWidth = grid.clientWidth
      if (!containerWidth) return

      const targetW = 180
      let cols = containerWidth >= 800 ? 4 : Math.max(2, Math.floor(containerWidth / targetW))
      let w = Math.floor(containerWidth / (cols + 0.5))
      if (w < 130) {
        cols = Math.max(1, cols - 1)
        w = Math.floor(containerWidth / (cols + 0.5))
      }
      // Slightly taller hexagons for better proportions
      const h = Math.round(w * 1.15)
      // Significantly increased vertical step to prevent overlap (from 0.7 to 0.85)
      const vStep = Math.round(h * 0.85)
      nodes.forEach((el, i) => {
        const row = Math.floor(i / cols)
        const col = i % cols
        const x = Math.round(col * w + (row % 2 ? w / 2 : 0))
        const y = Math.round(row * vStep)
        el.style.width = w + 'px'
        el.style.height = h + 'px'
        el.style.left = x + 'px'
        el.style.top = y + 'px'
        el.style.position = 'absolute'
        el.style.margin = '4px'
        el.style.visibility = 'visible'
      })
      const rows = Math.ceil(nodes.length / cols)
      const totalHeight = rows * vStep + (rows ? (h - vStep) : 0)
      grid.style.height = totalHeight + 'px'
    }

    layoutHoneycomb()
    let t: number | null = null
    const onResize = () => {
      if (t) window.clearTimeout(t)
      t = window.setTimeout(layoutHoneycomb, 80)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [GALLERY_IMAGES])

  // Trigger timeline SVG draw when in view (desktop)
  useEffect(() => {
    const el = document.querySelector('.tl2-canvas') as HTMLElement | null
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          el.classList.add('inview')
        } else {
          el.classList.remove('inview')
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const sections = useMemo(() => NAV.map(n => n.id), [])

  useEffect(() => {
    const headerEl = document.querySelector<HTMLElement>('.site-header')
    headerRef.current = headerEl

    const root = document.documentElement

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const coarse = window.matchMedia?.('(pointer: coarse)')?.matches

    let mouseRaf: number | null = null
    let lastMouseX = window.innerWidth / 2
    let lastMouseY = window.innerHeight / 2
    const flushMouse = () => {
      mouseRaf = null
      const mx = (lastMouseX / Math.max(1, window.innerWidth)) * 2 - 1
      const my = (lastMouseY / Math.max(1, window.innerHeight)) * 2 - 1
      root.style.setProperty('--mx', mx.toFixed(4))
      root.style.setProperty('--my', my.toFixed(4))
    }
    const onMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX
      lastMouseY = e.clientY
      if (mouseRaf) return
      mouseRaf = window.requestAnimationFrame(flushMouse)
    }

    let scrollRaf: number | null = null
    let lastScrollY = window.scrollY
    let isUserScrolling = false
    let scrollTimeout: number | null = null

    let resizeRaf: number | null = null
    let sectionTops: Array<{ id: string; top: number }> = []
    const computeSectionTops = () => {
      sectionTops = sections.map(id => {
        const el = document.getElementById(id)
        return { id, top: el ? el.offsetTop : Number.POSITIVE_INFINITY }
      })
    }
    const onResize = () => {
      if (resizeRaf) return
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null
        computeSectionTops()
      })
    }

    const onScroll = () => {
      // On mobile, only update UI, don't interfere with scroll
      const currentScrollY = window.scrollY
      
      // Detect if this is user-initiated scroll (not programmatic)
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        isUserScrolling = true
        if (scrollTimeout) clearTimeout(scrollTimeout)
        scrollTimeout = window.setTimeout(() => {
          isUserScrolling = false
        }, 150)
      }
      
      // Don't process if user is actively scrolling on mobile
      const isMobile = window.innerWidth <= 768
      if (isMobile && isUserScrolling) {
        lastScrollY = currentScrollY
        return
      }
      
      // Throttle scroll handler using RAF
      if (scrollRaf) return
      
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null
        lastScrollY = window.scrollY
      const headerOffset = (headerRef.current?.offsetHeight ?? 0) + 24
      const y = window.scrollY + headerOffset

      let current = 'home'
      for (const s of sectionTops) {
        if (s.top <= y) current = s.id
      }
      setActive(prev => (prev === current ? prev : current))

      // Disable background updates during scroll for better performance
      // const glow = document.querySelector<HTMLElement>('.bg-glow')
      // if (glow) {
      //   const t = clamp(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight), 0, 1)
      //   glow.style.setProperty('--glow-shift', String(t))
      //   root.style.setProperty('--scroll-t', String(t))
      // }
      })
    }

    // Removed global anchor delegation; using explicit onClick handlers on links

    computeSectionTops()
    window.addEventListener('resize', onResize, { passive: true })
    if (!reducedMotion && !coarse) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      onMouseMove(new MouseEvent('mousemove', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf)
      }
      if (mouseRaf) {
        window.cancelAnimationFrame(mouseRaf)
      }
      if (resizeRaf) {
        window.cancelAnimationFrame(resizeRaf)
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [sections])

  // (Removed curved timeline overlay & scroll logic)

  useEffect(() => {
    setTimeLeft(getTimeLeft(EVENT.eventStartISO))
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(EVENT.eventStartISO))
    }, 1000)
    return () => window.clearInterval(id)
  }, [EVENT.eventStartISO])

  // Click particle burst (for rocket cursor effect)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      const coarse = window.matchMedia?.('(pointer: coarse)')?.matches
      if (reducedMotion || coarse || window.innerWidth <= 768) return
      const colors = ['#22d3ee', '#a78bfa', '#60a5fa', '#f472b6']
      const count = 16
      for (let i = 0; i < count; i++) {
        const el = document.createElement('span')
        el.className = 'click-particle'
        const angle = (Math.PI * 2 * i) / count
        el.style.left = `${e.clientX}px`
        el.style.top = `${e.clientY}px`
        el.style.background = colors[i % colors.length]
        el.style.setProperty('--x', `${Math.cos(angle)}`)
        el.style.setProperty('--y', `${Math.sin(angle)}`)
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 700)
      }
    }
    window.addEventListener('mousedown', onClick)
    return () => window.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    const el = prizesRef.current
    if (!el || hasAnimatedPrize) return

    const target = 125000
    const durationMs = 1400
    let raf = 0

    const animate = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs)
        const eased = 1 - Math.pow(1 - t, 3)
        setPrizeValue(Math.round(target * eased))
        if (t < 1) raf = window.requestAnimationFrame(tick)
      }
      raf = window.requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setHasAnimatedPrize(true)
          animate()
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    io.observe(el)
    return () => {
      window.cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [hasAnimatedPrize])

  const sectionMotion = {
    initial: { opacity: 0, y: 24 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 0.55, 0.36, 1],
      },
    },
    viewport: {
      once: true,
      amount: 0.15,
      margin: '0px 0px -100px 0px',
    },
  } as const

  return (
    <div className="app">
      <ThreeBackground />
      <div className="scroll-progress" aria-hidden />
      <div className="bg">
        <div className="bg-glow" />
        <div className="bg-shine" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="TechSavishkaar" style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            padding: '8px 0'
          }}>
            <img 
              className="brand-logo"
              src="/domains/logo.jpeg" 
              alt="TechSavishkaar" 
              style={{ 
                height: 'clamp(50px, 12vw, 80px)',
                width: 'clamp(50px, 12vw, 80px)',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.28)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                padding: '3px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }} 
            />
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'nav-link active' : 'nav-link'}
                onClick={() => { setMobileMenuOpen(false) }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            {/* Register button removed from header */}
          </div>

          <button
            className="mobile-menu-btn"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} aria-label="Mobile navigation">
            {NAV.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={() => { setMobileMenuOpen(false) }}
              >
                {item.label}
              </a>
            ))}
            {/* Mobile register button removed */}
          </nav>
          
          {mobileMenuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          )}
        </div>
      </header>

      <main>
        <motion.section id="home" className="section hero" {...sectionMotion}>
          <MatrixRain />
          <div className="container hero-inner">
            <div className="hero-copy">
              <div className="eyebrow" style={{
                display: 'block',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <div className="eyebrow-line" style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '100%',
                  fontFamily: '"Playfair Display SC", serif',
                  fontWeight: 600,
                  fontSize: 'clamp(8px, 1.8vw, 12px)',
                  letterSpacing: '1.2px',
                  lineHeight: 1.1,
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.55)'
                }}>
                  <img
                    src="/domains/vce-logo.jpg"
                    alt="VCE Logo"
                    style={{ 
                      height: 'clamp(20px, 3.5vw, 40px)',
                      width: 'auto',
                      transition: 'transform 0.3s ease',
                      transform: 'translateZ(0)' /* Hardware acceleration */
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2', width: '100%' }}>
                    <span style={{ textAlign: 'center', width: '100%' }}>VASAVI COLLEGE OF ENGINEERING (A)</span>
                    <span style={{ fontSize: '0.6em', opacity: 0.85, marginTop: '1px', fontWeight: 500, letterSpacing: '0.3px', textAlign: 'center', display: 'block', width: '100%' }}>
                      Accredited by NAAC with 'A++' grade
                    </span>
                  </div>
                </div>

              
                
                <div className="eyebrow-line" style={{
                  fontFamily: '"Didact Gothic", system-ui, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(8px, 1.5vw, 11px)',
                  margin: '2px 0 0 10px',
                  letterSpacing: '0.5px',
                  lineHeight: 1.1,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 0 4px rgba(167, 139, 250, 0.2)'
                }}>Department of Information Technology</div>
              </div>

              <h1 className="hero-title">
                <span className="hero-title-main glitch" data-text={EVENT.name}>
                  <span aria-hidden className="glitch__color glitch__color--red">{EVENT.name}</span>
                  <span aria-hidden className="glitch__color glitch__color--blue">{EVENT.name}</span>
                  <span className="glitch__main">{EVENT.name}</span>
                  <span className="glitch__line glitch__line--first"></span>
                  <span className="glitch__line glitch__line--second"></span>
                </span>
              </h1>

              <p className="hero-subtitle retro hero-center" aria-label={EVENT.tagline}>
                <span className="typewriter">{EVENT.tagline}</span>
              </p>

              <div className="hero-meta">
                <span className="pill">{EVENT.registrationDeadline}</span>
              </div>

              <div className="hero-actions" style={{ gap: 12 }}>
                <a className="btn btn-primary" href={EVENT.registrationUrl} target="_blank" rel="noopener" style={{ fontWeight: 800, letterSpacing: 0.2, fontSize: 16 }}>Register Now</a>
                <a className="btn btn-ghost" href={EVENT.brochureUrl} download="Tech-Savishkaar-Brochure.png" style={{ fontWeight: 700, fontSize: 16 }}>Download Brochure</a>
                <a className="btn btn-ghost" href="#rounds" style={{ fontWeight: 700, fontSize: 16 }}>View Rounds</a>
              </div>

              <div className="hero-features">
                <a className="feature-badge" href="#prizes" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content" style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <div className="badge-value" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, letterSpacing: 0.3, marginBottom: '2px' }}>{EVENT.totalPrize}</div>
                    <div className="badge-label" style={{ fontFamily: '"Didact Gothic", system-ui, sans-serif', fontWeight: 600, letterSpacing: 0.4, fontSize: '0.85rem' }}>Total Prizes</div>
                  </div>
                </a>
                <a className="feature-badge" href="#rules" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content" style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <div className="badge-value" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, letterSpacing: 0.3, marginBottom: '2px' }}>{EVENT.teamSize}</div>
                    <div className="badge-label" style={{ fontFamily: '"Didact Gothic", system-ui, sans-serif', fontWeight: 600, letterSpacing: 0.4, fontSize: '0.85rem' }}>Team Size</div>
                  </div>
                </a>
                <a className="feature-badge" href="#rules" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content" style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <div className="badge-value rounds-count" style={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, letterSpacing: 0.3, marginBottom: '2px' }}>{EVENT.roundsCount}</div>
                    <div className="badge-label" style={{ fontFamily: '"Didact Gothic", system-ui, sans-serif', fontWeight: 600, letterSpacing: 0.4, fontSize: '0.85rem' }}>Rounds</div>
                  </div>
                </a>
              </div>

              {/* Marquee and countdown moved to dedicated section below */}
            </div>
            <style>{`
              /* Import font pairings */
              @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;700;900&family=Cinzel:wght@700;800;900&family=Playfair+Display:wght@700;800;900&family=Didact+Gothic&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Playfair+Display+SC:wght@400;700&display=swap');

              .hex-gallery-section { position: relative; padding: 12px 0 32px; max-width: 1200px; margin: 0 auto; }

              /* Hero background - transparent so 3D canvas shows through */
              .hero { 
                position: relative; 
                background: transparent;
                overflow: hidden;
              }
              
              /* Disable image overlay so ThreeBackground shows through */
              .hero::before { content: none; }
              
              /* Gradient overlays */
              .hero::after {
                content: '';
                position: absolute;
                inset: 0;
                background: 
                  radial-gradient(1000px 600px at 20% 25%, rgba(0, 178, 255, 0.15), transparent 60%),
                  radial-gradient(900px 600px at 80% 55%, rgba(0, 255, 200, 0.12), transparent 60%),
                  radial-gradient(ellipse at center, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%);
                pointer-events: none;
                z-index: 0;
              }
              
              /* Ensure content stays above background */
              .hero .container {
                position: relative;
                z-index: 2;
              }

              /* Marquee */
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }

              /* Ensure anchor targets aren't hidden under fixed header */
              .section { scroll-margin-top: 96px; }

              /* Prevent any accidental horizontal overflow from full-bleed sections/animations */
              html, body, .app { overflow-x: hidden; }
              body { margin: 0; }

              /* Ensure all containers remain centered with safe padding */
              .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; box-sizing: border-box; }

              /* Themed navbar */
              .site-header { 
                background:
                  radial-gradient(120% 100% at 10% 0%, rgba(34,211,238,0.10), transparent 60%),
                  radial-gradient(120% 120% at 90% 100%, rgba(167,139,250,0.10), transparent 60%),
                  rgba(8, 14, 28, 0.85);
                backdrop-filter: saturate(140%) blur(10px);
                border-bottom: 1px solid rgba(255,255,255,0.06);
              }
              .header-inner { 
                display: grid; grid-template-columns: auto 1fr auto auto; 
                align-items: center; gap: 16px;
              }
              .nav .nav-link { 
                position: relative;
                color: rgba(223, 236, 255, 0.88);
                background: transparent;
                border: none;
              }
              .nav .nav-link::after { 
                content: '';
                position: absolute; left: 12px; right: 12px; bottom: 6px; height: 2px;
                background: linear-gradient(90deg, rgba(167,139,250,0), rgba(34,211,238,0.65), rgba(167,139,250,0));
                transform: scaleX(0); transform-origin: center; transition: transform 200ms ease;
                border-radius: 2px;
              }
              .nav .nav-link:hover { color: #e7f7ff; }
              .nav .nav-link:hover::after { transform: scaleX(1); }
              .nav .nav-link.active { color: #eaffff; }
              .nav .nav-link.active::after { transform: scaleX(1); }
              .mobile-menu { 
                background: rgba(8,14,28,0.96); 
                border-top: 1px solid rgba(255,255,255,0.06); 
                padding: 16px 0;
              }
              .mobile-nav-link { 
                position: relative;
                display: block;
                color: rgba(223,236,255,0.92); 
                padding: 10px 20px;
                background: transparent;
                border: none;
                text-align: left;
                width: 100%;
              }
              .mobile-nav-link::after { 
                content: '';
                position: absolute; 
                left: 20px; right: 20px; bottom: 6px; height: 2px;
                background: linear-gradient(90deg, rgba(167,139,250,0), rgba(34,211,238,0.8), rgba(167,139,250,0));
                transform: scaleX(0); 
                transform-origin: center; 
                transition: transform 200ms ease;
              }
              .mobile-nav-link.active { 
                color: #eaffff; 
                background: transparent;
              }
              .mobile-nav-link.active::after,
              .mobile-nav-link:active::after {
                transform: scaleX(1);
              }

              /* Apply fonts */
              .hero-title-main { 
                font-family: 'Consolas', monospace;
                font-weight: 900;
                color: #ffffff !important; /* Force solid white */
                text-shadow: 0 0 10px #fff, 
                             0 0 20px #fff, 
                             0 0 40px #b388ff, 
                             0 0 80px #7c4dff;
                letter-spacing: 0.5px;
                position: relative;
                z-index: 10; /* Ensure text stays above glitch effects */
              }
              .hero-subtitle { 
                font-family: 'Consolas', monospace; 
                font-style: normal; 
                letter-spacing: 0.3px;
              }

              /* Tighten hero vertical spacing so features are visible above the fold */
              .hero .hero-inner { padding-top: 0 !important; padding-bottom: 4px !important; }
              .hero-title { margin: 4px 0 6px !important; }
              .hero-subtitle { margin: 6px 0 !important; }
              .hero-meta { margin: 4px 0 6px !important; }
              .hero-actions { margin: 6px 0 8px !important; }
              .hero-features { margin-top: 4px !important; }

              /* Brand logo hover and responsiveness */
              .brand-logo { display: block; }
              .brand-logo:hover { 
                transform: scale(1.06);
                box-shadow: 0 8px 22px rgba(0,0,0,0.38);
                border-color: rgba(255,255,255,0.35);
              }
              
              /* Glitch Effect */
              .glitch {
                position: relative;
                display: inline-block;
              }
              .glitch__color {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.25; /* Reduced further to not interfere with main text */
                pointer-events: none; /* Prevent interaction with glitch layers */
              }
              .glitch__color--red {
                color: #ff0000;
                animation: glitch-red 2s infinite linear alternate-reverse;
                z-index: 1;
              }
              .glitch__color--blue {
                color: #00ffff;
                animation: glitch-blue 3s infinite linear alternate-reverse;
                z-index: 2;
              }
              .glitch__main {
                position: relative;
                z-index: 3;
              }
              .glitch__line {
                position: absolute;
                height: 2px;
                width: 100%;
                background: #fff;
                left: 0;
                opacity: 0.5;
                z-index: 4;
              }
              .glitch__line--first {
                top: 20%;
                animation: glitch-line 0.5s infinite linear;
              }
              .glitch__line--second {
                top: 80%;
                animation: glitch-line 0.3s infinite linear reverse;
              }
              @keyframes glitch-red {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
              }
              @keyframes glitch-blue {
                0% { transform: translate(0); }
                20% { transform: translate(2px, -2px); }
                40% { transform: translate(-2px, 2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(-2px, -2px); }
                100% { transform: translate(0); }
              }
              @keyframes glitch-line {
                0% { left: -10%; width: 10%; }
                10% { width: 20%; }
                20% { width: 10%; }
                30% { width: 15%; }
                40% { left: 110%; width: 30%; }
                100% { left: 110%; width: 0; }
              }
              
              /* Mobile styles for tagline and feature boxes */
              @media (max-width: 768px) {
                /* Ensure logo stays on top-left and menu on right */
                .site-header .header-inner { 
                  display: flex; 
                  align-items: center; 
                  justify-content: flex-start; 
                  gap: 10px;
                }
                .site-header .brand { margin-right: auto; }
                .site-header .mobile-menu-btn { margin-left: auto; }
                .eyebrow-line:first-child {
                  font-size: clamp(16px, 4vw, 22px) !important;
                  margin-bottom: 4px !important;
                }
                .eyebrow-line:last-child {
                  font-size: clamp(14px, 3.5vw, 18px) !important;
                  margin-top: 4px !important;
                  opacity: 0.9;
                }
                .hero-title-main {
                  font-size: clamp(40px, 12vw, 56px) !important;
                  line-height: 1.1 !important;
                  letter-spacing: 0.5px;
                  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
                }
                .hero-subtitle {
                  font-size: 20px !important;
                  margin: 16px 0 !important;
                }
                .hero-features {
                  gap: 10px !important;
                }
                .feature-badge {
                  padding: 12px !important;
                }
                .badge-value {
                  font-size: 22px !important;
                  line-height: 1 !important;
                }
                .badge-label {
                  font-size: 12px !important;
                }
              }

              /* Desktop/laptop overrides: keep original sizes on wider screens */
              @media (min-width: 992px) {
                /* Reduce extra space above hero title on laptop */
                .hero .hero-inner { padding-top: 8px !important; }
                .hero .eyebrow { margin-top: 4px !important; }
                .eyebrow-line:first-child {
                  font-size: clamp(22px, 3vw, 42px) !important;
                  font-weight: 900 !important;
                }
                .eyebrow-line:first-child img {
                  height: clamp(50px, 7vw, 95px) !important;
                }
                .eyebrow-line:last-child {
                  font-size: clamp(18px, 2.5vw, 26px) !important;
                  margin-top: 8px !important;
                }
              }
              .badge-value { 
                font-size: 20px; 
                transition: font-size 0.2s ease;
              }
              @media (max-width: 768px) {
                .feature-badge .badge-value.rounds-count {
                  font-size: 18px !important;
                  font-weight: 700;
                  line-height: 1.2;
                }
              }
              @media (max-width: 768px) {
                .feature-badge .badge-content {
                  display: flex !important;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  height: 100%;
                  text-align: center;
                }
                .feature-badge .badge-value {
                  font-size: 18px !important;
                  font-weight: 700;
                  margin-bottom: 0 !important;
                  line-height: 1.2;
                }
                .feature-badge .badge-label {
                  font-size: 10px !important;
                  letter-spacing: 0.2px;
                  margin-top: 2px;
                }
                .feature-badge {
                  padding: 8px 10px !important;
                  min-height: 50px;
                  display: flex !important;
                  align-items: center;
                  justify-content: center;
                }
              }
              .hex-grid { position: relative; margin: 0 auto; width: 100%; }
              .hex { position: absolute; overflow: hidden; cursor: pointer; clip-path: polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%); perspective: 1000px; }
              .hex-in { 
                position: absolute; 
                inset: 0; 
                border: 1px solid rgba(255,255,255,0.18); 
                box-shadow: 0 8px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06); 
                background: radial-gradient(120% 100% at 50% 0%, rgba(34,211,238,0.06), transparent 60%), 
                           radial-gradient(100% 100% at 50% 100%, rgba(167,139,250,0.06), transparent 60%), 
                           rgba(15,23,42,0.45); 
                transition: transform 0.6s ease, box-shadow 0.25s ease;
                transform-style: preserve-3d;
                transform-origin: center center;
              }
              .hex.flipped .hex-in {
                transform: rotateY(180deg);
              }
              .hex-front, .hex-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                background-size: cover;
                background-position: center;
              }
              .hex-front {
                transform: rotateY(0deg);
                z-index: 2;
              }
              .hex-back {
                transform: rotateY(180deg);
                background-color: rgba(10, 20, 40, 0.9);
                background-blend-mode: overlay;
                padding: 0;
                text-align: center;
                color: white;
                font-size: 14px;
                line-height: 1.4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }
              .hex-back h4 {
                margin: 0 0 10px;
                font-size: 16px;
                color: #60a5fa;
              }
              /* Flip animation on hover */
              .hex:hover .hex-in { 
                transform: rotateY(180deg);
                box-shadow: 0 14px 36px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08); 
              }
              .hex:hover .hex-img { transform: scale(1.04); filter: saturate(1.05) contrast(1.05); }
            `}</style>
          </div>
        </motion.section>

        {/* Announcement + Countdown Section (after hero) */}
        <motion.section id="announcement" className="section" {...sectionMotion} style={{ paddingTop: 8 }}>
          <div style={{ position: 'relative', width: '100%', marginLeft: 0 }}>
            <div style={{ 
              position: 'relative', 
              height: '80px', 
              overflow: 'hidden', 
              margin: '0 0 1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                display: 'flex',
                gap: '48px',
                width: 'max-content',
                padding: '10px 0',
                fontWeight: 750,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                animation: 'ribbonA 22s linear infinite',
                flexWrap: 'nowrap',
                color: 'rgba(229, 231, 235, 0.9)'
              }}>
                <span style={{ color: 'rgba(229, 231, 235, 0.9)' }}>Tech Savishkaar 2024</span>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span style={{ color: 'rgba(229, 231, 235, 0.9)' }}>Vasavi College of Engineering</span>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span style={{ color: 'rgba(229, 231, 235, 0.9)' }}>National Level Hackathon</span>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span style={{ color: 'rgba(229, 231, 235, 0.9)' }}>Register Now</span>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span aria-hidden style={{ color: 'rgba(229, 231, 235, 0.9)' }}>Tech Savishkaar 2024</span>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span aria-hidden style={{ color: 'rgba(229, 231, 235, 0.9)' }}>Vasavi College of Engineering</span>
              </div>
              <style>{`
                @keyframes ribbonA { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                /* Edge fade mask for ribbon */
                [id="announcement"] div[style*="height: 80px"]::before,
                [id="announcement"] div[style*="height: 80px"]::after {
                  content: '';
                  position: absolute;
                  top: 0; bottom: 0; width: 80px;
                  pointer-events: none;
                }
                [id="announcement"] div[style*="height: 80px"]::before { left: 0; background: linear-gradient(90deg, rgba(7,8,20,0.0), rgba(7,8,20,0.0)); }
                [id="announcement"] div[style*="height: 80px"]::after { right: 0; background: linear-gradient(270deg, rgba(7,8,20,0.0), rgba(7,8,20,0.0)); }
              `}</style>
            </div>
          </div>

          <div className="container">
            <div className="hero-countdown-wrapper" style={{ marginTop: '0.5rem' }}>
              <div className="countdown-title">Event starts in</div>
              <div className="countdown-container">
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.days}</div>
                  <div className="countdown-text">Days</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.hours}</div>
                  <div className="countdown-text">Hours</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.minutes}</div>
                  <div className="countdown-text">Minutes</div>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-box">
                  <div className="countdown-number">{timeLeft.seconds}</div>
                  <div className="countdown-text">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="editions" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Previous Editions</h2>

            <section className="hex-gallery-section">
              <div ref={hexGridRef} className="hex-grid" aria-label="Hexagon gallery" />
            </section>

            <div className="edition-links" role="group" aria-label="Edition PDFs">
              <a className="btn btn-ghost" href="/domains/TS1.pdf" target="_blank" rel="noopener">Tech Savishkaar 1.0</a>
              <a className="btn btn-ghost" href="/domains/TS2.pdf" target="_blank" rel="noopener">Tech Savishkaar 2.0</a>
              <a className="btn btn-ghost" href="/domains/TS3.pdf" target="_blank" rel="noopener">Tech Savishkaar 3.0</a>
            </div>
          </div>
        </motion.section>

        <motion.section id="about" className="section" {...sectionMotion} style={{ padding: 0 }}>
          <div className="container" style={{ maxWidth: '100%', padding: 0, overflow: 'hidden' }}>
            <div style={{ 
              maxWidth: '100%', 
              margin: '0 auto', 
              textAlign: 'center',
              padding: '0 20px'
            }}>
              <h2 className="section-title">About Tech Savishkaar </h2>
              <p className="section-lead" style={{ 
                fontSize: 'clamp(16px, 1.8vw, 20px)', 
                lineHeight: 1.7,
                margin: '20px auto 40px',
                textAlign: 'center',
                maxWidth: '1200px',
                padding: '0 10px'
              }}>
                Tech Savishkaar 4.0 brings together India's brightest minds in a three-round national hackathon, building on the success of previous editions that witnessed 549+ team registrations and participation from premier institutions including IITs and NITs. Organized by Vasavi College of Engineering's Department of Information Technology in collaboration with ACM, IEEE, CSI, and DSAC-IT, this flagship event offers a ₹1.25 lakh prize pool and challenges students to craft innovative solutions across five cutting-edge domains. With flexible team formations of 1-4 members and an immersive journey from online coding rounds to an on-campus grand finale, Tech Savishkaar transforms passionate ideas into tangible technological breakthroughs that address real-world challenges....
              </p>
            </div>
            
            <div className="about-clouds" aria-hidden />
            <div className="cards" style={{ 
              margin: '60px auto',
              maxWidth: '1200px',
              padding: '0 20px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 * 0.01 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Target size={24} /></div>
                <h3>Real-world problem solving</h3>
                <div className="accent-line" />
                <p>Work on pressing challenges with practical outcomes and measurable impact.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 * 0.01 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Lightbulb size={24} /></div>
                <h3>Innovation and creativity</h3>
                <div className="accent-line" />
                <p>Push boundaries with fresh ideas, bold thinking, and future-ready technology.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: 2 * 0.01 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Handshake size={24} /></div>
                <h3>Teamwork and collaboration</h3>
                <div className="accent-line" />
                <p>Build with diverse teammates, mentors, and experts across domains.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: 3 * 0.01 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Zap size={24} /></div>
                <h3>Rapid prototyping</h3>
                <div className="accent-line" />
                <p>Ideate, design, and demonstrate working prototypes within high-energy timelines.</p>
              </TiltCard>
              </motion.div>
            </div>

            {/* Spacer between cards and VCE section */}
            <div style={{ height: '80px' }} />

            {/* VCE Section - Full Width */}
            <style>
              {`
                /* VCE section responsive rules */
                @media (max-width: 768px) {
                  .vce-grid {
                    grid-template-columns: 1fr !important;
                    gap: 24px !important;
                  }
                  .vce-image {
                    order: 1;
                    min-height: 240px !important;
                  }
                  .vce-text {
                    order: 2;
                    text-align: left;
                  }
                  .vce-section-inner {
                    padding: 0 20px !important;
                  }
                }
              `}
            </style>
            <div className="vce-section" style={{ 
              background: 'linear-gradient(135deg, rgba(10, 25, 50, 0.92) 0%, rgba(5, 15, 35, 0.96) 100%)',
              padding: '80px 0',
              margin: 0,
              width: '100%',
              position: 'relative',
              borderTop: '1px solid rgba(64,160,255,0.12)',
              borderBottom: '1px solid rgba(64,160,255,0.12)'
            }}>
              <div className="vce-section-inner vce-grid" style={{ 
                display: 'grid', 
                gridTemplateColumns: '1.1fr 1fr', 
                gap: '60px',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 80px',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <div className="vce-text">
                  <h3 style={{ 
                    fontSize: 'clamp(20px, 2.2vw, 28px)', 
                    margin: '0 0 16px',
                    color: '#fff',
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}>
                    Vasavi College of Engineering
                  </h3>
                  <p style={{ 
                    fontSize: 'clamp(14px, 1.6vw, 18px)', 
                    lineHeight: 1.7,
                    margin: '0 0 24px',
                    opacity: 0.9
                  }}>
                   Vasavi College of Engineering is a premier autonomous institution in Hyderabad, renowned for its strong academic foundation and value-driven education. Accredited with NAAC A++ and NBA, the college upholds the highest standards of quality in engineering education. With experienced faculty, modern infrastructure, and a vibrant campus life, Vasavi fosters technological excellence blended with human values. It empowers students to grow as skilled professionals, responsible citizens, and future leaders.
                  </p>
                  <a 
                    href="https://vce.ac.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '12px 28px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '16px',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Read More
                  </a>
                </div>
                <div className="vce-image" style={{ 
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  height: '100%',
                  minHeight: '400px',
                  transform: 'scale(1.05)',
                  marginRight: '-40px'
                }}>
                  <img 
                    src="/domains/vce.png" 
                    alt="Vasavi College of Engineering Campus"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '8px',
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="rounds" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Rounds & Schedule</h2>
            <p className="section-lead">All three rounds are elimination rounds.</p>
            <div className="timeline-road">
              {[
                { title: 'Coding & Ideation Round', date: '1st Feb 2026', mode: 'Online', desc: 'Test your coding skills and showcase your innovative thinking through a coding challenge. Keep your tech stack and project abstract ready to upload immediately after the test..' },
                { title: 'Idea Submission', date: '1st Feb – 08 Feb 2026', mode: 'Online', desc: 'Submit your detailed idea along with a video demonstration of your working prototype, highlighting its innovation, feasibility, and potential impact.' },
                { title: 'Build & Present Prototype', date: '21 Feb 2026', mode: 'Offline', desc: 'Present your complete and functional prototype before the jury panel to demonstrate your solution\'s real-world applicability and technical execution.' },
              ].map((item, index) => (
                <motion.article
                  key={`${item.title}-${index}`}
                  className="tl-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.02 }}
                >
                  <div className="tl-number" aria-hidden>{index + 1}</div>
                  <div className="tl-content">
                    <h3 className="tl-title">
                      {item.title}
                      <span className="tl-dash" aria-hidden />
                    </h3>
                    <div className="tl-duration">Duration - {item.date} • {item.mode}</div>
                    <p className="tl-desc">{item.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="domains" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Hackathon Domains</h2>

            <div className="cards">
              {[
                { variant: 'agritech', title: 'Agritech', desc: 'Innovations for modern agriculture and sustainable farming.', icon: <Sprout size={24} />, image: '/domains/agritech.gif' },
                { variant: 'environment', title: 'Remote Sensing – Environment & Sustainable Development', desc: 'Earth observation, environmental monitoring, and sustainability solutions.', icon: <Globe size={24} />, image: '/domains/geospatial.gif' },
                { variant: 'health', title: 'HealthTech', desc: 'Technology-driven solutions for healthcare and wellbeing.', icon: <Stethoscope size={24} />, image: '/domains/health.gif' },
                { variant: 'cyber', title: 'Cyber Security', desc: 'Network security, encryption, and threat protection.', icon: <Lock size={24} />, image: '/domains/cyber.gif' },
              ].map((domain, i) => (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0.6, y: 12, scale: 1 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.01 }}
                >
                  <TiltCard className={`card card-hover card-${domain.variant}`}>
                  {() => (
                    <>
                      <div className="domain-media" aria-hidden>
                        <img
                          className="domain-img"
                          src={domain.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={e => {
                            const img = e.currentTarget
                            if (img.dataset.fallbackApplied) return
                            img.dataset.fallbackApplied = '1'
                            img.src = '/vite.svg'
                          }}
                        />
                        <div className="domain-media-overlay" />
                      </div>
                        <div className="domain-body">
                      <h3>{domain.title}</h3>
                      <div className="accent-line" />
                      <p>{domain.desc}</p>
                        </div>
                    </>
                  )}
                </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

 <motion.section id="timeline" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Event Timeline</h2>
            <p className="section-lead">Key milestones and deadlines for Tech Savishkaar</p>

            <div style={{ position: 'relative', padding: '10px 0 20px' }}>
              <div style={{ 
                position: 'absolute', 
                left: isNarrow ? 24 : '50%', 
                top: 0, 
                bottom: 0, 
                width: isNarrow ? 3 : 4, 
                transform: isNarrow ? 'none' : 'translateX(-50%)', 
                background: 'linear-gradient(to bottom, rgba(167,139,250,0), rgba(167,139,250,0.5), rgba(34,211,238,0.5), rgba(167,139,250,0))' 
              }} />

              {[
                { title: 'Registrations Close', date: '31 Jan 2026', desc: 'Last date to register for the hackathon' },
                { title: 'Online Test', date: '1 Feb 2026', desc: 'Aptitude and technical evaluation' },
                { title: 'PPT Submission Closes', date: '8 Feb 2026', desc: 'Deadline for Round 2 submissions' },
                { title: 'Final Shortlists Announced', date: '12 Feb 2026', desc: 'Teams selected for final round' },
                { title: 'Final Hackathon', date: '21 Feb 2026', desc: 'Offline hackathon and presentations' },
              ].map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.03 }}
                    style={{ 
                      position: 'relative', 
                      display: 'flex', 
                      justifyContent: isNarrow ? 'flex-start' : (isLeft ? 'flex-end' : 'flex-start'), 
                      alignItems: 'center', 
                      margin: '36px 0' 
                    }}
                  >
                    {/* Step marker on spine */}
                    <div style={{ position: 'absolute', left: isNarrow ? 24 : '50%', width: 18, height: 18, borderRadius: '50%', transform: isNarrow ? 'none' : 'translate(-50%, 0)', background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', border: '3px solid #0f172a', zIndex: 2 }} />

                    {/* Connector elbow */}
                    <div style={{ display: isNarrow ? 'none' : 'block', position: 'absolute', left: isLeft ? 'calc(50% - 2px)' : '50%', transform: isLeft ? 'none' : 'translateX(-100%)', width: 44, height: 24, borderTop: '2px solid rgba(167,139,250,0.5)', borderRight: isLeft ? 'none' : '2px solid rgba(167,139,250,0.5)', borderLeft: isLeft ? '2px solid rgba(167,139,250,0.5)' : 'none', borderTopLeftRadius: isLeft ? 14 : 0, borderTopRightRadius: isLeft ? 0 : 14 }} />

                    {/* Step number beside card */}
                    <div style={{
                      position: 'absolute',
                      left: isNarrow ? 24 : '50%',
                      transform: isNarrow ? 'none' : `translateX(${isLeft ? '-56px' : '56px'})`,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 40, height: 40, borderRadius: 999,
                      background: 'linear-gradient(180deg, rgba(10,16,28,0.9), rgba(6,10,18,0.9))',
                      border: '1px solid rgba(255,255,255,0.18)', color: '#cbd5e1', fontWeight: 800,
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.35)'
                    }}>{index + 1}</div>

                    {/* Card */}
                    <div style={{
                      width: isNarrow ? 'calc(100% - 56px)' : 'calc(50% - 56px)',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 12,
                      padding: '14px 18px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                      textAlign: isNarrow ? 'left' : (isLeft ? 'right' : 'left'),
                      marginLeft: isNarrow ? 56 : undefined
                    }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', justifyContent: isNarrow ? 'flex-start' : (isLeft ? 'flex-end' : 'flex-start') }}>
                        <h3 style={{ margin: 0, color: '#fff', fontSize: '1.05rem' }}>{item.title}</h3>
                      </div>
                      <div style={{ opacity: 0.85, fontSize: '0.9rem', marginTop: 6 }}>{item.date}</div>
                      <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
          </motion.section>



        <motion.section id="prizes" className="section" {...sectionMotion} ref={prizesRef}>
          <div className="container">
            <div className="section-header">
              <div className="section-tag">Prizes & Perks</div>
            <h2 className="section-title">Rewards & Recognition</h2>
              <p className="section-lead">Prize pool worth ₹1.25 Lakh + recognition, certificates, and more.</p>
            </div>
            <div className="podium-wrap" style={{ display: 'grid', gridTemplateColumns: isNarrow ? '1fr' : '1fr 1.2fr 1fr', gap: isNarrow ? 12 : 16, alignItems: isNarrow ? 'stretch' : 'end', marginBottom: 24 }}>
              <div style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(96,165,250,0.15), transparent 60%), rgba(11,12,16,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, boxShadow: '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)', padding: isNarrow ? '16px 14px' : '22px 18px', textAlign: 'center' }}>
                <div style={{ opacity: 0.85, letterSpacing: 1, fontWeight: 700 }}>RUNNER UP</div>
                <div style={{ fontSize: isNarrow ? 22 : 28, fontWeight: 900, margin: '10px 0 14px', color: '#93c5fd' }}>₹8000</div>
                <a className="btn btn-ghost" href="#prizes" style={{ marginTop: 4 }}>View</a>
              </div>
              <div style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(250,204,21,0.18), transparent 60%), rgba(11,12,16,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, boxShadow: '0 18px 36px rgba(0,0,0,0.45), 0 0 24px rgba(234,179,8,0.12) inset', padding: isNarrow ? '18px 16px' : '26px 20px', textAlign: 'center', transform: isNarrow ? 'none' : 'translateY(-10px)' }}>
                <div style={{ opacity: 0.9, letterSpacing: 1, fontWeight: 800 }}>WINNER</div>
                <div style={{ fontSize: isNarrow ? 28 : 36, fontWeight: 900, margin: '10px 0 14px', color: '#fde047', textShadow: '0 0 24px rgba(234,179,8,0.3)' }}>₹18,000</div>
                <a className="btn btn-primary" href="#prizes" style={{ marginTop: 4 }}>View</a>
              </div>
              <div style={{ background: 'radial-gradient(120% 120% at 0% 0%, rgba(244,63,94,0.12), transparent 60%), rgba(11,12,16,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, boxShadow: '0 10px 24px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)', padding: isNarrow ? '16px 14px' : '22px 18px', textAlign: 'center' }}>
                <div style={{ opacity: 0.85, letterSpacing: 1, fontWeight: 700 }}>2ND RUNNER UP</div>
                <div style={{ fontSize: isNarrow ? 22 : 28, fontWeight: 900, margin: '10px 0 14px', color: '#fca5a5' }}>₹5000</div>
                <a className="btn btn-ghost" href="#prizes" style={{ marginTop: 4 }}>View</a>
              </div>
            </div>
            <div className="prize-cards">
              <motion.div className="prize-card main-prize" initial={{opacity:0, scale:0.98, y:8}} whileInView={{opacity:1, scale:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.18, ease:[0.25, 0.46, 0.45, 0.94]}}>
                <div className="prize-content">
                  <h3 className="prize-amount" aria-label="Total prize pool">
                    <span className="amount-text">{EVENT.totalPrize}</span>
                  </h3>
                  <p className="prize-description">{EVENT.totalPrize} worth rewards across categories</p>
                  <div className="prize-features">
                    <div className="feature">
                      <Trophy size={20} className="feature-icon" />
                      <span>Trophies + certificates for winners</span>
                    </div>
                    <div className="feature">
                      <Award size={20} className="feature-icon" />
                      <span>Certificates for all participants</span>
                    </div>
                    <div className="feature">
                      <Users size={20} className="feature-icon" />
                      <span>Visibility to industry & academia</span>
                    </div>
                  </div>

                </div>

                <div className="prize-visual" aria-hidden="true">
                  <img
                    src="/domains/prizes.gif"
                    alt=""
                    className="prize-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        <motion.section id="rules" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Rules & Guidelines</h2>
            <div style={{
              background: 'transparent',
              borderRadius: 0,
              border: 'none',
              boxShadow: 'none',
              overflow: 'visible',
              position: 'relative',
              padding: 0,
              margin: '16px 0 0',
              maxWidth: '100%'
            }}>
              <div style={{
                position: 'relative',
                zIndex: 1
              }}>

                <div style={{ 
                  position: 'relative',
                  padding: '40px 40px 40px 20px',
                  marginRight: '20px'
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    bottom: 0, 
                    width: '2px', 
                    background: 'linear-gradient(to bottom, transparent, rgba(167, 139, 250, 0.5), transparent)' 
                  }} />

                  <div style={{ display: 'grid', gap: 16 }}>
                    {[
                      { title: 'Eligibility', desc: 'Open to undergraduate students (BE/B.Tech/ME/M.Tech) from colleges across India with team size of 1-4 members; inter-college and inter-branch collaborations are permitted' },
                      { title: 'Deadlines', desc: 'Teams must strictly adhere to the deadlines of each round, and late submissions will not be accepted under any circumstances' },
                      { title: 'Online Rounds', desc: 'Round 1 and Round 2 will be attempted only by the team leader online, while teammates can assist and collaborate during these rounds' },
                      { title: 'Final Round', desc: 'All team members must be physically present at Vasavi College of Engineering, Hyderabad for the final round (Round 3)' },
                      { title: 'Originality', desc: 'Plagiarism or reuse of existing solutions without proper attribution will result in immediate disqualification from the competition' },
                      { title: 'Fair Play', desc: 'Any form of malpractice, cheating, or unfair means during online rounds leads to immediate elimination' },
                      { title: 'Registration Fees', desc: 'Registration for Rounds 1 and 2 is free; however, teams qualifying for Round 3 must pay a ₹1000 entry fee per team before the deadline' },
                      { title: 'Judging', desc: 'The decision of the judging panel is final and binding across all rounds, and no appeals or requests for re-evaluation will be entertained' },
                      { title: 'Communication', desc: 'Teams must provide valid contact details during registration and regularly check official channels (email and WhatsApp) for updates' },
                    ].map((rule, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        style={{
                          position: 'relative',
                          paddingLeft: '28px',
                          marginBottom: '16px'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          left: '-8px',
                          top: '12px',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #a78bfa, #22d3ee)',
                          border: '3px solid #0f172a',
                          zIndex: 2
                        }} />
                        
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          padding: '16px 20px',
                          transition: 'all 0.3s ease'
                        }}>
                          <h4 style={{
                            color: '#fff',
                            fontSize: '1.05rem',
                            margin: '0 0 8px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              borderRadius: 999,
                              background: 'linear-gradient(180deg, rgba(10,16,28,0.9), rgba(6,10,18,0.9))',
                              border: '1px solid rgba(255,255,255,0.18)',
                              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.35)',
                              color: '#cbd5e1',
                              fontWeight: 800,
                              fontSize: '1.15rem',
                              lineHeight: 1,
                              textShadow: '-1px 0 rgba(255,255,255,0.18), 0 1px rgba(255,255,255,0.18), 1px 0 rgba(255,255,255,0.18), 0 -1px rgba(255,255,255,0.18), 0 0 12px rgba(255,255,255,0.06)'
                            }}>
                              {String(index + 1)}
                            </span>
                            {rule.title}
                          </h4>
                          <p style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            margin: 0,
                            paddingLeft: '32px'
                          }}>
                            {rule.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="coordinators" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Coordinators</h2>
            <p className="section-lead">Reach out to the team for any queries or support.</p>

            <div className="people-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div>
                <h3 className="section-subtitle" style={{ marginBottom: 12 }}>Principal</h3>
                {COORDINATORS.filter(c => c.role === 'Principal').map((p, i) => (
                  <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.18, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.01}}>
                    <div className="person-body">
                      <h3 className="person-name">{p.name}</h3>
                      <div className="person-role">{p.role}</div>
                      {(p.email || p.phone) && (
                        <div className="person-contact">
                          {p.email && (
                            <a href={`mailto:${p.email}`} className="pill">{p.email}</a>
                          )}
                          {p.phone && (
                            <a href={`tel:${p.phone.replace(/\s/g,'')}`} className="pill">{p.phone}</a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
              <div>
                <h3 className="section-subtitle" style={{ marginBottom: 12 }}>HOD</h3>
                {COORDINATORS.filter(c => c.role === 'Professor & HOD, IT Department').map((p, i) => (
                  <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.18, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.01}}>
                    <div className="person-body">
                      <h3 className="person-name">{p.name}</h3>
                      <div className="person-role">{p.role}</div>
                      {(p.email || p.phone) && (
                        <div className="person-contact">
                          {p.email && (
                            <a href={`mailto:${p.email}`} className="pill">{p.email}</a>
                          )}
                          {p.phone && (
                            <a href={`tel:${p.phone.replace(/\s/g,'')}`} className="pill">{p.phone}</a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <h3 className="section-subtitle" style={{ marginTop: 18 }}>Faculty Coordinators</h3>
            <div className="people-grid">
              {COORDINATORS.filter(c => c.role === 'Faculty Coordinator').map((p, i) => (
                <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.18, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.01}}>
                  <div className="person-body">
                    <h3 className="person-name">{p.name}</h3>
                    <div className="person-role">{p.role}</div>
                    {(p.email || p.phone) && (
                      <div className="person-contact">
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="pill">{p.email}</a>
                        )}
                        {p.phone && (
                          <a href={`tel:${p.phone.replace(/\s/g,'')}`} className="pill">{p.phone}</a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <h3 className="section-subtitle" style={{ marginTop: 18 }}>Student Coordinators</h3>
            <div className="people-grid people-grid-4">
              {COORDINATORS.filter(c => c.role === 'Student Coordinator').map((p, i) => (
                <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.18, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.01}}>
                  <div className="person-body">
                    <h3 className="person-name">{p.name}</h3>
                    <div className="person-role">{p.role}</div>
                    {(p.email || p.phone) && (
                      <div className="person-contact">
                        {p.email && (
                          <a href={`mailto:${p.email}`} className="pill">{p.email}</a>
                        )}
                        {p.phone && (
                          <a href={`tel:${p.phone.replace(/\s/g,'')}`} className="pill">{p.phone}</a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="partners" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">In Association with</h2>
            <div className="partners-wrap">
              <div className="partners-carousel partners-marquee" aria-label="Partners marquee">
                <div className="partners-row">
                  {[
                    { src: '/domains/dsacit.jpeg', alt: 'DSACIT' },
                    { src: '/domains/csi.jpeg', alt: 'CSI' },
                    { src: '/domains/acm.jpeg', alt: 'ACM' },
                    { src: '/domains/ieee.jpeg', alt: 'IEEE' },
                    { src: '/domains/dsacit.jpeg', alt: 'DSACIT' },
                    { src: '/domains/csi.jpeg', alt: 'CSI' },
                    { src: '/domains/acm.jpeg', alt: 'ACM' },
                    { src: '/domains/ieee.jpeg', alt: 'IEEE' },
                  ].map((logo, index) => (
                    <div key={`${index}-${logo.src}`} className="partner-slide">
                      <div className="partner-logo" style={{ width: '280px', height: '140px', padding: '20px' }}>
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          loading="lazy" 
                          style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="contact">
              <TiltCard className="card card-hover">
                <h3>Follow Us</h3>
                <div className="contact-links" aria-label="Social links">
                  <a className="btn btn-ghost" href="mailto:techsavishkaar@gmail.com" target="_blank" rel="noreferrer">
                    <Mail size={16} style={{ marginRight: 8 }} /> Email
                  </a>
                  <a className="btn btn-ghost" href="https://www.linkedin.com/company/dsac-it-vce/" target="_blank" rel="noreferrer">
                    <Linkedin size={16} style={{ marginRight: 8 }} /> LinkedIn
                  </a>
                  <a className="btn btn-ghost" href="https://www.instagram.com/dsac_it?igsh=MXZxZmZpYWNtcmJtbg==" target="_blank" rel="noreferrer">
                    <Instagram size={16} style={{ marginRight: 8 }} /> Instagram
                  </a>
                </div>
              </TiltCard>

              <div className="card">
                <h3>Message us</h3>
                <p>
                  Share your email and message. We’ll reply with details and updates.
                </p>
                <form
                  className="form"
                  onSubmit={e => {
                    e.preventDefault()
                    const form = e.currentTarget as HTMLFormElement
                    const data = new FormData(form)
                    const name = (data.get('name') as string) || ''
                    const email = (data.get('email') as string) || ''
                    const message = (data.get('message') as string) || ''
                    const subject = encodeURIComponent(`Message from ${name || 'Guest'} - TechSavishkaar`)
                    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)
                    window.location.href = `mailto:techsavishkaar@gmail.com?subject=${subject}&body=${body}`
                  }}
                >
                  <label>
                    Name
                    <input name="name" placeholder="Your name" required />
                  </label>
                  <label>
                    Email
                    <input name="email" placeholder="your@email.com" type="email" required />
                  </label>
                  <label>
                    Message
                    <textarea name="message" placeholder="Write your message…" rows={4} required />
                  </label>
                  <button className="btn btn-primary" type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <h3>About Department</h3>
                <p>The IT department was established in the year 2000. It offers a 4 year undergraduate programme B.E. in Information Technology with an annual intake of 180 students. The curriculum of I.T. emphasizes the ongoing Convergence of Computers, Communications and Control Systems.</p>
              </div>
              
              <div className="footer-section">
                <h3>Contact Details</h3>
                <address>
                  <strong>VASAVI COLLEGE OF ENGINEERING (A)</strong><br />
                  Ibrahimbagh, Hyderabad - 500 031, Telangana, India<br />
                  <strong>Email:</strong> principal@staff.vce.ac.in<br />
                  <strong>Phone:</strong> +91-40-23146003
                </address>
              </div>
              
              <div className="footer-section">
                <h3>About DSAC-IT</h3>
                <p>DSAC-IT is the official technical club of the IT Department at Vasavi College of Engineering, dedicated to fostering problem-solving and development skills through competitive programming, web development, and community-driven initiatives. Now in its 4th year, the club actively organizes hackathons, coding contests, and technical events to build a thriving student community rooted in innovation and collaborative learning.</p>
              </div>
            </div>
            
            <div className="associations-wrapper" style={{ marginTop: '24px', width: '100%', overflow: 'hidden' }}>
              <h3 style={{ textAlign: 'left', marginBottom: '16px', paddingLeft: '16px' }}>In Association With</h3>
              <div style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '40px',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '16px 24px',
                width: 'max-content',
                minWidth: '100%',
                margin: '0 auto'
              }}>
                <div className="association-logo" style={{ flex: '0 0 auto' }}>
                  <img 
                    src="/domains/dsacit.jpeg" 
                    alt="DSACIT" 
                    loading="lazy" 
                    style={{ maxHeight: '80px', width: 'auto', maxWidth: '100%' }} 
                  />
                </div>
                <div className="association-logo" style={{ flex: '0 0 auto' }}>
                  <img 
                    src="/domains/ieee.jpeg" 
                    alt="IEEE" 
                    loading="lazy" 
                    style={{ maxHeight: '80px', width: 'auto', maxWidth: '100%' }} 
                  />
                </div>
                <div className="association-logo" style={{ flex: '0 0 auto' }}>
                  <img 
                    src="/domains/csi.jpeg" 
                    alt="Computer Society of India" 
                    loading="lazy" 
                    style={{ maxHeight: '80px', width: 'auto', maxWidth: '100%' }} 
                  />
                </div>
                <div className="association-logo" style={{ flex: '0 0 auto' }}>
                  <img 
                    src="/domains/acm.jpeg" 
                    alt="Association for Computing Machinery" 
                    loading="lazy" 
                    style={{ maxHeight: '80px', width: 'auto', maxWidth: '100%' }} 
                  />
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-left">© {new Date().getFullYear()} TechSavishkaar</div>
              <div className="footer-right" style={{ fontWeight: 'normal' }}>Department of Information Technology</div>
            </div>
          </div>
        </footer>

        {/* Floating back-to-top button */}
        <a href="#home" className="back-to-top-fab" aria-label="Back to top">↑</a>
      </main>
    </div>
  )
}
