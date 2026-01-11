import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

function Model({ rotation, variant }: { rotation: { rx: number; ry: number }; variant?: string }) {
  const groupRef = useRef<THREE.Group>(null)

  const mat = useMemo(
    () =>
      (color: THREE.Color) =>
        new THREE.MeshStandardMaterial({
          color,
          emissive: color.clone().multiplyScalar(0.15),
          metalness: 0.2,
          roughness: 0.55,
        }),
    [],
  )

  const content = useMemo(() => {
    switch (variant) {
      case 'agritech': {
        const color = new THREE.Color('#34d399')
        return (
          <group>
            {/* Tractor body */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.4, 0.6]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Cabin */}
            <mesh position={[0.2, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.3, 0.5]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.3, -0.2, 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            <mesh position={[0.3, -0.2, 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            <mesh position={[-0.3, -0.2, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            <mesh position={[0.3, -0.2, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Plow attachment */}
            <mesh position={[0, -0.1, -0.6]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.05, 0.1]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
          </group>
        )
      }
      case 'environment': {
        const color = new THREE.Color('#22c55e')
        return (
          <group>
            {/* Tower */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.08, 0.08, 1.2, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Nacelle */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.2, 0.2]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Hub */}
            <mesh position={[0.4, 0.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Blades */}
            {Array.from({ length: 3 }, (_, i) => (
              <mesh
                key={i}
                position={[0.4, 0.6, 0]}
                rotation={[0, 0, (i / 3) * Math.PI * 2]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.8, 0.04, 0.08]} />
                <primitive object={mat(color)} attach="material" />
              </mesh>
            ))}
            {/* Base */}
            <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
          </group>
        )
      }
      case 'geospatial': {
        const color = new THREE.Color('#0ea5e9')
        return (
          <group>
            {/* Dish base */}
            <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Dish support */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.8, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Satellite dish */}
            <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 6, 0, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.6, 32, 16]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Feed horn */}
            <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.12, 0.08]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Signal receiver */}
            <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.15, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Ground base plate */}
            <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.05, 12]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
          </group>
        )
      }
      case 'health': {
        const color = new THREE.Color('#ef4444')
        return (
          <group>
            {/* Scanner base */}
            <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.3, 0.8]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Scanner arch */}
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.4, 0.05, 16, 100]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Scanner bed */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.05, 1.2]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Control panel */}
            <mesh position={[0.6, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.3, 0.1]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Display screen */}
            <mesh position={[0.6, 0.1, 0.05]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
          </group>
        )
      }
      case 'innovation':
      default: {
        const color = new THREE.Color('#f59e0b')
        return (
          <group>
            {/* Circuit board base */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.05, 0.8]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* CPU chip */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.05, 0.3]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Memory chips */}
            <mesh position={[-0.3, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.05, 0.2]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            <mesh position={[0.3, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.05, 0.2]} />
              <primitive object={mat(color)} attach="material" />
            </mesh>
            {/* Circuit traces */}
            {Array.from({ length: 6 }, (_, i) => (
              <mesh
                key={i}
                position={[
                  (Math.random() - 0.5) * 0.8,
                  0.05,
                  (Math.random() - 0.5) * 0.6,
                ]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[0.2, 0.02, 0.02]} />
                <primitive object={mat(color)} attach="material" />
              </mesh>
            ))}
            {/* Connection points */}
            {Array.from({ length: 8 }, (_, i) => (
              <mesh
                key={i}
                position={[
                  (Math.random() - 0.5) * 1.0,
                  0.05,
                  (Math.random() - 0.5) * 0.6,
                ]}
                castShadow
                receiveShadow
              >
                <sphereGeometry args={[0.03, 16, 12]} />
                <primitive object={mat(color)} attach="material" />
              </mesh>
            ))}
          </group>
        )
      }
    }
  }, [variant])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotation.ry * 0.1, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotation.rx * 0.1, 0.1)
    }
  })

  return <group ref={groupRef}>{content}</group>
}

function getModelUrl(variant?: string) {
  switch (variant) {
    case 'agritech':
      return '/models/agritech.glb'
    case 'environment':
      return '/models/environment.glb'
    case 'geospatial':
      return '/models/geospatial.glb'
    case 'health':
      return '/models/health.glb'
    case 'innovation':
    default:
      return '/models/innovation.glb'
  }
}

function GLBModel({ rotation, variant }: { rotation: { rx: number; ry: number }; variant?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const url = getModelUrl(variant)
  const gltf = useGLTF(url)

  useEffect(() => {
    const g = groupRef.current
    if (!g) return
    g.traverse(obj => {
      const m = obj as THREE.Mesh
      if (m && (m as any).isMesh) {
        m.castShadow = true
        m.receiveShadow = true
      }
    })
  }, [gltf])

  useFrame(() => {
    const g = groupRef.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, rotation.ry * 0.12, 0.1)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, rotation.rx * 0.12, 0.1)
  })

  return (
    <group ref={groupRef} scale={0.9} position={[0, -0.15, 0]}>
      <primitive object={(gltf as any).scene} />
    </group>
  )
}

export default function Icon3D({ rotation, variant }: { rotation: { rx: number; ry: number }; variant?: string }) {
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    const url = getModelUrl(variant)

    // Check if the model exists. If it doesn't, fall back to procedural model.
    ;(async () => {
      try {
        const res = await fetch(url, { method: 'HEAD' })
        if (!cancelled) setModelAvailable(res.ok)
      } catch {
        if (!cancelled) setModelAvailable(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [variant])

  return (
    <div className="icon-3d-wrap">
      <Canvas gl={{ antialias: true, alpha: true }} shadows camera={{ position: [0, 0, 2.8], fov: 35 }}>
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.0}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-2, 1.5, 2]} intensity={0.55} color="#22d3ee" />
        <pointLight position={[2, 1.5, 2]} intensity={0.45} color="#a78bfa" />
        {modelAvailable ? (
          <Suspense fallback={<Model rotation={rotation} variant={variant} />}>
            <GLBModel rotation={rotation} variant={variant} />
          </Suspense>
        ) : (
          <Model rotation={rotation} variant={variant} />
        )}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
          <planeGeometry args={[6, 6]} />
          <shadowMaterial transparent opacity={0.18} />
        </mesh>
      </Canvas>
    </div>
  )
}
