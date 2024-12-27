import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment, Effects } from '@react-three/drei'
import { Suspense } from 'react'
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import LoadingSpinner from './LoadingSpinner'

interface Scene3DProps {
  children: React.ReactNode;
  enableEffects?: boolean;
}

const Scene3D = ({ children, enableEffects = true }: Scene3DProps) => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'rgb(2,0,36)' }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Environment and Background */}
          <Environment preset="night" />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Main Lighting */}
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4c72e0" />
          <pointLight position={[0, 10, 0]} intensity={0.8} color="#e04c4c" />

          {/* Post Processing Effects */}
          {enableEffects && (
            <EffectComposer>
              <Bloom
                intensity={1.5}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                height={300}
              />
              <ChromaticAberration
                offset={[0.002, 0.002]}
                blendFunction={BlendFunction.NORMAL}
              />
              <Noise
                opacity={0.02}
                blendFunction={BlendFunction.OVERLAY}
              />
            </EffectComposer>
          )}

          {/* Camera Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={2}
            maxDistance={20}
            autoRotate
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping={true}
          />

          {/* Scene Content */}
          {children}
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LoadingSpinner />
      </div>
    </div>
  )
}

export default Scene3D
