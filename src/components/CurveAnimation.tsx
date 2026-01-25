import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function CurveAnimation() {
  const pathRef = useRef<SVGPathElement | null>(null)
  const moverRef = useRef<SVGGElement | null>(null)

  useEffect(() => {
    const path = pathRef.current
    const mover = moverRef.current
    if (!path || !mover) return

    const length = path.getTotalLength()
    let raf = 0
    let progress = 0

    const animate = () => {
      const point = path.getPointAtLength(progress * length)
      
      // Apply the exact point position for proper alignment
      mover.setAttribute('transform', `translate(${point.x - 35}, ${point.y - 35})`)

      progress += 0.0018 // speed
      if (progress > 1) progress = 0
      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <svg
      viewBox="-25 -25 1240 1090"
      className="absolute -left-5 xl:-left-8 h-auto w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    >
      {/* Dashed background curve */}
      <path
        ref={pathRef}
        d="M20 4C20 4 0 100 80 180C160 260 200 240 300 300C400 360 400 400 450 450C500 500 500 400 550 420C600 440 650 480 700 500C750 520 800 530 850 570C900 610 950 650 1000 700C1050 750 1100 800 1150 800"
        stroke="#ADADAD"
        strokeWidth="7.9875"
        strokeLinecap="round"
        strokeDasharray="15.98 15.98"
        fill="none"
      />

      {/* Gradient overlay curve */}
      <motion.path
        d="M20 4C20 4 0 100 80 180C160 260 200 240 300 300C400 360 400 400 450 450C500 500 500 400 550 420C600 440 650 480 700 500C750 520 800 530 850 570C900 610 950 650 1000 700C1050 750 1100 800 1150 800"
        stroke="url(#paint0)"
        strokeWidth="7.9875"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Moving Logo - Center aligned properly */}
      <g ref={moverRef}>
        <circle cx="35" cy="35" r="34" fill="transparent" stroke="#ADADAD" strokeWidth="2" />
        <foreignObject x="0" y="0" width="70" height="70">
          <img
            src="/domains/logo.jpeg"
            width={70}
            height={70}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            alt="Moving logo"
          />
        </foreignObject>
      </g>

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="paint0" x1="1097.57" y1="212.909" x2="665.402" y2="707.481" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ADADAD" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </svg>
  )
}