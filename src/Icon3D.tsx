import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'

function Model({ rotation, variant }: { rotation: { rx: number; ry: number }; variant?: string }) {
  const groupRef = useRef<THREE.Group>(null)

  const content = useMemo(() => {
    switch (variant) {
      case 'agritech': {
        const color = new THREE.Color('#34d399')
        return (
          <group>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 1.4, 12]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0.35, 0.2, 0]} rotation={[0, 0.2, -0.7]}>
              <coneGeometry args={[0.35, 0.8, 20]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[-0.35, 0.0, 0]} rotation={[0, -0.2, 0.7]}>
              <coneGeometry args={[0.3, 0.7, 20]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
          </group>
        )
      }
      case 'environment': {
        const color = new THREE.Color('#22c55e')
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.95, 32, 24]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh rotation={[Math.PI / 2.6, 0, 0]}>
              <torusGeometry args={[1.2, 0.05, 8, 36]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        )
      }
      case 'geospatial': {
        const color = new THREE.Color('#0ea5e9')
        return (
          <group>
            <mesh>
              <icosahedronGeometry args={[0.95, 0]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh rotation={[0, Math.PI / 6, 0]}>
              <torusGeometry args={[1.25, 0.06, 8, 40]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            <mesh rotation={[Math.PI / 3.2, 0, Math.PI / 6]}>
              <torusGeometry args={[1.0, 0.05, 8, 36]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        )
      }
      case 'health': {
        const color = new THREE.Color('#ef4444')
        return (
          <group>
            <mesh>
              <boxGeometry args={[0.35, 1.2, 0.2]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
            <mesh>
              <boxGeometry args={[1.2, 0.35, 0.2]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
          </group>
        )
      }
      case 'innovation':
      default: {
        const color = new THREE.Color('#f59e0b')
        return (
          <group>
            <mesh>
              <dodecahedronGeometry args={[0.9, 0]} />
              <meshStandardMaterial wireframe color={color} emissive={color} emissiveIntensity={0.6} />
            </mesh>
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

export default function Icon3D({ rotation, variant }: { rotation: { rx: number; ry: number }; variant?: string }) {
  return (
    <div className="icon-3d-wrap">
      <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 2.5], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[2, 2, 2]} intensity={0.7} color="#a78bfa" />
        <Model rotation={rotation} variant={variant} />
      </Canvas>
    </div>
  )
}
