'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home, RotateCw, ZoomIn, ZoomOut, Move3d } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

export default function CuboidLesson() {
  const [length, setLength] = useState(4)
  const [width, setWidth] = useState(3)
  const [height, setHeight] = useState(2)
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Calculations
  const volume = length * width * height
  const surfaceArea = 2 * (length * width + length * height + width * height)

  // Static example values
  const exampleLength = 5
  const exampleWidth = 4
  const exampleHeight = 3
  const exampleVolume = exampleLength * exampleWidth * exampleHeight
  const exampleSurfaceArea = 2 * (exampleLength * exampleWidth + exampleLength * exampleHeight + exampleWidth * exampleHeight)

  const reset = () => {
    setLength(4)
    setWidth(3)
    setHeight(2)
    setZoom(1)
  }

  // Three.js Cuboid Component
  interface Cuboid3DProps {
    dimensions: [number, number, number];
    color?: string;
    showLabels?: boolean;
    isExample?: boolean;
    opacity?: number;
  }

  const Cuboid3D = ({ dimensions, color = '#3b82f6', showLabels = false, isExample = false, opacity = 0.3 }: Cuboid3DProps) => {
    const meshRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false)

    const [l, w, h] = dimensions

    useFrame((state) => {
      if (autoRotate && meshRef.current && !isExample) {
        meshRef.current.rotation.y += 0.005
      }
    })

    return (
      <group ref={meshRef}>
        {/* Main Cuboid */}
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[l, h, w]} />
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
            <edgesGeometry args={[new THREE.BoxGeometry(l, h, w)]} />
            <lineBasicMaterial color="#ffffff" linewidth={2} />
          </lineSegments>
        </mesh>

        {/* Face Labels */}
        {showLabels && (
          <>
            {/* Front face label */}
            <Text
              position={[0, 0, w / 2 + 0.1]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${l} × ${h}`}
            </Text>

            {/* Top face label */}
            <Text
              position={[0, h / 2 + 0.1, 0]}
              fontSize={0.3}
              color="#ffffff"
              rotation={[Math.PI / 2, 0, 0]}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${l} × ${w}`}
            </Text>

            {/* Right face label */}
            <Text
              position={[l / 2 + 0.1, 0, 0]}
              fontSize={0.3}
              color="#ffffff"
              rotation={[0, -Math.PI / 2, 0]}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${w} × ${h}`}
            </Text>
          </>
        )}

        {/* Dimension lines */}
        {showLabels && (
          <>
            {/* Length line (X-axis) */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    -l / 2, -h / 2, -w / 2,
                    l / 2, -h / 2, -w / 2
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ef4444" linewidth={3} />
            </line>

            {/* Height line (Y-axis) */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    -l / 2, -h / 2, -w / 2,
                    -l / 2, h / 2, -w / 2
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#22c55e" linewidth={3} />
            </line>

            {/* Width line (Z-axis) */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    -l / 2, -h / 2, -w / 2,
                    -l / 2, -h / 2, w / 2
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#8b5cf6" linewidth={3} />
            </line>
          </>
        )}
      </group>
    )
  }

  // Scene for Example Cuboid
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
        <Cuboid3D
          dimensions={[exampleLength, exampleWidth, exampleHeight]}
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

  // Scene for Interactive Cuboid
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
        <Cuboid3D
          dimensions={[length, width, height]}
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
            <h1 className="text-2xl font-bold text-slate-900">3D Cuboid - Volume & Surface Area</h1>
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
            <span className="font-bold text-blue-600">Cuboid (Rectangular Prism)</span> is a 3D shape with six rectangular faces. Unlike a cube, a cuboid has three different dimensions: length, width, and height.
          </p>
          <p className="text-slate-700 leading-relaxed mb-2">
            <span className="font-bold text-green-600">Volume of a Cuboid</span> is calculated by multiplying its three dimensions: length × width × height.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-purple-600">Surface Area of a Cuboid</span> is the total area of all six faces: 2 × (length×width + length×height + width×height).
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
                    Dimensions: {exampleLength} × {exampleWidth} × {exampleHeight} units
                  </div>
                </div>

                {/* Calculation */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-blue-600 mb-2">Given Values:</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-blue-100 rounded">
                          <div className="text-lg font-bold text-blue-700">{exampleLength}</div>
                          <div className="text-xs text-blue-600">Length</div>
                        </div>
                        <div className="text-center p-3 bg-green-100 rounded">
                          <div className="text-lg font-bold text-green-700">{exampleWidth}</div>
                          <div className="text-xs text-green-600">Width</div>
                        </div>
                        <div className="text-center p-3 bg-purple-100 rounded">
                          <div className="text-lg font-bold text-purple-700">{exampleHeight}</div>
                          <div className="text-xs text-purple-600">Height</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded">
                        <h4 className="font-bold text-purple-600 mb-2">Surface Area:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          2 × ({exampleLength}×{exampleWidth} + {exampleLength}×{exampleHeight} + {exampleWidth}×{exampleHeight})<br />
                          = <strong>{exampleSurfaceArea} sq units</strong>
                        </code>
                      </div>

                      <div className="p-4 bg-blue-50 rounded">
                        <h4 className="font-bold text-blue-600 mb-2">Volume:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          {exampleLength} × {exampleWidth} × {exampleHeight}<br />
                          = <strong>{exampleVolume} cubic units</strong>
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
              {/* Length Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    <span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded"></span>
                    Length: <span className="font-bold text-red-600">{length}</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1</span>
                  <span>4</span>
                  <span>8</span>
                </div>
              </div>

              {/* Width Control */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    <span className="w-3 h-3 bg-green-500 inline-block mr-2 rounded"></span>
                    Width: <span className="font-bold text-green-600">{width}</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
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
                    <span className="w-3 h-3 bg-blue-500 inline-block mr-2 rounded"></span>
                    Height: <span className="font-bold text-blue-600">{height}</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>5</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3">
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
            <div className="flex-[2] min-w-0 bg-slate-900 rounded-lg border-2 border-slate-300 overflow-hidden">
              <div className="h-80 w-full">
                <Canvas shadows camera={{ position: [10, 8, 10], fov: 50 }}>
                  <InteractiveScene />
                </Canvas>
              </div>
              <div className="p-4 bg-slate-800 mt-20">
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Length (X-axis)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Height (Y-axis)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Width (Z-axis)</span>
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
                  <div className="text-xl font-bold text-blue-600 mb-1">{volume}</div>
                  <div className="text-xs font-medium text-blue-700 mb-1">Volume (cubic units)</div>
                  <div className="text-xs text-slate-600">
                    {length} × {width} × {height} = {volume}
                  </div>
                </div>

                {/* Surface Area */}
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xl font-bold text-purple-600 mb-1">{surfaceArea}</div>
                  <div className="text-xs font-medium text-purple-700 mb-1">Surface Area (sq units)</div>
                  <div className="text-xs text-slate-600">
                    2 × ({length}×{width} + {length}×{height} + {width}×{height})
                  </div>
                </div>

                {/* Dimensions Summary */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-center text-sm">Current Dimensions</h4>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-center p-1.5 bg-red-50 rounded">
                      <div className="font-bold text-red-600 text-sm">{length}</div>
                      <div className="text-xs text-red-500">Length</div>
                    </div>
                    <div className="text-center p-1.5 bg-green-50 rounded">
                      <div className="font-bold text-green-600 text-sm">{width}</div>
                      <div className="text-xs text-green-500">Width</div>
                    </div>
                    <div className="text-center p-1.5 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600 text-sm">{height}</div>
                      <div className="text-xs text-blue-500">Height</div>
                    </div>
                  </div>
                </div>

                {/* Unit cubes visualization */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-700 mb-1">Unit Cubes Inside</div>
                    <div className="flex flex-wrap gap-0.5 justify-center max-w-24 mx-auto mb-1">
                      {Array.from({ length: Math.min(6, volume) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-blue-300 border border-blue-400"
                        />
                      ))}
                      {volume > 6 && (
                        <div className="w-3 h-3 bg-blue-100 border border-blue-200 flex items-center justify-center">
                          <span className="text-[10px] text-blue-600">+{volume - 6}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-600">
                      {volume} unit cubes total
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Volume?</h3>
            <p className="text-slate-700 leading-relaxed">
              Volume measures the three-dimensional space inside a solid object. For cuboids, it's calculated by multiplying the three dimensions: length × width × height. Each unit cube inside counts as 1 cubic unit. The volume tells us how many unit cubes can fit inside the cuboid.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Surface Area?</h3>
            <p className="text-slate-700 leading-relaxed">
              Surface Area measures the total area of all the faces of a 3D object. For cuboids, there are three pairs of identical rectangular faces: front/back, left/right, and top/bottom. The formula is 2 × (length×width + length×height + width×height). Think of it as the amount of wrapping paper needed to cover all six faces.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              A shipping box measuring 40cm × 30cm × 20cm has 5,200cm² of cardboard (surface area) and can hold 24,000cm³ (24 liters) of items (volume). A bookshelf measuring 120cm × 30cm × 25cm has 11,100cm² of paintable surface and 90,000cm³ of storage space.
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