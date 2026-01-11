import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FileText, FolderOpen, Trophy, Target, Lightbulb, Handshake, Zap, Sprout, Globe, Satellite, Stethoscope } from 'lucide-react'
import ThreeBackground from './ThreeBackground'

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
  { id: 'contact', label: 'Contact' },
]

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

const EVENT = {
  name: 'Tech Savishkar',
  edition: '4.0',
  organiser: 'Vasavi College of Engineering (A)',
  department: 'Department of Information Technology',
  tagline: 'Where Creativity Meets Code',
  dateLabel: 'January – February 2026',
  registrationUrl: 'https://example.com/register',
  brochureUrl: 'https://example.com/brochure',
  registrationDeadline: 'Registration deadline: 17 January 2026',
  totalPrize: '₹81,250',
  teamSize: 'Team size: 1–5 members',
  roundsCount: '3 elimination rounds',
  eventStartISO: '2026-02-21T09:00:00+05:30',
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
  const headerRef = useRef<HTMLElement | null>(null)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(EVENT.eventStartISO))
  const editionsTrackRef = useRef<HTMLDivElement | null>(null)
  const editionsFallbackImage = '/vite.svg'

  const PREVIOUS_EDITIONS = useMemo(
    () =>
      [
        {
          year: 'Tech Savishkar 1.0',
          label: 'Edition 1.0',
          highlight: 'A strong start — foundational ideas and fresh builds.',
          image: '/editions/tech-savishkar-1.0.jpg',
          tags: ['Ideate', 'Build', 'Present'],
        },
        {
          year: 'Tech Savishkar 2.0',
          label: 'Edition 2.0',
          highlight: 'Bigger participation, sharper problem statements, and stronger demos.',
          image: '/editions/tech-savishkar-2.0.jpg',
          tags: ['Scale', 'Mentorship', 'Teamwork'],
        },
        {
          year: 'Tech Savishkar 3.0',
          label: 'Edition 3.0',
          highlight: 'More domains, faster prototyping, and impactful solutions.',
          image: '/editions/tech-savishkar-3.0.jpg',
          tags: ['Innovation', 'Prototype', 'Impact'],
        },
      ] as const,
    [],
  )

  const scrollCarousel = (dir: -1 | 1) => {
    const el = editionsTrackRef.current
    if (!el) return
    const delta = Math.max(260, Math.floor(el.clientWidth * 0.85))
    el.scrollBy({ left: dir * delta, behavior: 'smooth' })
  }

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

    const onScroll = () => {
      const headerOffset = (headerRef.current?.offsetHeight ?? 0) + 24
      const y = window.scrollY + headerOffset

      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.offsetTop <= y) current = id
      }
      setActive(current)

      const glow = document.querySelector<HTMLElement>('.bg-glow')
      if (glow) {
        const t = clamp(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight), 0, 1)
        glow.style.setProperty('--glow-shift', String(t))
        root.style.setProperty('--scroll-t', String(t))
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onMouseMove(new MouseEvent('mousemove', { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }))
    onScroll()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [sections])

  useEffect(() => {
    const id = window.setInterval(() => {
      setTimeLeft(getTimeLeft(EVENT.eventStartISO))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const sectionMotion = {
    initial: { opacity: 0, y: 30, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, amount: 0.22 },
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
          <a className="brand" href="#home" aria-label="TechSaavishkaar">
            <span className="brand-mark" />
            <span className="brand-text">{EVENT.name}</span>
          </a>

          <nav className="nav" aria-label="Primary">
            {NAV.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? 'nav-link active' : 'nav-link'}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-cta">
            <a className="btn btn-ghost" href="#contact">Volunteer</a>
            <a className="btn btn-primary" href={EVENT.registrationUrl} target="_blank" rel="noopener">Register</a>
          </div>
        </div>
      </header>

      <main>
        <motion.section id="home" className="section hero" {...sectionMotion}>
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                {EVENT.organiser} · {EVENT.department}
              </p>
              <h1 className="hero-title">
                {EVENT.name} <span className="accent">{EVENT.edition}</span>
              </h1>
              <p className="hero-subtitle">{EVENT.tagline}</p>

              <div className="hero-meta">
                <span className="pill">Presented by the {EVENT.department}</span>
                <span className="pill">{EVENT.dateLabel}</span>
                <span className="pill">{EVENT.registrationDeadline}</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary" href={EVENT.registrationUrl} target="_blank" rel="noopener">Register Now</a>
                <a className="btn btn-ghost" href={EVENT.brochureUrl} target="_blank" rel="noopener">Download Brochure</a>
                <a className="btn btn-ghost" href="#rounds">View Rounds</a>
              </div>

              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">{EVENT.totalPrize}</div>
                  <div className="stat-label">Total cash prizes</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{EVENT.teamSize}</div>
                  <div className="stat-label">Build winning teams</div>
                </div>
                <div className="stat">
                  <div className="stat-value">{EVENT.roundsCount}</div>
                  <div className="stat-label">All rounds are eliminations</div>
                </div>
              </div>

              <div className="countdown" aria-label="Countdown to event start">
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-label">Min</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-label">Sec</div>
                </div>
              </div>
            </div>

                      </div>
        </motion.section>

        <motion.section id="editions" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Previous Editions of Tech Savishkar</h2>
            <p className="section-lead">A quick look back at the momentum we’ve built — swipe on mobile or use arrows.</p>

            <div className="carousel">
              <button className="carousel-btn" type="button" aria-label="Previous editions" onClick={() => scrollCarousel(-1)}>
                ‹
              </button>

              <div ref={editionsTrackRef} className="carousel-track" role="region" aria-label="Previous editions carousel">
                {PREVIOUS_EDITIONS.map(item => (
                  <article key={item.year} className="carousel-card">
                    <div className="carousel-media">
                      <img
                        className="carousel-img"
                        src={item.image}
                        alt={item.year}
                        loading="lazy"
                        onError={e => {
                          const img = e.currentTarget
                          if (img.dataset.fallbackApplied) return
                          img.dataset.fallbackApplied = '1'
                          img.src = editionsFallbackImage
                        }}
                      />
                    </div>

                    <div className="carousel-body">
                      <div className="carousel-card-top">
                        <div className="carousel-kicker">{item.label}</div>
                        <div className="carousel-title">{item.year}</div>
                      </div>
                      <div className="accent-line" />
                      <p className="carousel-desc">{item.highlight}</p>
                    </div>
                    <div className="carousel-tags" aria-label={`${item.year} highlights`}>
                      {item.tags.map(t => (
                        <span key={t} className="pill">{t}</span>
                      ))}
                    </div>
                  </article>
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
            <h2 className="section-title">About Tech Savishkar 4.0</h2>
            <p className="section-lead">
              Tech Savishkar 4.0 is a national-level hackathon that brings together engineering students from across India
              to showcase their innovative ideas and technical skills. Participants are encouraged to build impactful
              solutions through interdisciplinary collaboration, rapid prototyping, and creative problem solving.
            </p>
            <div className="cards">
              <TiltCard className="card card-hover">
                <div className="card-icon"><Target size={24} /></div>
                <h3>Real-world problem solving</h3>
                <div className="accent-line" />
                <p>Work on pressing challenges with practical outcomes and measurable impact.</p>
              </TiltCard>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Lightbulb size={24} /></div>
                <h3>Innovation and creativity</h3>
                <div className="accent-line" />
                <p>Push boundaries with fresh ideas, bold thinking, and future-ready technology.</p>
              </TiltCard>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Handshake size={24} /></div>
                <h3>Teamwork and collaboration</h3>
                <div className="accent-line" />
                <p>Build with diverse teammates, mentors, and experts across domains.</p>
              </TiltCard>
              <TiltCard className="card card-hover">
                <div className="card-icon"><Zap size={24} /></div>
                <h3>Rapid prototyping</h3>
                <div className="accent-line" />
                <p>Ideate, design, and demonstrate working prototypes within high-energy timelines.</p>
              </TiltCard>
            </div>
          </div>
        </motion.section>

        <motion.section id="rounds" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Hackathon Rounds</h2>
            <p className="section-lead">Three elimination rounds to find the best innovators</p>
            <div className="rounds-timeline">
              {[
                {
                  number: '01',
                  title: 'Online Test',
                  subtitle: 'Technical Evaluation',
                  tag: 'Online',
                  date: '25 January 2026',
                  duration: '3 Hours',
                  icon: <FileText size={24} />,
                  color: '#22d3ee',
                  description: 'Online aptitude and technical evaluation to test your core skills.'
                },
                {
                  number: '02',
                  title: 'PPT Submission',
                  subtitle: 'Idea Pitch',
                  tag: 'Submission',
                  date: '7 February 2026',
                  duration: 'Deadline',
                  icon: <FolderOpen size={24} />,
                  color: '#a78bfa',
                  description: 'Evaluation based on innovation, feasibility, and clarity of idea.'
                },
                {
                  number: '03',
                  title: 'Final Hackathon',
                  subtitle: 'Prototype & Presentation',
                  tag: 'Final • Offline',
                  date: '21 February 2026',
                  duration: 'Full Day',
                  icon: <Trophy size={24} />,
                  color: '#f59e0b',
                  description: 'Prototype development and final presentations to the jury.'
                }
              ].map((round) => (
                <TiltCard key={round.number} className="round-card">
                  <div className="round-number" style={{ '--round-color': round.color } as React.CSSProperties}>
                    {round.number}
                  </div>
                  <div className="round-content">
                    <div className="round-icon">{round.icon}</div>
                    <div className="round-info">
                      <h3>{round.title}</h3>
                      <p className="round-subtitle">{round.subtitle}</p>
                      <div className="round-meta">
                        <span className="round-tag" style={{ '--tag-color': round.color } as React.CSSProperties}>{round.tag}</span>
                        <div className="round-details">
                          <span className="round-date">📅 {round.date}</span>
                          <span className="round-duration">⏱ {round.duration}</span>
                        </div>
                      </div>
                      <p className="round-desc">{round.description}</p>
                    </div>
                  </div>
                  <div className="round-connector" />
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="domains" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Hackathon Domains</h2>
            <div className="cards">
              {[
                { variant: 'agritech', title: 'Agritech', desc: 'Innovative solutions for modern agriculture and sustainable farming practices.', icon: <Sprout size={24} />, image: '/domains/agritech.gif' },
                { variant: 'environment', title: 'Environment & Sustainability', desc: 'Green technologies for a sustainable and eco-friendly future.', icon: <Globe size={24} />, image: '/domains/environment.gif' },
                { variant: 'geospatial', title: 'Remote Sensing & Geospatial', desc: 'Use spatial data and satellite tech to unlock actionable insights.', icon: <Satellite size={24} />, image: '/domains/geospatial.gif' },
                { variant: 'health', title: 'HealthTech', desc: 'Technology-driven innovations for improved healthcare and wellbeing.', icon: <Stethoscope size={24} />, image: '/domains/health.gif' },
                { variant: 'innovation', title: 'Student Innovation', desc: 'Creative solutions for everyday challenges and social impact.', icon: <Lightbulb size={24} />, image: '/domains/innovation.gif' },
              ].map(domain => (
                <TiltCard key={domain.title} className={`card card-hover card-${domain.variant}`}>
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
                      <h3>{domain.title}</h3>
                      <div className="accent-line" />
                      <p>{domain.desc}</p>
                    </>
                  )}
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="timeline" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Event Timeline</h2>
            <p className="section-lead">Key milestones and deadlines for Tech Savishkar 4.0</p>
            
            <div className="timeline">
              {[
                { step: '1️⃣', title: 'Registration Opens', date: '15 December 2025', desc: 'Start your journey by registering your team for Tech Savishkar 4.0.' },
                { step: '2️⃣', title: 'Registration Closes', date: '20 January 2026', desc: 'Final deadline to submit your team details and domain preferences.' },
                { step: '3️⃣', title: 'Online Test', date: '25 January 2026', desc: 'Participate in the online technical and aptitude evaluation.' },
                { step: '4️⃣', title: 'Online Test Results', date: '29 January 2026', desc: 'Check if your team qualifies for the next round.' },
                { step: '5️⃣', title: 'PPT Submission Closes', date: '7 February 2026', desc: 'Submit your detailed project proposals and presentations.' },
                { step: '6️⃣', title: 'Final Shortlists Announced', date: '12 February 2026', desc: 'Teams selected for the final hackathon round are revealed.' },
                { step: '7️⃣', title: 'Final Hackathon', date: '21 February 2026', desc: 'Join us for the exciting offline finale and showcase your solutions.' },
              ].map((item, index) => (
                <div key={item.step} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="timeline-marker">{item.step}</div>
                  <div className="timeline-content">
                    <div className="timeline-date">{item.date}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <div className="accent-line" />
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="prizes" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Rewards & Recognition</h2>
            <div className="prize-grid">
              {[
                { title: '🏆 ₹81,250 Total Cash Prizes', desc: 'Prizes distributed across all domains and special categories.' },
                { title: '🎯 5 Domains', desc: 'Celebrate excellence across Agritech, Sustainability, HealthTech, Geospatial, and Innovation.' },
                { title: '📜 Certificates', desc: 'Awarded to all participating teams as proof of excellence and passion.' },
                { title: 'Industry & Academic Recognition', desc: 'Network with leaders and build your reputation amongst experts.' },
              ].map(p => (
                <TiltCard key={p.title} className="card prize card-hover">
                  <div className="prize-badge" />
                  <h3>{p.title}</h3>
                  <div className="accent-line" />
                  <p>{p.desc}</p>
                </TiltCard>
              ))}
            </div>
            <p className="section-lead">Plus academic and industry recognition for standout teams.</p>
          </div>
        </motion.section>

        <motion.section id="rules" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Participation Rules</h2>
            <div className="cards">
              <TiltCard className="card card-hover">
                <h3>👥 Team Size</h3>
                <div className="accent-line" />
                <p>Teams can include 1–5 members. Build a multidisciplinary crew for maximum impact.</p>
              </TiltCard>
              <TiltCard className="card card-hover">
                <h3>💸 Registration</h3>
                <div className="accent-line" />
                <p>Rounds 1 and 2 are free. A participation fee applies only for teams shortlisted to the final round.</p>
              </TiltCard>
              <TiltCard className="card card-hover">
                <h3>📅 Important Dates</h3>
                <div className="accent-line" />
                <p>Refer to the rounds and event timeline above to plan your submissions and participation.</p>
              </TiltCard>
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section" {...sectionMotion}>
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="contact">
              <div className="card">
                <h3>Let’s connect</h3>
                <p>
                  Share your email and team idea. We’ll reply with registration and event updates.
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
                    <textarea placeholder="Tell us about your idea…" rows={4} />
                  </label>
                  <button className="btn btn-primary" type="submit">Send</button>
                </form>
              </div>
              <TiltCard className="card card-hover">
                <h3>Organized by</h3>
                <p>
                  Department of Information Technology, Vasavi College of Engineering (A).
                </p>
                <div className="contact-meta">
                  <div className="meta-row">
                    <span className="meta-dot" />
                    <span>techsaavishkaar@vasavi.ac.in</span>
                  </div>
                  <div className="meta-row">
                    <span className="meta-dot" />
                    <span>📞 +91 XXXXX XXXXX</span>
                  </div>
                </div>
                <a className="btn btn-ghost" href="#home">Back to top</a>
              </TiltCard>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <div className="container footer-inner">
            <div className="footer-left">© {new Date().getFullYear()} TechSaavishkaar</div>
            <div className="footer-right">Built for the hackathon stage</div>
          </div>
        </footer>
      </main>
    </div>
  )
}
