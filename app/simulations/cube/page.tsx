'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home, RotateCw, ZoomIn, ZoomOut, Move3d } from 'lucide-react'
import Link from 'next/link'
import * as THREE from 'three'

export default function CubeLesson() {
  const [side, setSide] = useState(3)
  const [autoRotate, setAutoRotate] = useState(true)
  const [zoom, setZoom] = useState(1)

  // Calculations
  const volume = Math.pow(side, 3)
  const surfaceArea = 6 * Math.pow(side, 2)

  // Static example values
  const exampleSide = 4
  const exampleVolume = Math.pow(exampleSide, 3)
  const exampleSurfaceArea = 6 * Math.pow(exampleSide, 2)

  const reset = () => {
    setSide(3)
    setZoom(1)
  }

  // Three.js Cube Component
  interface Cube3DProps {
    side: number;
    color?: string;
    showLabels?: boolean;
    isExample?: boolean;
    opacity?: number;
  }

  const Cube3D = ({ side: s, color = '#3b82f6', showLabels = false, isExample = false, opacity = 0.3 }: Cube3DProps) => {
    const meshRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
      if (autoRotate && meshRef.current && !isExample) {
        meshRef.current.rotation.y += 0.005
      }
    })

    return (
      <group ref={meshRef}>
        {/* Main Cube */}
        <mesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[s, s, s]} />
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
            <edgesGeometry args={[new THREE.BoxGeometry(s, s, s)]} />
            <lineBasicMaterial color="#ffffff" linewidth={2} />
          </lineSegments>
        </mesh>

        {/* Face Labels */}
        {showLabels && (
          <>
            {/* Front face label */}
            <Text
              position={[0, 0, s / 2 + 0.1]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${s} × ${s}`}
            </Text>

            {/* Side labels */}
            <Text
              position={[s / 2 + 0.1, 0, 0]}
              fontSize={0.3}
              color="#ffffff"
              rotation={[0, -Math.PI / 2, 0]}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${s} × ${s}`}
            </Text>

            <Text
              position={[-s / 2 - 0.1, 0, 0]}
              fontSize={0.3}
              color="#ffffff"
              rotation={[0, Math.PI / 2, 0]}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              {`${s} × ${s}`}
            </Text>
          </>
        )}

        {/* Side length indicator */}
        {showLabels && (
          <>
            {/* Side length line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    -s / 2, -s / 2, s / 2 + 0.2,
                    s / 2, -s / 2, s / 2 + 0.2
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ef4444" linewidth={3} />
            </line>

            {/* Side length label */}
            <Text
              position={[0, -s / 2 - 0.3, s / 2 + 0.2]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.05}
              outlineColor="#000000"
            >
              Side = {s}
            </Text>
          </>
        )}
      </group>
    )
  }

  // Scene for Example Cube
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
        <Cube3D
          side={exampleSide}
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
        <gridHelper args={[20, 20]} position={[0, -exampleSide / 2, 0]} />
      </>
    )
  }

  // Scene for Interactive Cube
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
        <Cube3D
          side={side}
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
        <gridHelper args={[20, 20]} position={[0, -side / 2, 0]} />

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
            <h1 className="text-2xl font-bold text-slate-900">3D Cube - Volume & Surface Area</h1>
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
            <span className="font-bold text-blue-600">Cube</span> is a special type of cuboid where all three dimensions (length, width, and height) are equal. It has 6 square faces, 12 edges, and 8 vertices.
          </p>
          <p className="text-slate-700 leading-relaxed mb-2">
            <span className="font-bold text-green-600">Volume of a Cube</span> is calculated as side × side × side = side³.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-purple-600">Surface Area of a Cube</span> is calculated as 6 × side² (since there are 6 square faces).
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
                    Side length: {exampleSide} units
                  </div>
                </div>

                {/* Calculation */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-blue-600 mb-2">Given Value:</h3>
                      <div className="flex justify-center">
                        <div className="text-center p-3 bg-blue-100 rounded">
                          <div className="text-lg font-bold text-blue-700">{exampleSide}</div>
                          <div className="text-xs text-blue-600">Side Length</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded">
                        <h4 className="font-bold text-purple-600 mb-2">Surface Area:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          6 × side² = 6 × ({exampleSide})²<br />
                          = 6 × {exampleSide * exampleSide}<br />
                          = <strong>{exampleSurfaceArea} sq units</strong>
                        </code>
                        <p className="text-xs text-slate-600 mt-1">
                          6 square faces × area of each face
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded">
                        <h4 className="font-bold text-blue-600 mb-2">Volume:</h4>
                        <code className="text-sm block bg-white p-2 rounded">
                          side³ = ({exampleSide})³<br />
                          = {exampleSide} × {exampleSide} × {exampleSide}<br />
                          = <strong>{exampleVolume} cubic units</strong>
                        </code>
                        <p className="text-xs text-slate-600 mt-1">
                          Number of unit cubes that fit inside
                        </p>
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
              {/* Side Length Control */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-700">
                    <span className="w-3 h-3 bg-red-500 inline-block mr-2 rounded"></span>
                    Side Length: <span className="font-bold text-red-600">{side} units</span>
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={side}
                  onChange={(e) => setSide(parseInt(e.target.value))}
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
            <div className="flex flex-col justify-between py-10 min-w-0  sm:w-[60%] bg-slate-900 rounded-lg border-2 border-slate-300 overflow-hidden ">
              <div className="h-full w-full">
                <Canvas shadows camera={{ position: [10, 8, 10], fov: 50 }} >
                  <InteractiveScene />
                </Canvas>
              </div>
              <div className="p-4 bg-slate-800">
                <div className="flex flex-wrap justify-center gap-4 mb-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">Side Length = {side}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">6 Square Faces</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2 rounded"></div>
                    <span className="text-white text-sm">12 Edges</span>
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
                    side³ = {side}³ = {volume}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    ({side} × {side} × {side})
                  </div>
                </div>

                {/* Surface Area */}
                <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xl font-bold text-purple-600 mb-1">{surfaceArea}</div>
                  <div className="text-xs font-medium text-purple-700 mb-1">Surface Area (sq units)</div>
                  <div className="text-xs text-slate-600">
                    6 × side² = 6 × {side}² = {surfaceArea}
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    (6 square faces)
                  </div>
                </div>

                {/* Dimensions Summary */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2 text-center text-sm">Cube Properties</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-1.5 bg-red-50 rounded">
                      <div className="font-bold text-red-600 text-sm">{side}</div>
                      <div className="text-xs text-red-500">Side Length</div>
                    </div>
                    <div className="text-center p-1.5 bg-green-50 rounded">
                      <div className="font-bold text-green-600 text-sm">6</div>
                      <div className="text-xs text-green-500">Faces</div>
                    </div>
                    <div className="text-center p-1.5 bg-blue-50 rounded">
                      <div className="font-bold text-blue-600 text-sm">12</div>
                      <div className="text-xs text-blue-500">Edges</div>
                    </div>
                    <div className="text-center p-1.5 bg-purple-50 rounded">
                      <div className="font-bold text-purple-600 text-sm">8</div>
                      <div className="text-xs text-purple-500">Vertices</div>
                    </div>
                  </div>
                </div>

                {/* Unit cubes visualization */}
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-700 mb-1">Unit Cubes Inside</div>
                    <div className="flex flex-wrap gap-0.5 justify-center max-w-24 mx-auto mb-1">
                      {Array.from({ length: Math.min(8, volume) }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-blue-300 border border-blue-400"
                        />
                      ))}
                      {volume > 8 && (
                        <div className="w-3 h-3 bg-blue-100 border border-blue-200 flex items-center justify-center">
                          <span className="text-[10px] text-blue-600">+{volume - 8}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-slate-600">
                      {volume} unit cubes total
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Perfect cube: {side} × {side} × {side}
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What Makes a Cube Special?</h3>
            <p className="text-slate-700 leading-relaxed">
              A cube is a special case of a cuboid where all three dimensions (length, width, and height)
              are equal. This perfect symmetry gives cubes unique properties: all faces are identical squares,
              all edges are equal, and all angles are right angles. Because of this symmetry, calculations
              are simpler: volume = side³ and surface area = 6 × side².
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Cube vs Cuboid: Key Differences</h3>
            <div className="text-slate-700 leading-relaxed space-y-2">
              <p><strong>Cube:</strong> All sides equal, 6 identical square faces, perfect symmetry</p>
              <p><strong>Cuboid:</strong> Sides can be different, 6 rectangular faces (3 pairs of identical faces)</p>
              <p><strong>Volume:</strong> Cube = side³ | Cuboid = length × width × height</p>
              <p><strong>Surface Area:</strong> Cube = 6 × side² | Cuboid = 2(lw + lh + wh)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              A Rubik's Cube has side length of about 5.7cm, giving it 195cm³ volume and 195cm² surface area.
              Dice used in board games are perfect cubes with side lengths of 1.6cm, volume of 4.1cm³,
              and surface area of 15.4cm². Sugar cubes are typically 1.5cm cubes with 3.4cm³ volume and
              13.5cm² surface area. In architecture, cube-shaped rooms maximize usable space with minimal
              building materials.
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