import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions } = useMemo(() => {
    const count = 1200
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 18 * Math.sqrt(Math.random())
      const a = Math.random() * Math.PI * 2
      arr[i3 + 0] = Math.cos(a) * r
      arr[i3 + 1] = (Math.random() - 0.5) * 6
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
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={new THREE.Color('#9ee7ff')}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene() {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const mouse = useRef({ x: 0, y: 0 })

  const gridGeo = useMemo(() => new THREE.PlaneGeometry(60, 60, 70, 70), [])
  const gridMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color('#22d3ee'),
        transparent: true,
        opacity: 0.12,
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
        opacity: 0.08,
        wireframe: true,
      }),
    [],
  )

  useFrame(({ camera, clock }) => {
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight)
    const t = clamp(window.scrollY / maxScroll, 0, 1)
    const time = clock.getElapsedTime()

    if (group.current) {
      group.current.rotation.y = time * 0.06 + t * Math.PI * 0.25
      group.current.position.y = THREE.MathUtils.lerp(0.25, -0.65, t)
    }

    if (core.current) {
      core.current.rotation.y = time * 0.35 + t * Math.PI * 0.5
      core.current.rotation.x = time * 0.18
    }

    const targetZ = THREE.MathUtils.lerp(7.5, 5.2, t)
    const targetY = THREE.MathUtils.lerp(0.8, -0.2, t)
    const targetX = THREE.MathUtils.lerp(-0.25, 0.35, t)

    const parallaxX = mouse.current.x * 0.55
    const parallaxY = mouse.current.y * 0.35

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + parallaxY, 0.06)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX + parallaxX, 0.06)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 2]} intensity={1.2} />
      <pointLight position={[-4, 2, 2]} intensity={0.85} color={'#22d3ee'} />
      <pointLight position={[4, -2, 2]} intensity={0.75} color={'#a78bfa'} />

      <group ref={group}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} geometry={gridGeo} material={gridMat} />
        <mesh rotation={[0, 0, 0]} position={[0, 0, -8]} geometry={gridGeo} material={gridMat2} />

        <mesh ref={core} position={[0, 0.3, 0]}>
          <torusKnotGeometry args={[0.9, 0.28, 140, 18]} />
          <meshStandardMaterial
            color={new THREE.Color('#0b1220')}
            metalness={0.75}
            roughness={0.18}
            emissive={new THREE.Color('#22d3ee')}
            emissiveIntensity={0.55}
            wireframe
          />
        </mesh>

        <Particles />
      </group>

      <Stars radius={70} depth={45} count={650} factor={2.2} saturation={0} fade speed={0.35} />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="three-wrap" aria-hidden>
      <Canvas
        className="three-canvas"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.4, 6.5], fov: 45, near: 0.1, far: 200 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
