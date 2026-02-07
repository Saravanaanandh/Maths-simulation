'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function TriangleLesson() {
  const [base, setBase] = useState(6)
  const [height, setHeight] = useState(4)
  const [side1, setSide1] = useState(5)
  const [side2, setSide2] = useState(5)

  // Calculations
  const area = 0.5 * base * height
  const perimeter = base + side1 + side2

  // Static example values (not dynamic)
  const exampleBase = 8
  const exampleHeight = 6
  const exampleSide1 = 5
  const exampleSide2 = 5
  const exampleArea = 0.5 * exampleBase * exampleHeight
  const examplePerimeter = exampleBase + exampleSide1 + exampleSide2

  const reset = () => {
    setBase(6)
    setHeight(4)
    setSide1(5)
    setSide2(5)
  }

  // Calculate font size based on triangle size
  const getTextSize = () => {
    const maxDimension = Math.max(base, height, side1, side2)
    if (maxDimension <= 3) return "text-xs"
    if (maxDimension <= 5) return "text-sm"
    if (maxDimension <= 7) return "text-base"
    if (maxDimension <= 9) return "text-lg"
    return "text-xl"
  }

  // Static example sizes
  const exampleTextSize = "text-lg"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/simulations" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Triangle - Area & Perimeter</h1>
            <p className="text-sm text-slate-500">Learn how to calculate area and perimeter</p>
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
            <span className="font-bold text-blue-600">Area of a Triangle</span> means finding how much space is inside the triangle. It's calculated using the formula: ½ × base × height.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-green-600">Perimeter of a Triangle</span> means finding the total distance around the triangle. It's calculated by adding all three sides together.
          </p>
        </section>

        {/* Example Explanation - Static values */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example Calculation</h2>
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Visual Triangle - Static example */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Triangle - Static size */}
                  <div className="relative" style={{ width: `${exampleBase * 20}px`, height: `${exampleHeight * 20}px` }}>
                    {/* Triangle shape */}
                    <div
                      className="absolute border-b-2 border-l-2 border-r-2 border-blue-500 bg-blue-50"
                      style={{
                        borderLeftWidth: `${(exampleBase * 20) / 2}px`,
                        borderRightWidth: `${(exampleBase * 20) / 2}px`,
                        borderBottomWidth: `${exampleHeight * 20}px`,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: '#3b82f6',
                        bottom: 0
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className={`${exampleTextSize} font-bold text-blue-600`}>
                          {exampleBase} × {exampleHeight}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Base label */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-blue-600 font-medium">
                    Base = {exampleBase} units
                  </div>
                  {/* Height label */}
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-blue-600 font-medium">
                    Height = {exampleHeight} units
                  </div>
                </div>
              </div>

              {/* Calculation - Static values */}
              <div className="text-center md:text-left">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700">
                      Base = <span className="font-bold text-blue-600">{exampleBase}</span> units<br />
                      Height = <span className="font-bold text-blue-600">{exampleHeight}</span> units<br />
                      Sides = <span className="font-bold text-blue-600">{exampleSide1}</span> & <span className="font-bold text-blue-600">{exampleSide2}</span> units
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-green-600 mb-1">Perimeter Calculation:</p>
                    <p className="text-slate-700">
                      Perimeter = Base + Side1 + Side2<br />
                      = {exampleBase} + {exampleSide1} + {exampleSide2}<br />
                      = <span className="font-bold text-green-600">{examplePerimeter} units</span>
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-purple-600 mb-1">Area Calculation:</p>
                    <p className="text-slate-700">
                      Area = ½ × Base × Height<br />
                      = ½ × {exampleBase} × {exampleHeight}<br />
                      = <span className="font-bold text-purple-600">{exampleArea} square units</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Triangle Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Triangle Simulation</h2>

          {/* Dimension Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Base Slider */}
            <div>
              <div className="mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Base: <span className="font-bold text-blue-600">{base} units</span>
                </label>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={base}
                onChange={(e) => setBase(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-slate-500 mt-1">3 to 10 units</div>
            </div>

            {/* Height Slider */}
            <div>
              <div className="mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Height: <span className="font-bold text-green-600">{height} units</span>
                </label>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-slate-500 mt-1">2 to 8 units</div>
            </div>

            {/* Side1 Slider */}
            <div>
              <div className="mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Side 1: <span className="font-bold text-purple-600">{side1} units</span>
                </label>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={side1}
                onChange={(e) => setSide1(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-slate-500 mt-1">3 to 10 units</div>
            </div>

            {/* Side2 Slider */}
            <div>
              <div className="mb-3">
                <label className="text-sm font-medium text-slate-700">
                  Side 2: <span className="font-bold text-orange-600">{side2} units</span>
                </label>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={side2}
                onChange={(e) => setSide2(parseInt(e.target.value))}
                className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-slate-500 mt-1">3 to 10 units</div>
            </div>
          </div>

          {/* Simulation Row */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mb-8 overflow-x-auto">
            {/* Triangle Visualization Box */}
            <div className="flex-1 min-w-64 bg-slate-50 rounded-lg border-2 border-slate-300 p-6 flex flex-col items-center justify-between">
              <label className="block text-sm font-medium text-slate-600 mb-4 text-center">
                Triangle Visualization
              </label>

              {/* Triangle */}
              <div className="relative mb-4 flex items-center justify-center">
                <div className="relative" style={{ width: `${base * 20}px`, height: `${height * 20}px` }}>
                  {/* Triangle shape using borders */}
                  <div
                    className="absolute border-b-2 border-l-2 border-r-2 border-blue-500 bg-blue-50"
                    style={{
                      borderLeftWidth: `${(base * 20) / 2}px`,
                      borderRightWidth: `${(base * 20) / 2}px`,
                      borderBottomWidth: `${height * 20}px`,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderBottomColor: '#3b82f6',
                      bottom: 0
                    }}
                  >
                    {/* Text inside triangle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className={`${getTextSize()} font-bold text-blue-600`}>
                        {base} × {height}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-600 text-center space-y-2">
                <div className={`text-xs ${Math.max(base, height, side1, side2) <= 4 ? 'text-xs' : 'text-sm'} text-slate-500`}>
                  = {area.toFixed(1)} unit squares
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">
                    Base = {base}
                  </div>
                  <div className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                    Height = {height}
                  </div>
                  <div className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded">
                    Side1 = {side1}
                  </div>
                  <div className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                    Side2 = {side2}
                  </div>
                </div>
                <div>Triangle dimensions</div>
              </div>
            </div>

            {/* Results Box */}
            <div className="flex-1 min-w-64 bg-blue-50 rounded-lg border-2 border-blue-300 p-6 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-blue-600 mb-4 text-center">
                Calculation Results
              </label>

              <div className="space-y-6 w-full">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{base}</div>
                      <div className="text-xs text-blue-700">Base</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-green-600">{height}</div>
                      <div className="text-xs text-green-700">Height</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-600">{side1}</div>
                      <div className="text-xs text-purple-700">Side 1</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-orange-600">{side2}</div>
                      <div className="text-xs text-orange-700">Side 2</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600">Triangle dimensions</div>
                </div>

                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{perimeter}</div>
                    <div className="text-sm text-green-700">Perimeter (units)</div>
                    <div className="text-xs text-slate-600 mt-1">
                      {base} + {side1} + {side2} = {perimeter}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{area.toFixed(1)}</div>
                    <div className="text-sm text-purple-700">Area (square units)</div>
                    <div className="text-xs text-slate-600 mt-1">
                      ½ × {base} × {height} = {area.toFixed(1)}
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Area?</h3>
            <p className="text-slate-700 leading-relaxed">
              Area measures the space inside a shape. For triangles, it's calculated using the formula: ½ × base × height. The base is any side of the triangle, and the height is the perpendicular distance from that base to the opposite vertex. Each unit square inside the triangle counts as 1 square unit.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Perimeter?</h3>
            <p className="text-slate-700 leading-relaxed">
              Perimeter measures the total distance around the outside of a shape. For triangles, it's simply the sum of all three sides. Think of it as walking around the triangle - how far would you walk to go all the way around all three sides?
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-700 mb-2">🏔️ Mountain Side</div>
                <p className="text-slate-700">A triangular plot of land with 50m base and 30m height has perimeter of 130m (fence needed) and area of 750m² (planting space).</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-700 mb-2">🚸 Road Sign</div>
                <p className="text-slate-700">A triangular road sign with 60cm base and 50cm height has perimeter of 160cm (frame length) and area of 1500cm² (reflective area).</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-700 mb-2">🎨 Artist's Easel</div>
                <p className="text-slate-700">A triangular canvas with 80cm base and 60cm height has perimeter of 200cm (frame) and area of 2400cm² (painting area).</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-bold text-yellow-700 mb-2">🏕️ Camping Tent</div>
                <p className="text-slate-700">A triangular tent with 3m base and 2m height has perimeter of 8m (ground contact) and area of 3m² (floor space).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-200 text-center pb-8">
          <p className="text-sm text-slate-600">
            Made with Visily
          </p>
        </div>
      </div>
    </div>
  )
}