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
  registrationDeadline: 'Registration deadline: 24 January 2026',
  totalPrize: '₹1,25,000',
  teamSize: 'Team size: 1–4',
  roundsCount: '3 elimination',
  eventStartISO: '2026-01-25T09:00:00+05:30',
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
  const editionsTrackRef = useRef<HTMLDivElement | null>(null)
  const partnersTrackRef = useRef<HTMLDivElement | null>(null)
  const editionsFallbackImage = '/vite.svg'
  const prizesRef = useRef<HTMLElement | null>(null)
  const [, setPrizeValue] = useState(0)
  const [hasAnimatedPrize, setHasAnimatedPrize] = useState(false)

  const scrollToSection = (id: string) => {
    const targetEl = document.getElementById(id)
    if (!targetEl) return
    const headerHeight = headerRef.current?.offsetHeight || 0
    const targetPosition = targetEl.offsetTop - headerHeight - 20
    window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' })
  }

  const PREVIOUS_EDITIONS = useMemo(
    () =>
      [
        {
          year: '1.0',
          image: '/domains/tech-savishkar-1.jpeg',
        },
        {
          year: '2.0',
          image: '/domains/tech-savishkar-2.jpeg',
        },
        {
          year: '3.0',
          image: '/domains/tech-savishkar-3.jpeg',
        },
        {
          year: '4.0',
          image: '/domains/tech-savishkar-4.jpeg',
        },
        {
          year: '5.0',
          image: '/domains/tech-savishkar-5.jpeg',
        },
        {
          year: '6.0',
          image: '/domains/tech-savishkar-6.jpeg',
        },
      ] as const,
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

  const scrollCarousel = (dir: -1 | 1) => {
    const el = editionsTrackRef.current
    if (!el) return
    const delta = Math.max(260, Math.floor(el.clientWidth * 0.85))
    el.scrollBy({ left: dir * delta, behavior: 'smooth' })
  }

  // Auto-scroll editions carousel with wrap-around
  useEffect(() => {
    const el = editionsTrackRef.current
    if (!el) return
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const coarse = window.matchMedia?.('(pointer: coarse)')?.matches
    if (reducedMotion || coarse || window.innerWidth <= 768) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      const nearEnd = el.scrollLeft + el.clientWidth + 10 >= el.scrollWidth
      if (nearEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollCarousel(1)
      }
    }, 2800)
    return () => window.clearInterval(id)
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
      const count = 8
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
    initial: { opacity: 0, y: 6 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.18, 
        ease: [0.25, 0.46, 0.45, 0.94], // Fast, smooth ease-out
      }
    },
    viewport: { 
      once: true, 
      amount: 0.05, // Trigger very early (5% visible)
      margin: '0px 0px -140px 0px' // Start animating earlier for snappier reveals
    },
  } as const

  return (
    <div className="app">
      <ThreeBackground />
      <div className="scroll-progress" aria-hidden />
      <div className="bg">
        <div className="bg-glow" />
        <div className="bg-grid" />
        <div className="bg-noise" />
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="TechSavishkaar" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
            <span className="brand-mark" />
            <span className="brand-text">TechSavishkaar</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'nav-link active' : 'nav-link'}
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setMobileMenuOpen(false) }}
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
                onClick={(e) => { e.preventDefault(); scrollToSection(item.id); setMobileMenuOpen(false) }}
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
                  gap: '16px',
                  fontFamily: '"Audiowide", system-ui, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(22px, 3vw, 42px)',
                  lineHeight: 1.1,
                  color: 'rgba(255, 255, 255, 0.95)',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.55)'
                }}>
                  <img
                    src="/domains/vce-logo.jpg"
                    alt="VCE Logo"
                    style={{ 
                      height: 'clamp(50px, 7vw, 95px)',  /* Increased from 40px,5vw,80px */
                      width: 'auto',
                      transition: 'transform 0.3s ease',
                      transform: 'translateZ(0)' /* Hardware acceleration */
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <span>Vasavi College of Engineering</span>
                </div>
                
                <div className="eyebrow-line" style={{
                  fontFamily: '"Audiowide", system-ui, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 2.5vw, 26px)',
                  marginTop: '8px',
                  lineHeight: 1.1,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 0 8px rgba(167, 139, 250, 0.3)'
                }}>Department of Information Technology</div>
              </div>

              <h1 className="hero-title">
                <span className="hero-title-main" data-text={EVENT.name}>{EVENT.name}</span>
              </h1>

              <p className="hero-subtitle retro hero-center" aria-label={EVENT.tagline}>
                <span className="typewriter">{EVENT.tagline}</span>
              </p>

              <div className="hero-meta">
                <span className="pill">{EVENT.registrationDeadline}</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary" href={EVENT.registrationUrl} target="_blank" rel="noopener">Register Now</a>
                <a className="btn btn-ghost" href={EVENT.brochureUrl} download="Tech-Savishkaar-Brochure.png">Download Brochure</a>
                <a className="btn btn-ghost" href="#rounds" onClick={(e) => { e.preventDefault(); scrollToSection('rounds') }}>View Rounds</a>
              </div>

              <div className="hero-features">
                <div className="feature-badge">
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content">
                    <div className="badge-value">{EVENT.totalPrize}</div>
                    <div className="badge-label">Total Prizes</div>
                  </div>
                </div>
                <div className="feature-badge">
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content">
                    <div className="badge-value">{EVENT.teamSize}</div>
                    <div className="badge-label">Team Size</div>
                  </div>
                </div>
                <div className="feature-badge">
                  <div className="badge-accent" aria-hidden />
                  <div className="badge-content">
                    <div className="badge-value">{EVENT.roundsCount}</div>
                    <div className="badge-label">Rounds</div>
                  </div>
                </div>
              </div>

              {/* Marquee and countdown moved to dedicated section below */}
            </div>
          </div>
        </motion.section>

        {/* Announcement + Countdown Section (after hero) */}
        <motion.section id="announcement" className="section" {...sectionMotion}>
          <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
            <div style={{ position: 'relative', height: '170px', overflow: 'hidden', marginBottom: '1rem' }}>
              {/* Top dark ribbon */}
              <div style={{
                position: 'absolute',
                left: '-30%',
                right: '-30%',
                top: '36px',
                transform: 'rotate(-6deg)',
                transformOrigin: 'center',
                background: '#0b0b0c',
                color: '#fff',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 18px rgba(0,0,0,0.35)',
                zIndex: 2
              }}>
                <div style={{
                  display: 'flex',
                  gap: '56px',
                  width: 'max-content',
                  padding: '14px 0',
                  fontWeight: 700,
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  animation: 'ribbonA 18s linear infinite'
                }}>
                  <span>🌐 Student Run</span>
                  <span>🌐 Student Run</span>
                  <span>🌐 Student Run</span>
                  <span>🌐 Student Run</span>
                  <span aria-hidden>🌐 Student Run</span>
                  <span aria-hidden>🌐 Student Run</span>
                  <span aria-hidden>🌐 Student Run</span>
                </div>
              </div>
              {/* Bottom blue ribbon */}
              <div style={{
                position: 'absolute',
                left: '-30%',
                right: '-30%',
                bottom: '36px',
                transform: 'rotate(6deg)',
                transformOrigin: 'center',
                background: '#1f3cf0',
                color: '#fff',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '0 10px 22px rgba(0,0,0,0.35)',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  gap: '56px',
                  width: 'max-content',
                  padding: '14px 0',
                  fontWeight: 800,
                  letterSpacing: '0.4px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  animation: 'ribbonA 22s linear infinite',
                  animationDirection: 'reverse'
                }}>
                  <span>🌐 Biggest Hackathon</span>
                  <span>🌐 Biggest Hackathon</span>
                  <span>🌐 Biggest Hackathon</span>
                  <span>🌐 Biggest Hackathon</span>
                  <span aria-hidden>🌐 Biggest Hackathon</span>
                  <span aria-hidden>🌐 Biggest Hackathon</span>
                  <span aria-hidden>🌐 Biggest Hackathon</span>
                </div>
              </div>
              <style>{`
                @keyframes ribbonA { from { transform: translateX(0); } to { transform: translateX(-50%); } }
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

            <div className="carousel">
              <button className="carousel-btn" type="button" aria-label="Previous editions" onClick={() => scrollCarousel(-1)}>
                ‹
              </button>

              <div ref={editionsTrackRef} className="carousel-track" role="region" aria-label="Previous editions carousel">
                {PREVIOUS_EDITIONS.map(item => (
                  <div key={item.year} className="edition-image-container">
                      <img
                    className="edition-image"
                        src={item.image}
                      alt={`TechSavishkaar ${item.year}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = editionsFallbackImage }}
                    />
                  </div>
                ))}
              </div>

              <button className="carousel-btn" type="button" aria-label="Next editions" onClick={() => scrollCarousel(1)}>
                ›
              </button>
            </div>
            <div className="edition-links" role="group" aria-label="Edition PDFs">
              <a className="btn btn-ghost" href="#" target="_blank" rel="noopener">Version 1</a>
              <a className="btn btn-ghost" href="#" target="_blank" rel="noopener">Version 2</a>
              <a className="btn btn-ghost" href="#" target="_blank" rel="noopener">Version 3</a>
            </div>
          </div>
        </motion.section>

        <motion.section id="about" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">About TechSavishkaar 4.0</h2>
            <p className="section-lead">
              TechSavishkaar 4.0 is a national-level hackathon that brings together engineering students from across India
              to showcase their innovative ideas and technical skills. Participants are encouraged to build impactful
              solutions through interdisciplinary collaboration, rapid prototyping, and creative problem solving.
            </p>
            
            <div className="about-clouds" aria-hidden />
            <div className="cards">
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
          </div>
        </motion.section>

        <motion.section id="rounds" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Rounds & Schedule</h2>
            <p className="section-lead">All three rounds are elimination rounds.</p>
            <div className="timeline-road">
              {[
                { title: 'Coding & Ideation Round', date: '25 January 2026', mode: 'Online', desc: 'Coding test + MCQs. Evaluation on correctness, efficiency, and originality. Outcome: Shortlisting for Round 2.' },
                { title: 'Idea Submission', date: '30 Jan – 07 Feb 2026', mode: 'Online', desc: 'Submit your idea focusing on problem identification, innovation, feasibility, and impact.' },
                { title: 'Build & Present Prototype', date: '21 February 2026', mode: 'Offline', desc: 'Prototype • Demo • Presentation at Vasavi College of Engineering, Hyderabad.' },
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

            <div className="timeline">
              {[
                { title: 'Registrations Open', date: '7 January 2026', desc: 'Registration portal opens for participants' },
                { title: 'Registrations Close', date: '24 January 2026', desc: 'Last date to register for the hackathon' },
                { title: 'Online Test', date: '25 January 2026', desc: 'Aptitude and technical evaluation' },
                { title: 'Online Test Results', date: '29 January 2026', desc: 'Results of Round 1 announced' },
                { title: 'PPT Submission Closes', date: '7 February 2026', desc: 'Deadline for Round 2 submissions' },
                { title: 'Final Shortlists Announced', date: '12 February 2026', desc: 'Teams selected for final round' },
                { title: 'Final Hackathon', date: '21 February 2026', desc: 'Offline hackathon and presentations' },
              ].map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  className="timeline-item"
                  initial={{ opacity: 0.6, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.01 }}
                >
                  <div className="timeline-marker"><Target size={14} className="timeline-marker-icon" /></div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="accent-line" />
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
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
            <div className="cards">
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:0*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Timelines</h3>
                  <div className="accent-line" />
                  <p>Teams must adhere strictly to the timelines of each round.</p>
                </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:1*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Plagiarism</h3>
                  <div className="accent-line" />
                  <p>Plagiarism or reuse of existing solutions without attribution will lead to immediate disqualification.</p>
                </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:2*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Malpractice</h3>
                  <div className="accent-line" />
                  <p>Any form of malpractice during online rounds will result in elimination.</p>
                </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:3*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Judging</h3>
                  <div className="accent-line" />
                  <p>The decision of the judging panel is final and binding.</p>
                </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:4*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Attendance</h3>
                  <div className="accent-line" />
                  <p>Teams qualifying for the final round must be present physically at the venue.</p>
                </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.12}} transition={{duration:0.22, ease:'easeOut', delay:5*0.02}}>
                <TiltCard className="card card-hover">
                  <h3>Final Round Fee</h3>
                  <div className="accent-line" />
                  <p>Final round entry fee: ₹1000 per team (applicable only for teams selected to Round 3).</p>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section id="coordinators" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Coordinators</h2>
            <p className="section-lead">Reach out to the team for any queries or support.</p>

            <h3 className="section-subtitle">Principal & HOD</h3>
            <div className="people-grid" style={{ gridTemplateColumns: '1fr' }}>
              {COORDINATORS.filter(c => c.role === 'Principal' || c.role === 'Professor & HOD, IT Department').map((p, i) => (
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
                      <div className="partner-logo">
                        <img src={logo.src} alt={logo.alt} loading="lazy" />
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
                  ACCREDITED BY NAAC WITH 'A++' GRADE<br />
                  Sponsored by Vasavi Academy of Education<br />
                  Affiliated to Osmania University, Hyderabad<br />
                  Approved by AICTE, New Delhi
                </address>
              </div>
              
              <div className="footer-section">
                <h3>In Association With</h3>
                <div className="associations">
                  <div className="association-logo">
                    <img src="/domains/dsac.jpeg" alt="DSAC" title="DSAC" />
                  </div>
                  <div className="association-logo">
                    <img src="/domains/ieee.jpeg" alt="IEEE" title="IEEE" />
                  </div>
                  <div className="association-logo">
                    <img src="/domains/csi.jpeg" alt="Computer Society of India" title="Computer Society of India" />
                  </div>
                  <div className="association-logo">
                    <img src="/domains/acm.jpeg" alt="Association for Computing Machinery" title="ACM" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-left">© {new Date().getFullYear()} TechSavishkaar</div>
              <div className="footer-right">Department of Information Technology</div>
            </div>
          </div>
        </footer>

        {/* Floating back-to-top button */}
        <a href="#home" className="back-to-top-fab" aria-label="Back to top">↑</a>
      </main>
    </div>
  )
}
