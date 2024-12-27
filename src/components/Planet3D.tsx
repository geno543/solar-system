import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface Planet3DProps {
  textureUrl: string
  normalMapUrl?: string
  roughnessMapUrl?: string
  cloudsMapUrl?: string
  position?: [number, number, number]
  size?: number
  rotationSpeed?: number
  atmosphereColor?: string
  rings?: boolean
  ringsTextureUrl?: string
  tilt?: number
}

const Planet3D = ({
  textureUrl,
  normalMapUrl,
  roughnessMapUrl,
  cloudsMapUrl,
  position = [0, 0, 0],
  size = 1,
  rotationSpeed = 0.005,
  atmosphereColor = '#4c72e0',
  rings = false,
  ringsTextureUrl,
  tilt = 0,
}: Planet3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Mesh>(null)
  const [textureError, setTextureError] = useState(false)

  // Create a basic material for fallback
  const basicMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(atmosphereColor),
      roughness: 0.8,
      metalness: 0.2,
    })
  }, [atmosphereColor])

  // Create atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(atmosphereColor),
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    })
  }, [atmosphereColor])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += rotationSpeed * 1.1 * delta
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += rotationSpeed * 0.5 * delta
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y += rotationSpeed * 0.3 * delta
    }
  })

  return (
    <group position={position} rotation={[tilt * Math.PI / 180, 0, 0]}>
      {/* Planet sphere */}
      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <primitive object={basicMaterial} attach="material" />
      </Sphere>

      {/* Atmosphere */}
      <Sphere ref={atmosphereRef} args={[size * 1.15, 32, 32]}>
        <primitive object={atmosphereMaterial} attach="material" />
      </Sphere>

      {/* Rings */}
      {rings && (
        <mesh ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 32]} />
          <meshStandardMaterial
            color={atmosphereColor}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}

export default Planet3D
