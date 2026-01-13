import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Target, Lightbulb, Handshake, Zap, Sprout, Globe, Stethoscope, Menu, X, Brain, Trophy, Award, Users, Lock } from 'lucide-react'
import ThreeBackground from './ThreeBackground'

// Floating code snippets component
const CodeSnippets = () => {
  const snippets = [
    { text: '<div>', top: '15%', left: '10%', delay: 0 },
    { text: 'function()', top: '25%', left: '80%', delay: 0.2 },
    { text: '{ }', top: '60%', left: '15%', delay: 0.4 },
    { text: 'const', top: '70%', left: '85%', delay: 0.6 },
    { text: '=>', top: '40%', left: '20%', delay: 0.8 },
    { text: 'return', top: '80%', left: '75%', delay: 1.0 },
    { text: '</>', top: '35%', left: '12%', delay: 0.3 },
    { text: 'let x = 1;', top: '18%', left: '65%', delay: 0.7 },
    { text: 'if()', top: '52%', left: '8%', delay: 1.1 },
    { text: '() => {}', top: '68%', left: '60%', delay: 1.3 },
    { text: 'map()', top: '46%', left: '88%', delay: 1.5 },
    { text: '<span/>', top: '28%', left: '34%', delay: 0.9 },
  ]

  return (
    <div className="code-snippets">
      {snippets.map((snippet, i) => (
        <motion.span
          key={i}
          className="code-snippet"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            y: [20, 0, -20],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            delay: snippet.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: snippet.top,
            left: snippet.left,
            color: 'rgba(34, 211, 238, 0.28)',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {snippet.text}
        </motion.span>
      ))}
    </div>
  )

}

