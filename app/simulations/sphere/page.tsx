'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home, RotateCw, ZoomIn, ZoomOut, Move3d } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

export default function SphereLesson() {
  const [radius, setRadius] = useState(3)
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Calculations
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3)
  const surfaceArea = 4 * Math.PI * Math.pow(radius, 2)

  // Static example values
  const exampleRadius = 4
  const exampleVolume = (4 / 3) * Math.PI * Math.pow(exampleRadius, 3)
  const exampleSurfaceArea = 4 * Math.PI * Math.pow(exampleRadius, 2)

  const reset = () => {
    setRadius(3)
    setZoom(1)
  }

  // Three.js Sphere Component
  interface Sphere3DProps {
    radius: number;
    color?: string;
    showLabels?: boolean;
    isExample?: boolean;
    opacity?: number;
  }

  const Sphere3D = ({ radius: r, color = '#3b82f6', showLabels = false, isExample = false, opacity = 0.3 }: Sphere3DProps) => {
    const meshRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
      if (autoRotate && meshRef.current && !isExample) {
        meshRef.current.rotation.y += 0.005
      }
    })

    return (
      <group ref={meshRef}>
        {/* Main Sphere */}
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[r, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={opacity}
            transmission={0.3}
            roughness={0.1}
            metalness={0.1}
            clearcoat={0.5}
            clearcoatRoughness={0}
            thickness={1}
            specularColor="#ffffff"
            specularIntensity={0.5}
            envMapIntensity={1}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.SphereGeometry(r, 32, 32)]} />
            <lineBasicMaterial color="#ffffff" linewidth={1} />
          </lineSegments>
        </mesh>

        {/* Radius line */}
        {showLabels && (
          <>
            {/* Radius line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    0, 0, 0,
                    r, 0, 0
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ef4444" linewidth={3} />
            </line>

            {/* Radius label */}
            <Text
              position={[r / 2, 0.3, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              Radius = {r.toFixed(1)}
            </Text>

            {/* Center point */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </>
        )}

        {/* Grid circles */}
        {showLabels && (
          <>
            {/* XY plane circle */}
            <mesh rotation={[0, 0, 0]}>
              <ringGeometry args={[r * 0.9, r, 64]} />
              <meshBasicMaterial color="#ffffff" opacity={0.2} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* XZ plane circle */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[r * 0.9, r, 64]} />
              <meshBasicMaterial color="#ffffff" opacity={0.2} transparent side={THREE.DoubleSide} />
            </mesh>

            {/* YZ plane circle */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <ringGeometry args={[r * 0.9, r, 64]} />
              <meshBasicMaterial color="#ffffff" opacity={0.2} transparent side={THREE.DoubleSide} />
            </mesh>
          </>
        )}
      </group>
    )
  }

  // Scene for Example Sphere
  const ExampleScene = () => {
    const { camera } = useThree()

    useEffect(() => {
      camera.position.set(8, 5, 8)
    }, [camera])

    return (
      <>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#3b82f6" />
        <Sphere3D
          radius={exampleRadius}
          color="#3b82f6"
          showLabels={true}
          isExample={true}
          opacity={0.4}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          maxDistance={20}
          minDistance={5}
        />
        <gridHelper args={[20, 20]} position={[0, -exampleRadius, 0]} />
      </>
    )
  }

  // Scene for Interactive Sphere
  const InteractiveScene = () => {
    const { camera } = useThree()

    useEffect(() => {
      camera.position.set(8 * zoom, 6 * zoom, 8 * zoom)
    }, [camera, zoom])

    return (
      <>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[5, 10, -5]} intensity={0.8} color="#22c55e" />
        <pointLight position={[-10, 5, 5]} intensity={0.6} color="#8b5cf6" />
        <Sphere3D
          radius={radius}
          color="#3b82f6"
          showLabels={true}
          opacity={0.35}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={autoRotate}
          autoRotateSpeed={1}
          maxDistance={20}
          minDistance={4}
        />
        <gridHelper args={[20, 20]} position={[0, -radius, 0]} />

        {/* Axes Helper */}
        <axesHelper args={[5]} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/simulations" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">3D Sphere - Volume & Surface Area</h1>
            <p className="text-sm text-slate-500">Interactive 3D visualization with Three.js</p>
          </div>
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Home className="w-6 h-6 text-slate-700" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Concept Explanation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Concept Explanation</h2>
          <p className="text-slate-700 leading-relaxed mb-2">
            <span className="font-bold text-blue-600">Sphere</span> is a perfectly round 3D geometric shape where every point on its surface is equidistant from its center. It has only one dimension: the radius.
          </p>
          <p className="text-slate-700 leading-relaxed mb-2">
            <span className="font-bold text-green-600">Volume of a Sphere</span> is calculated as ⁴⁄₃ × π × r³, where r is the radius.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-purple-600">Surface Area of a Sphere</span> is calculated as 4 × π × r², where r is the radius.
          </p>
        </section>

        {/* Example Calculation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example Calculation</h2>
          <div className="bg-white rounded-lg border border-slate-300 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                {/* 3D Visualization */}
                <div className="w-full lg:w-1/2">
                  <div className="h-64 w-full rounded-lg overflow-hidden bg-slate-900">
                    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }}>
                      <ExampleScene />
                    </Canvas>
                  </div>
                  <div className="mt-4 text-center text-sm text-blue-600 font-medium">
                    Radius: {exampleRadius} units
                  </div>
                </div>

                {/* Calculation */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-blue-600 mb-2">Given Value:</h3>
                      <div className="flex justify-center">
                        <div className="text-center p-3 bg-blue-100 rounded">
                          <div className="text-lg font-bold text-blue-700">{exampleRadius}</div>
                          <div className="text-xs text-blue-600">Radius (r)</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded">
                        <h4 className="font-bold text-purple-600 mb-2">Surface Area:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          4 × π × r² = 4 × π × ({exampleRadius})²<br />
                          = 4 × π × {exampleRadius * exampleRadius}<br />
                          = <strong>{exampleSurfaceArea.toFixed(2)} sq units</strong>
                        </code>
                      </div>

                      <div className="p-4 bg-blue-50 rounded">
                        <h4 className="font-bold text-blue-600 mb-2">Volume:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          ⁴⁄₃ × π × r³ = ⁴⁄₃ × π × ({exampleRadius})³<br />
                          = ⁴⁄₃ × π × {Math.pow(exampleRadius, 3)}<br />
                          = <strong>{exampleVolume.toFixed(2)} cubic units</strong>
                        </code>
                      </div>

                      <div className="p-4 bg-green-50 rounded">
                        <h4 className="font-bold text-green-600 mb-2">Constants:</h4>
                        <div className="text-sm text-slate-700">
                          π (Pi) ≈ 3.14159<br />
                          Radius = Distance from center to surface
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Interactive 3D Simulation</h2>

          {/* Controls */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Radius Control */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    <span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded"></span>
                    Radius: <span className="font-bold text-red-600">{radius} units</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                </div>
              </div>

              {/* Controls */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setAutoRotate(!autoRotate)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Move3d className="w-4 h-4 mr-2" />
                    {autoRotate ? 'Pause' : 'Rotate'}
                  </Button>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium text-slate-700 flex-1 text-center">
                    Zoom: {zoom.toFixed(1)}×
                  </span>
                  <Button
                    onClick={() => setZoom(prev => Math.min(2, prev + 0.2))}
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Area */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mb-8">
            {/* 3D Canvas - Larger width */}
            <div className="flex flex-col gap-6 justify-between py-10 items-center min-w-0 bg-slate-900 rounded-lg border-2 border-slate-300 overflow-hidden">
              <div className="h-full w-full">
                <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }} className='w-20'>
                  <InteractiveScene />
                </Canvas>
              </div>
              <div className="p-4 bg-slate-800">
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Radius = {radius} units</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Center Point</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">π ≈ 3.14159</span>
                  </div>
                </div>
                <p className="text-center text-slate-300 text-xs">
                  Drag to rotate • Scroll to zoom • Right-click to pan
                </p>
              </div>
            </div>

            {/* Results Panel - Smaller width */}
            <div className="flex-1 min-w-[300px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 p-4">
              <h3 className="text-lg font-bold text-blue-800 mb-3 text-center">Live Results</h3>

              <div className="space-y-4">
                {/* Volume */}
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xl font-bold text-blue-600 mb-1">{volume.toFixed(2)}</div>
                  <div className="text-xs font-medium text-blue-700 mb-1">Volume (cubic units)</div>
                  <div className="text-xs text-slate-600">
                    ⁴⁄₃ × π × {radius}³ = {volume.toFixed(2)}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    (⁴⁄₃ ≈ 1.3333)
                  </div>
                </div>

                {/* Surface Area */}
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xl font-bold text-purple-600 mb-1">{surfaceArea.toFixed(2)}</div>
                  <div className="text-xs font-medium text-purple-700 mb-1">Surface Area (sq units)</div>
                  <div className="text-xs text-slate-600">
                    4 × π × {radius}² = {surfaceArea.toFixed(2)}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    (π ≈ 3.14159)
                  </div>
                </div>

                {/* Dimensions Summary */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-center text-sm">Current Properties</h4>
                  <div className="space-y-2">
                    <div className="text-center p-1.5 bg-red-50 rounded">
                      <div className="font-bold text-red-600 text-sm">Radius = {radius}</div>
                      <div className="text-xs text-red-500">Center to surface distance</div>
                    </div>
                    <div className="text-center p-1.5 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600 text-sm">Diameter = {radius * 2}</div>
                      <div className="text-xs text-blue-500">Through the center</div>
                    </div>
                    <div className="text-center p-1.5 bg-green-50 rounded">
                      <div className="font-bold text-green-600 text-sm">Circumference = {(2 * Math.PI * radius).toFixed(2)}</div>
                      <div className="text-xs text-green-500">Great circle perimeter</div>
                    </div>
                  </div>
                </div>

                {/* Sphere properties */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-700 mb-1">Sphere Properties</div>
                    <div className="flex justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-300 rounded-full border border-blue-400"></div>
                      <div className="text-xs text-slate-600">
                        Perfectly symmetrical in all directions
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>• No edges or vertices</div>
                      <div>• All surface points equidistant from center</div>
                      <div>• Smallest surface area for given volume</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            onClick={reset}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 text-lg rounded-lg transition-colors"
          >
            Reset Simulation
          </Button>
        </section>

        {/* Educational Explanation */}
        <section className="space-y-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Volume of a Sphere?</h3>
            <p className="text-slate-700 leading-relaxed">
              The volume of a sphere measures the three-dimensional space enclosed by the sphere's surface.
              The formula V = ⁴⁄₃πr³ shows that volume increases with the cube of the radius.
              This means doubling the radius increases the volume by 8 times! The constant ⁴⁄₃π ≈ 4.18879
              relates the cube of the radius to the actual volume.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Surface Area of a Sphere?</h3>
            <p className="text-slate-700 leading-relaxed">
              The surface area of a sphere measures the total area of its curved surface.
              The formula A = 4πr² shows that surface area increases with the square of the radius.
              Unlike a cube, a sphere has the smallest possible surface area for a given volume,
              which is why bubbles and water droplets form spherical shapes.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              A basketball with radius 12cm has about 7,238cm² of surface area and can hold 7,238cm³ of air.
              A planet Earth (approximated as sphere) with radius 6,371km has 510 million km² of surface area
              and 1 trillion cubic km of volume. Soap bubbles naturally form spheres because this shape
              minimizes surface area for a given volume, using the least amount of soap film.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-200 text-center pb-8">
          <p className="text-sm text-slate-600">
          </p>
        </div>
      </div>
    </div>
  )
}