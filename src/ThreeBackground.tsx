import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useMemo, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

function FloatingShapes({ mouse }: { mouse: { current: { x: number; y: number } } }) {
  const groupRef = useRef<THREE.Group>(null)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b1220'),
        emissive: new THREE.Color('#22d3ee'),
        emissiveIntensity: 0.18,
        metalness: 0.55,
        roughness: 0.25,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      }),
    [],
  )

  const shapes = useMemo(
    () =>
      [
        {
          key: 'a',
          geo: new THREE.IcosahedronGeometry(0.55, 0),
          pos: new THREE.Vector3(-2.3, 1.1, -2.4),
          rot: new THREE.Euler(0.1, 0.2, 0.0),
          speed: new THREE.Vector3(0.10, 0.14, 0.08),
          float: 0.22,
        },
        {
          key: 'b',
          geo: new THREE.OctahedronGeometry(0.45, 0),
          pos: new THREE.Vector3(2.2, 0.2, -1.6),
          rot: new THREE.Euler(0.2, -0.1, 0.1),
          speed: new THREE.Vector3(0.12, 0.10, 0.06),
          float: 0.18,
        },
        {
          key: 'c',
          geo: new THREE.TetrahedronGeometry(0.42, 0),
          pos: new THREE.Vector3(0.6, 1.35, -3.2),
          rot: new THREE.Euler(-0.2, 0.15, -0.05),
          speed: new THREE.Vector3(0.09, 0.16, 0.07),
          float: 0.24,
        },
        {
          key: 'd',
          geo: new THREE.DodecahedronGeometry(0.5, 0),
          pos: new THREE.Vector3(-0.9, -0.4, -1.3),
          rot: new THREE.Euler(0.05, -0.25, 0.15),
          speed: new THREE.Vector3(0.08, 0.11, 0.09),
          float: 0.16,
        },
      ] as const,
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const g = groupRef.current
    if (!g) return

    const targetX = mouse.current.x * 0.55
    const targetY = mouse.current.y * 0.35
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06)
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.06)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouse.current.x * 0.25, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -mouse.current.y * 0.18, 0.06)

    for (let i = 0; i < g.children.length; i++) {
      const child = g.children[i] as THREE.Mesh
      const s = shapes[i]
      if (!s) continue
      child.rotation.x = s.rot.x + t * s.speed.x
      child.rotation.y = s.rot.y + t * s.speed.y
      child.rotation.z = s.rot.z + t * s.speed.z
      child.position.y = s.pos.y + Math.sin(t * 0.9 + i) * s.float
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map(s => (
        <mesh key={s.key} geometry={s.geo} material={material} position={[s.pos.x, s.pos.y, s.pos.z]} />
      ))}
    </group>
  )
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions } = useMemo(() => {
    const count = 800
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

  useFrame(({ clock }) => {
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

function Scene({ isMobile }: { isMobile: boolean }) {
  const gridGroup = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

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
    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1
      const my = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1
      mouse.current.x = mx
      mouse.current.y = my
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
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
    if (!gridGroup.current) return
    if (delta > 0.1) return // Skip frames if lagging

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

      <group ref={gridGroup}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} geometry={gridGeo} material={gridMat} />
        <mesh rotation={[0, 0, 0]} position={[0, 0, -8]} geometry={gridGeo} material={gridMat2} />
      </group>

      {!isMobile && <FloatingShapes mouse={mouse} />}

      {!isMobile && <Particles />}

      <Stars radius={isMobile ? 30 : 50} depth={isMobile ? 20 : 30} count={isMobile ? 200 : 400} factor={isMobile ? 1.5 : 1.8} saturation={0} fade speed={isMobile ? 0.15 : 0.25} />
    </>
  )
}

export default function ThreeBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile)
  }, [])

  return (
    <div className="three-wrap" aria-hidden>
      <Canvas
        className="three-canvas"
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
        {isLoaded && <Scene isMobile={isMobileDevice} />}
      </Canvas>
    </div>
  )
}