const BackgroundGlyphs = () => {
  const items = [
    { Icon: Trophy, top: '22%', left: '8%', size: 18, delay: 0 },
    { Icon: Brain, top: '28%', left: '78%', size: 16, delay: 0.2 },
    { Icon: Lock, top: '62%', left: '12%', size: 16, delay: 0.4 },
    { Icon: Globe, top: '70%', left: '82%', size: 18, delay: 0.6 },
    { Icon: Sprout, top: '42%', left: '20%', size: 16, delay: 0.8 },
    { Icon: Zap, top: '50%', left: '88%', size: 16, delay: 1.0 },
    { Icon: Target, top: '36%', left: '35%', size: 16, delay: 1.2 },
    { Icon: Users, top: '76%', left: '60%', size: 16, delay: 1.4 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {items.map(({ Icon, top, left, size, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 0.22, y: [6, -6, 6] }}
          transition={{ duration: 10, delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ position: 'absolute', top, left, color: 'rgba(231, 234, 243, 0.18)' }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  )
}

// Matrix rain effect component
const MatrixRain = () => {
  return (
    <div className="matrix-rain">
      <div className="matrix-rain-inner"></div>
    </div>
  )
}

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
  name: 'TechSaavishkaar',
  edition: '4.0',
  organiser: 'Vasavi College of Engineering (A)',
  department: 'Department of Information Technology',
  tagline: 'Where Creativity Meets Code',
  dateLabel: 'Coming Soon',
  registrationUrl: 'https://example.com/register',
  brochureUrl: 'https://example.com/brochure',
  registrationDeadline: 'Registration deadline: 24 January 2026',
  totalPrize: '₹1,25,000',
  teamSize: 'Team size: 1–5 members',
  roundsCount: '3 elimination rounds',
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
  const [rotation, setRotation] = useState({ rx: 0, ry: 0 })

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    if (e.pointerType !== 'mouse') return

    const r = el.getBoundingClientRect()
    const px = clamp((e.clientX - r.left) / Math.max(1, r.width), 0, 1)
    const py = clamp((e.clientY - r.top) / Math.max(1, r.height), 0, 1)

    const ry = (px - 0.5) * 10
    const rx = (0.5 - py) * 8

    setRotation({ rx, ry })

    el.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--px', px.toFixed(4))
    el.style.setProperty('--py', py.toFixed(4))
    el.style.setProperty('--tilt', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    setRotation({ rx: 0, ry: 0 })
    el.style.setProperty('--tilt', '0')
    el.style.setProperty('--rx', `0deg`)
    el.style.setProperty('--ry', `0deg`)
    el.style.setProperty('--px', '0.5')
    el.style.setProperty('--py', '0.5')
  }

  return (
    <div ref={ref} className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {typeof children === 'function' ? children(rotation) : children}
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState<string>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT.eventStartISO))
  const [typedTagline, setTypedTagline] = useState('')
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
    // Primary way
    window.scrollTo({ top: Math.max(0, targetPosition), behavior: 'smooth' })
    // Fallback: ensure we land correctly after native scroll settles
    setTimeout(() => {
      // If still not near target, use scrollIntoView then nudge by header height
      const near = Math.abs(window.scrollY - targetPosition) < 6
      if (!near) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          window.scrollTo({ top: Math.max(0, targetEl.offsetTop - headerHeight - 20), behavior: 'auto' })
        }, 300)
      }
    }, 120)
  }
  
  // Type out the hero tagline in a continuous loop
  useEffect(() => {
    const text = EVENT.tagline
    if (!text) return
    
    let i = 0
    let isDeleting = false
    let currentText = ''
    const speed = 80 // Typing speed in ms
    const pauseDuration = 2000 // Pause at full text in ms
    
    const type = () => {
      if (isDeleting) {
        // Delete text
        currentText = text.substring(0, currentText.length - 1)
      } else {
        // Type text
        currentText = text.substring(0, i + 1)
        i++
      }
      
      setTypedTagline(currentText)
      
      if (!isDeleting && currentText === text) {
        // Pause at full text
        setTimeout(() => {
          isDeleting = true
          type()
        }, pauseDuration)
      } else if (isDeleting && currentText === '') {
        // Start typing again after deleting
        isDeleting = false
        i = 0
        setTimeout(type, 500)
      } else {
        // Continue typing/deleting
        const timeout = isDeleting ? speed / 2 : speed
        setTimeout(type, timeout)
      }
    }
    
    // Start the typing effect
    const timeoutId = setTimeout(type, 1000) // Initial delay
    
    return () => clearTimeout(timeoutId)
  }, [])

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
      { name: 'Dr. S.V.Ramana, M.Tech., Ph.D.', role: 'Principal' },
      { name: 'Dr. K. Ram Mohan Rao, M.Tech., Ph.D.', role: 'Professor & HOD, IT Department' },
      { name: 'C. Sireesha, M.Tech., Ph.D.', role: 'Faculty Coordinator' },
      { name: 'Mrs. Sathya Maranganti', role: 'Faculty Coordinator' },
      { name: 'Mrs. Sruthi Anand', role: 'Faculty Coordinator' },
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
    const id = window.setInterval(() => {
      const nearEnd = el.scrollLeft + el.clientWidth + 10 >= el.scrollWidth
      if (nearEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        scrollCarousel(1)
      }
    }, 2800)
    return () => window.clearInterval(id)
  }, [])

  const scrollPartners = (dir: -1 | 1) => {
    const track = partnersTrackRef.current
    if (!track) return
    const delta = track.clientWidth
    track.scrollBy({ left: dir * delta, behavior: 'smooth' })
  }

  // Auto-scroll partners logos horizontally with wrap-around
  useEffect(() => {
    const track = partnersTrackRef.current
    if (!track) return
    const id = window.setInterval(() => {
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

    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1
      const my = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1
      root.style.setProperty('--mx', mx.toFixed(4))
      root.style.setProperty('--my', my.toFixed(4))
    }

    let scrollRaf: number | null = null
    let lastScrollY = window.scrollY
    let isUserScrolling = false
    let scrollTimeout: number | null = null

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
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= y) current = id
      }
      setActive(current)

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

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onMouseMove(new MouseEvent('mousemove', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }))
    onScroll()
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf)
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [sections])

  useEffect(() => {
    setTimeLeft(getTimeLeft(EVENT.eventStartISO))
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(EVENT.eventStartISO))
    }, 1000)
    return () => window.clearInterval(id)
  }, [EVENT.eventStartISO])

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
    initial: { opacity: 0, y: 8 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.25, 
        ease: [0.25, 0.46, 0.45, 0.94], // Fast, smooth ease-out
      }
    },
    viewport: { 
      once: true, 
      amount: 0.05, // Trigger very early (5% visible)
      margin: '0px 0px -80px 0px' // Start animating 80px before section enters
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
          <a className="brand" href="#home" aria-label="TechSaavishkaar" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>
            <span className="brand-mark" />
            <span className="brand-text">TechSaavishkaar</span>
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
          <CodeSnippets />
          <BackgroundGlyphs />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                {EVENT.organiser} · {EVENT.department}
              </p>

              <h1 className="hero-title">
                <span className="hero-title-main">{EVENT.name}</span>
                <span className="hero-title-edition">{EVENT.edition}</span>
              </h1>

              <p className="hero-subtitle retro" aria-label={EVENT.tagline}>
                {typedTagline}
                <span className="typing-cursor" aria-hidden>
                  |
                </span>
              </p>

             

              <div className="hero-meta">
                <span className="pill">{EVENT.registrationDeadline}</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary" href={EVENT.registrationUrl} target="_blank" rel="noopener">Register Now</a>
                <a className="btn btn-ghost" href={EVENT.brochureUrl} target="_blank" rel="noopener">Download Brochure</a>
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

              <div className="hero-marquee" aria-hidden>
                <div className="marquee">
                  <div className="marquee-track">
                    <div className="marquee-group">
                      {Array.from({ length: 4 }).map((_, rep) =>
                        [
                          'Agritech',
                          'Remote Sensing – Environment & Sustainable Development',
                          'HealthTech',
                          'Cyber Security',
                        ].map((d) => (
                          <span key={`a-${rep}-${d}`} className="logo-pill">
                            {EVENT.name} {EVENT.edition} · {d}
                          </span>
                        ))
                      )}
                </div>
                    <div className="marquee-group" aria-hidden>
                      {Array.from({ length: 4 }).map((_, rep) =>
                        [
                          'Agritech',
                          'Remote Sensing – Environment & Sustainable Development',
                          'HealthTech',
                          'Cyber Security',
                        ].map((d) => (
                          <span key={`b-${rep}-${d}`} className="logo-pill">
                            {EVENT.name} {EVENT.edition} · {d}
                          </span>
                        ))
                      )}
                </div>
                </div>
                </div>
              </div>

              <div className="hero-countdown-wrapper" aria-label="Countdown to event start">
                <div className="countdown-title">Event Starts In</div>
                <div className="countdown-container">
                  <div className="countdown-box">
                    <div className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="countdown-text">Days</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-box">
                    <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="countdown-text">Hours</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-box">
                    <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="countdown-text">Minutes</div>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-box">
                    <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="countdown-text">Seconds</div>
                  </div>
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
                      alt={`TechSaavishkaar ${item.year}`}
                        loading="lazy"
                        onError={e => {
                          const img = e.currentTarget
                          if (img.dataset.fallbackApplied) return
                          img.dataset.fallbackApplied = '1'
                          img.src = editionsFallbackImage
                        }}
                      />
                    </div>
                ))}
              </div>

              <button className="carousel-btn" type="button" aria-label="Next editions" onClick={() => scrollCarousel(1)}>
                ›
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section id="about" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">About TechSaavishkaar 4.0</h2>
            <p className="section-lead">
              TechSaavishkaar 4.0 is a national-level hackathon that brings together engineering students from across India
              to showcase their innovative ideas and technical skills. Participants are encouraged to build impactful
              solutions through interdisciplinary collaboration, rapid prototyping, and creative problem solving.
            </p>
            <div className="cards">
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 * 0.02 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Target size={24} /></div>
                <h3>Real-world problem solving</h3>
                <div className="accent-line" />
                <p>Work on pressing challenges with practical outcomes and measurable impact.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: 1 * 0.02 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Lightbulb size={24} /></div>
                <h3>Innovation and creativity</h3>
                <div className="accent-line" />
                <p>Push boundaries with fresh ideas, bold thinking, and future-ready technology.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: 2 * 0.02 }}>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Handshake size={24} /></div>
                <h3>Teamwork and collaboration</h3>
                <div className="accent-line" />
                <p>Build with diverse teammates, mentors, and experts across domains.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: 3 * 0.02 }}>
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
            <div className="rounds-holo">
              <div className="rounds-track" aria-hidden />
              {[
                {
                  label: 'Round 1',
                  title: 'Coding Challenge',
                  mode: 'Online',
                  date: '25-01-2026',
                  meta: ['Coding Tasks', 'Problem Solving'],
                  description: 'Timed online coding challenge to evaluate technical skills.'
                },
                {
                  label: 'Round 2',
                  title: 'Idea Presentation',
                  mode: 'Online',
                  date: '07-02-2026',
                  meta: ['Innovation', 'Feasibility', 'Clarity'],
                  description: 'Present your idea clearly with impact and feasibility.'
                },
                {
                  label: 'Round 3',
                  title: 'Build & Present Application',
                  mode: 'Offline',
                  date: '21-02-2026',
                  meta: ['Prototype', 'Demo', 'Presentation'],
                  description: 'Build and present your working application in the offline finale.'
                }
              ].map((round, index) => (
                <div key={round.label} className="round-panel" data-accent={index + 1}>
                  <div className="round-panel-glow" aria-hidden />
                  <div className="round-panel-header">
                    <span className="round-step">{String(index + 1).padStart(2, '0')}</span>
                    <div className="round-meta-block">
                      <span className="round-phase">{round.label}</span>
                      <span className="round-window">Date: {round.date}</span>
                  </div>
                        </div>
                  <h3 className="round-title">{round.title}</h3>
                  <div className="round-mode" aria-label="Round mode">
                    <span className="round-mode-label">Mode</span>
                    <span className="round-mode-badge">{round.mode}</span>
                      </div>
                  <p className="round-copy">{round.description}</p>
                  <div className="round-chips">
                    {round.meta.map((item) => (
                      <span className="round-chip" key={item}>
                        {item}
                      </span>
                    ))}
                    </div>
                  </div>
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
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.02 }}
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
            <p className="section-lead">Key milestones and deadlines for TechSaavishkaar 4.0</p>
            
            <div className="timeline">
              {[
                { step: '•', title: 'Registrations Open', date: '7 January 2026', desc: 'Registration portal opens for participants' },
                { step: '•', title: 'Registrations Close', date: '24 January 2026', desc: 'Last date to register for the hackathon' },
                { step: '•', title: 'Online Test', date: '25 January 2026', desc: 'Aptitude and technical evaluation' },
                { step: '•', title: 'Online Test Results', date: '29 January 2026', desc: 'Results of Round 1 announced' },
                { step: '•', title: 'PPT Submission Closes', date: '7 February 2026', desc: 'Deadline for Round 2 submissions' },
                { step: '•', title: 'Final Shortlists Announced', date: '12 February 2026', desc: 'Teams selected for final round' },
                { step: '•', title: 'Final Hackathon', date: '21 February 2026', desc: 'Offline hackathon and presentations' },
              ].map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  className="timeline-item"
                  initial={{ opacity: 0.6, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.02 }}
                >
                  <div className="timeline-marker">{item.step}</div>
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
              <motion.div className="prize-card main-prize" initial={{opacity:0, scale:0.98, y:8}} whileInView={{opacity:1, scale:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.25, ease:[0.25, 0.46, 0.45, 0.94]}}>
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
                    onError={e => {
                      const img = e.currentTarget
                      if (img.dataset.fallbackApplied) return
                      img.dataset.fallbackApplied = '1'
                      img.src = '/vite.svg'
                    }}
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        <motion.section id="rules" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Participation Rules</h2>
            <div className="cards">
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.35, ease:'easeOut', delay:0*0.04}}>
              <TiltCard className="card card-hover">
                <h3>Team Size</h3>
                <div className="accent-line" />
                <p>Teams can include 1–5 members. Build a multidisciplinary crew for maximum impact.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.35, ease:'easeOut', delay:1*0.04}}>
              <TiltCard className="card card-hover">
                <h3>Registration</h3>
                <div className="accent-line" />
                <p>Rounds 1 and 2 are free. A participation fee applies only for teams shortlisted to the final round.</p>
              </TiltCard>
              </motion.div>
              <motion.div initial={{opacity:0.6, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.35, ease:'easeOut', delay:2*0.04}}>
              <TiltCard className="card card-hover">
                <h3>Important Dates</h3>
                <div className="accent-line" />
                <p>Refer to the rounds and event timeline above to plan your submissions and participation.</p>
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
                <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.25, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.02}}>
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
                <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.25, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.02}}>
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
                <motion.article key={p.name} className="person-card" initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.05}} transition={{duration:0.25, ease:[0.25, 0.46, 0.45, 0.94], delay:i*0.02}}>
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
                {[0,1].map(rep => (
                  <div key={rep} className="partners-row">
                    {[
                      { src: '/domains/dsacit.jpeg', alt: 'DSACIT' },
                      { src: '/domains/csi.jpeg', alt: 'CSI' },
                      { src: '/domains/acm.jpeg', alt: 'ACM' },
                      { src: '/domains/ieee.jpeg', alt: 'IEEE' },
                    ].map((logo) => (
                      <div key={`${rep}-${logo.src}`} className="partner-slide">
                        <div className="partner-logo">
                          <img src={logo.src} alt={logo.alt} loading="lazy" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="contact">
              <TiltCard className="card card-hover">
                <h3>Let’s connect</h3>
                <div className="contact-links" aria-label="Social links">
                  <a className="btn btn-ghost" href="#" target="_blank" rel="noreferrer">Email</a>
                  <a className="btn btn-ghost" href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a className="btn btn-ghost" href="#" target="_blank" rel="noreferrer">Instagram</a>
                </div>
              </TiltCard>

              <div className="card">
                <h3>Message us</h3>
                <p>
                  Share your email and message. We’ll reply with details and updates.
                </p>
                <form className="form" onSubmit={e => e.preventDefault()}>
                  <label>
                    Name
                    <input placeholder="Your name" />
                  </label>
                  <label>
                    Email
                    <input placeholder="your@email.com" type="email" />
                  </label>
                  <label>
                    Message
                    <textarea placeholder="Write your message…" rows={4} />
                  </label>
                  <button className="btn btn-primary" type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-left">© {new Date().getFullYear()} TechSaavishkaar</div>
            <div className="footer-right">Built for the hackathon stage</div>
          </div>
        </footer>

        {/* Floating back-to-top button */}
        <a href="#home" className="back-to-top-fab" aria-label="Back to top">↑</a>
      </main>
    </div>
  )
}
