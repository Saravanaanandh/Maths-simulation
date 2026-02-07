'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home, RotateCw, ZoomIn, ZoomOut, Move3d } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

export default function ConeLesson() {
  const [radius, setRadius] = useState(3)
  const [height, setHeight] = useState(5)
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Calculations
  const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height
  const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2))
  const surfaceArea = Math.PI * radius * (radius + slantHeight)

  // Static example values
  const exampleRadius = 3
  const exampleHeight = 4
  const exampleSlantHeight = Math.sqrt(Math.pow(exampleRadius, 2) + Math.pow(exampleHeight, 2))
  const exampleVolume = (1 / 3) * Math.PI * Math.pow(exampleRadius, 2) * exampleHeight
  const exampleSurfaceArea = Math.PI * exampleRadius * (exampleRadius + exampleSlantHeight)

  const reset = () => {
    setRadius(3)
    setHeight(5)
    setZoom(1)
  }

  // Three.js Cone Component
  interface Cone3DProps {
    radius: number;
    height: number;
    color?: string;
    showLabels?: boolean;
    isExample?: boolean;
    opacity?: number;
  }

  const Cone3D = ({ radius: r, height: h, color = '#3b82f6', showLabels = false, isExample = false, opacity = 0.3 }: Cone3DProps) => {
    const meshRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
      if (autoRotate && meshRef.current && !isExample) {
        meshRef.current.rotation.y += 0.005
      }
    })

    const slant = Math.sqrt(r * r + h * h)

    return (
      <group ref={meshRef}>
        {/* Main Cone */}
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <coneGeometry args={[r, h, 32]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={opacity}
            transmission={0.2}
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
            <edgesGeometry args={[new THREE.ConeGeometry(r, h, 32)]} />
            <lineBasicMaterial color="#ffffff" linewidth={2} />
          </lineSegments>
        </mesh>

        {/* Labels */}
        {showLabels && (
          <>
            {/* Radius line and label */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    -r, -h / 2, 0,
                    0, -h / 2, 0
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ef4444" linewidth={3} />
            </line>

            <Text
              position={[-r / 2, -h / 2 - 0.3, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              Radius = {r.toFixed(1)}
            </Text>

            {/* Height line and label */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    0, -h / 2, 0,
                    0, h / 2, 0
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#22c55e" linewidth={3} />
            </line>

            <Text
              position={[r + 0.5, 0, 0]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              Height = {h.toFixed(1)}
            </Text>

            {/* Slant height line (optional) */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    0, h / 2, 0,
                    r, -h / 2, 0
                  ]), 3]}
                />
              </bufferGeometry>
              <lineDashedMaterial color="#8b5cf6" linewidth={2} dashSize={0.2} gapSize={0.1} />
            </line>

            {/* Base circle outline */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array(
                    Array.from({ length: 65 }, (_, i) => {
                      const angle = (i / 64) * Math.PI * 2
                      return [Math.cos(angle) * r, -h / 2, Math.sin(angle) * r]
                    }).flat()
                  ), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffffff" linewidth={1.5} />
            </line>

            {/* Apex point */}
            <mesh position={[0, h / 2, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          </>
        )}
      </group>
    )
  }

  // Scene for Example Cone
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
        <Cone3D
          radius={exampleRadius}
          height={exampleHeight}
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
        <gridHelper args={[20, 20]} position={[0, -exampleHeight / 2, 0]} />
      </>
    )
  }

  // Scene for Interactive Cone
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
        <Cone3D
          radius={radius}
          height={height}
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
        <gridHelper args={[20, 20]} position={[0, -height / 2, 0]} />

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
            <h1 className="text-2xl font-bold text-slate-900">3D Cone - Volume & Surface Area</h1>
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
            <span className="font-bold text-blue-600">Cone</span> is a 3D shape with a circular base that tapers smoothly to a point called the apex. It has two main dimensions: radius of the base and vertical height.
          </p>
          <p className="text-slate-700 leading-relaxed mb-2">
            <span className="font-bold text-green-600">Volume of a Cone</span> is calculated as ⅓ × π × radius² × height.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-purple-600">Surface Area of a Cone</span> includes the base area (πr²) plus the lateral surface area (πr × slant height).
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
                    Radius: {exampleRadius} units • Height: {exampleHeight} units
                  </div>
                </div>

                {/* Calculation */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-blue-600 mb-2">Given Values:</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-100 rounded">
                          <div className="text-lg font-bold text-blue-700">{exampleRadius}</div>
                          <div className="text-xs text-blue-600">Radius</div>
                        </div>
                        <div className="text-center p-3 bg-green-100 rounded">
                          <div className="text-lg font-bold text-green-700">{exampleHeight}</div>
                          <div className="text-xs text-green-600">Height</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded">
                        <h4 className="font-bold text-purple-600 mb-2">Surface Area:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          πr(r + √(r² + h²)) = π×{exampleRadius}({exampleRadius} + √({exampleRadius}² + {exampleHeight}²))<br />
                          = π×{exampleRadius}({exampleRadius} + {exampleSlantHeight.toFixed(2)})<br />
                          = <strong>{exampleSurfaceArea.toFixed(2)} sq units</strong>
                        </code>
                      </div>

                      <div className="p-4 bg-blue-50 rounded">
                        <h4 className="font-bold text-blue-600 mb-2">Volume:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          ⅓ × π × r² × h = ⅓ × π × ({exampleRadius})² × {exampleHeight}<br />
                          = ⅓ × π × {exampleRadius * exampleRadius} × {exampleHeight}<br />
                          = <strong>{exampleVolume.toFixed(2)} cubic units</strong>
                        </code>
                      </div>

                      <div className="p-4 bg-green-50 rounded">
                        <h4 className="font-bold text-green-600 mb-2">Slant Height:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          √(r² + h²) = √({exampleRadius}² + {exampleHeight}²)<br />
                          = √({exampleRadius * exampleRadius} + {exampleHeight * exampleHeight})<br />
                          = <strong>{exampleSlantHeight.toFixed(2)} units</strong>
                        </code>
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
              <div>
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

              {/* Height Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    <span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded"></span>
                    Height: <span className="font-bold text-green-600">{height} units</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>2</span>
                  <span>5</span>
                  <span>8</span>
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
            <div className="flex flex-col min-w-0 sm:w-[60%] bg-slate-900 justify-between py-10 rounded-lg border-2 border-slate-300 overflow-hidden">
              <div className="h-full w-full">
                <Canvas shadows camera={{ position: [10, 8, 10], fov: 50 }}>
                  <InteractiveScene />
                </Canvas>
              </div>
              <div className="p-4 bg-slate-800">
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Radius = {radius}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Height = {height}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Slant = {slantHeight.toFixed(2)}</span>
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
                    ⅓ × π × {radius}² × {height} = {volume.toFixed(2)}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    (⅓ ≈ 0.3333, π ≈ 3.1416)
                  </div>
                </div>

                {/* Surface Area */}
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xl font-bold text-purple-600 mb-1">{surfaceArea.toFixed(2)}</div>
                  <div className="text-xs font-medium text-purple-700 mb-1">Surface Area (sq units)</div>
                  <div className="text-xs text-slate-600">
                    π×{radius}({radius} + {slantHeight.toFixed(2)}) = {surfaceArea.toFixed(2)}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Base + Lateral surface
                  </div>
                </div>

                {/* Dimensions Summary */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-center text-sm">Current Properties</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-1.5 bg-red-50 rounded">
                      <div className="font-bold text-red-600 text-sm">{radius}</div>
                      <div className="text-xs text-red-500">Radius</div>
                    </div>
                    <div className="text-center p-1.5 bg-green-50 rounded">
                      <div className="font-bold text-green-600 text-sm">{height}</div>
                      <div className="text-xs text-green-500">Height</div>
                    </div>
                    <div className="text-center p-1.5 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600 text-sm">{slantHeight.toFixed(2)}</div>
                      <div className="text-xs text-blue-500">Slant Height</div>
                    </div>
                    <div className="text-center p-1.5 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600 text-sm">{(Math.PI * radius * radius).toFixed(2)}</div>
                      <div className="text-xs text-purple-500">Base Area</div>
                    </div>
                  </div>
                </div>

                {/* Cone properties */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-700 mb-1">Cone Properties</div>
                    <div className="flex justify-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-300 rounded-full border border-blue-400"></div>
                      <div className="text-xs text-slate-600">
                        Circular base tapering to apex
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <div>• 1 circular base</div>
                      <div>• 1 curved lateral surface</div>
                      <div>• 1 apex (vertex)</div>
                      <div>• Slant height = √(r² + h²)</div>
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is a Cone?</h3>
            <p className="text-slate-700 leading-relaxed">
              A cone is a three-dimensional geometric shape that tapers smoothly from a flat circular base
              to a point called the apex or vertex. The distance from the center of the base to the apex
              is the height, and the distance from the apex to any point on the circumference of the base
              is the slant height. Cones have one curved surface and one flat circular base.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Volume Formula Explained</h3>
            <p className="text-slate-700 leading-relaxed">
              The volume of a cone is exactly one-third of the volume of a cylinder with the same base
              and height. That's why the formula is V = ⅓πr²h. If you could fill a cone with water and
              pour it into a cylinder with the same base and height, you would need to do this three
              times to fill the cylinder completely.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              An ice cream cone with radius 3cm and height 12cm has about 113cm³ volume.
              A traffic cone with base radius 20cm and height 50cm has about 20,944cm³ volume
              and 4,500cm² surface area. Party hats are conical with small bases, while
              volcano shapes are inverted cones. Funnels use the cone shape to direct liquids
              efficiently from large openings to small ones.
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