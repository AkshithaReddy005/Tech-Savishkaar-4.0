import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

// Removed unused FloatingShapes component

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const accRef = useRef(0)

  const { positions } = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 15 * Math.sqrt(Math.random())
      const a = Math.random() * Math.PI * 2
      arr[i3 + 0] = Math.cos(a) * r
      arr[i3 + 1] = (Math.random() - 0.5) * 4
      arr[i3 + 2] = Math.sin(a) * r
    }
    return { positions: arr }
  }, [])

  useFrame(({ clock }, delta) => {
    if (document.hidden) return
    accRef.current += delta
    if (accRef.current < 1 / 30) return
    accRef.current = 0

    const t = clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03
      pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={new THREE.Color('#9ee7ff')}
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const gridGroup = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const accRef = useRef(0)

  const gridGeo = useMemo(() => new THREE.PlaneGeometry(60, 60, 70, 70), [])
  const gridMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#22d3ee'),
        transparent: true,
        opacity: 0.06,
        wireframe: true,
      }),
    [],
  )

  useEffect(() => {
    if (isMobile || reducedMotion) return
    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1
      const my = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1
      mouse.current.x = mx
      mouse.current.y = my
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile, reducedMotion])
  const gridMat2 = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#a78bfa'),
        transparent: true,
        opacity: 0.04,
        wireframe: true,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (document.hidden) return
    if (!gridGroup.current) return
    if (delta > 0.1) return // Skip frames if lagging

    accRef.current += delta
    if (accRef.current < 1 / 30) return
    accRef.current = 0

    const time = state.clock.getElapsedTime()
    const targetZ = 6.5 + Math.sin(time * 0.15) * 0.8
    const targetY = 0.4 + Math.cos(time * 0.12) * 0.3
    const targetX = Math.sin(time * 0.08) * 1.2

    const parallaxX = mouse.current.x * 0.25
    const parallaxY = mouse.current.y * 0.25

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + parallaxY, 0.04)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + parallaxX, 0.04)
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={isMobile ? 0.3 : 0.5} />
      <directionalLight position={[3, 3, 2]} intensity={isMobile ? 0.5 : 0.8} />
      <pointLight position={[-4, 2, 2]} intensity={isMobile ? 0.3 : 0.6} color={'#22d3ee'} />
      <pointLight position={[4, -2, 2]} intensity={isMobile ? 0.25 : 0.5} color={'#a78bfa'} />

      {/* Grid removed as requested */}
      {false && (
        <group ref={gridGroup}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} geometry={gridGeo} material={gridMat} />
          <mesh rotation={[0, 0, 0]} position={[0, 0, -8]} geometry={gridGeo} material={gridMat2} />
        </group>
      )}

      {/* Remove floating shapes per user request */}

      {/* Increase particle density for a richer field */}
      <Particles count={isMobile ? 600 : 1000} />

      <Stars radius={isMobile ? 28 : 48} depth={isMobile ? 18 : 28} count={isMobile ? 120 : 250} factor={isMobile ? 1.4 : 1.7} saturation={0} fade speed={isMobile ? 0.12 : 0.18} />
    </>
  )
}

export default function ThreeBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    setIsMobileDevice(isMobile)
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false)

    const onVis = () => {
      setIsRunning(!document.hidden)
    }
    document.addEventListener('visibilitychange', onVis)
    onVis()
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div className="three-wrap" aria-hidden>
      <Canvas
        className="three-canvas"
        frameloop={isRunning ? 'always' : 'never'}
        dpr={isMobileDevice ? 1 : 1.25}
        gl={{ 
          antialias: !isMobileDevice, 
          alpha: true, 
          powerPreference: 'high-performance',
          precision: isMobileDevice ? 'lowp' : 'mediump',
          stencil: false,
          depth: false
        }}
        camera={{ position: [0, 0.4, isMobileDevice ? 8 : 6.5], fov: 45, near: 0.1, far: 200 }}
        onCreated={() => {
          setIsLoaded(true)
          // Reduce render quality for better performance
          const canvas = document.querySelector('.three-canvas') as HTMLCanvasElement
          if (canvas) {
            canvas.style.willChange = 'transform'
          }
        }}
      >
        {isLoaded && <Scene isMobile={isMobileDevice} reducedMotion={reducedMotion} />}
      </Canvas>
    </div>
  )
}
