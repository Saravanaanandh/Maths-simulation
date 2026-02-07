'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function CircleLesson() {
  const [radius, setRadius] = useState(3)
  
  // Calculations
  const pi = 3.14
  const diameter = 2 * radius
  const circumference = 2 * pi * radius
  const area = pi * radius * radius

  // Static example values (not dynamic)
  const exampleRadius = 5
  const exampleDiameter = 2 * exampleRadius
  const exampleCircumference = 2 * pi * exampleRadius
  const exampleArea = pi * exampleRadius * exampleRadius

  const reset = () => {
    setRadius(3)
  }

  // Calculate circle size based on radius
  const getCircleSize = () => {
    return radius * 24 // Adjust multiplier for appropriate visual scaling
  }

  // Calculate font size based on circle size
  const getTextSize = () => {
    if (radius <= 2) return "text-sm"
    if (radius <= 4) return "text-base"
    if (radius <= 6) return "text-lg"
    if (radius <= 8) return "text-xl"
    return "text-2xl"
  }

  // Static example sizes
  const exampleCircleSize = 120 // 4 * 24
  const exampleTextSize = "text-xl"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Circle - Area & Circumference</h1>
            <p className="text-sm text-slate-500">Learn how to calculate area and circumference</p>
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
            <span className="font-bold text-blue-600">Area of a Circle</span> means finding how much space is inside the circle. It's calculated using π (pi) times the radius squared (π × r²).
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-green-600">Circumference of a Circle</span> means finding the distance around the circle. It's calculated using 2 times π times the radius (2 × π × r).
          </p>
        </section>

        {/* Example Explanation - Static values */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example Calculation</h2>
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              {/* Visual Circle - Static example */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Circle - Static size */}
                  <div 
                    className="border-2 border-blue-500 bg-blue-50 rounded-full flex items-center justify-center"
                    style={{
                      width: `${exampleCircleSize}px`,
                      height: `${exampleCircleSize}px`
                    }}
                  >
                    <div className="text-center">
                      <div className={`${exampleTextSize} font-bold mb-2 text-blue-600`}>{exampleRadius}</div>
                      <div className="text-sm text-slate-500">radius</div>
                    </div>
                  </div>
                  {/* Radius line */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
                    <div className="w-14 h-0.5 bg-blue-500 relative">
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  {/* Radius label */}
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-blue-600 font-medium text-nowrap">
                    Radius = {exampleRadius} units
                  </div>
                </div>
              </div>

              {/* Calculation - Static values */}
              <div className="text-center md:text-left">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700">Radius = <span className="font-bold text-blue-600">{exampleRadius}</span> units</p>
                    <p className="text-slate-600 text-sm">Diameter = 2 × {exampleRadius} = {exampleDiameter} units</p>
                  </div>

                  <div>
                    <p className="font-medium text-green-600 mb-1">Circumference Calculation:</p>
                    <p className="text-slate-700">
                      C = 2πr = 2 × π × {exampleRadius} = <span className="font-bold text-green-600">{exampleCircumference.toFixed(2)} units</span>
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-purple-600 mb-1">Area Calculation:</p>
                    <p className="text-slate-700">
                      A = πr² = π × {exampleRadius}² = <span className="font-bold text-purple-600">{exampleArea.toFixed(2)} square units</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Circle Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Circle Simulation</h2>
          
          {/* Radius Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">Radius: <span className="font-bold text-blue-600">{radius} units</span></label>
              <span className="text-sm text-slate-500">1 to 10 units</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>

          {/* Simulation Row */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mb-8 overflow-x-auto">
            {/* Circle Visualization Box */}
            <div className="flex-1 min-w-64 bg-slate-50 rounded-lg border-2 border-slate-300 p-6 flex flex-col items-center justify-between">
              <label className="block text-sm font-medium text-slate-600 mb-4 text-center">
                Circle Visualization
              </label>
              
              {/* Circle with radius line */}
              <div className="relative mb-4 flex items-center justify-center">
                <div 
                  className="border-2 border-blue-500 bg-blue-50 rounded-full flex items-center justify-center"
                  style={{
                    width: `${getCircleSize()}px`,
                    height: `${getCircleSize()}px`
                  }}
                >
                  {/* Dynamic text size based on circle size */}
                  <div className="text-right mt-5">
                    <div className={`${getTextSize()} font-bold text-blue-600`}>
                      r = {radius}
                    </div>
                  </div>
                </div>
                
                {/* Radius line */}
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2">
                  <div 
                    className="h-0.5 bg-blue-500 relative"
                    style={{ width: `${getCircleSize()/2}px` }}
                  >
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-slate-600 text-center space-y-2">
                <div className={`text-xs ${radius <= 3 ? 'text-xs' : 'text-sm'} text-slate-500`}>
                  π × {radius}² = {area.toFixed(2)} unit squares
                </div>
                <div className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded">
                  Radius = {radius} units
                </div>
                <div>Diameter = {diameter} units</div>
              </div>
            </div>

            {/* Results Box */}
            <div className="flex-1 min-w-64 bg-blue-50 rounded-lg border-2 border-blue-300 p-6 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-blue-600 mb-4 text-center">
                Calculation Results (π = 3.14)
              </label>
              
              <div className="space-y-6 w-full">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{radius}</div>
                  <div className="text-sm text-blue-700">Radius (units)</div>
                  <div className="text-xs text-slate-600 mt-1">Diameter = {diameter} units</div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">{circumference.toFixed(2)}</div>
                    <div className="text-sm text-green-700">Circumference (units)</div>
                    <div className="text-xs text-slate-600 mt-1">2 × π × {radius} = {circumference.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{area.toFixed(2)}</div>
                    <div className="text-sm text-purple-700">Area (square units)</div>
                    <div className="text-xs text-slate-600 mt-1">π × {radius}² = {area.toFixed(2)}</div>
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is π (Pi)?</h3>
            <p className="text-slate-700 leading-relaxed">
              π (pi) is a special mathematical constant approximately equal to 3.14159. It represents the ratio of a circle's circumference to its diameter. This ratio is the same for all circles, no matter their size. For simplicity in calculations, we often use 3.14 or 22/7 as approximations.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Key Circle Formulas</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="font-bold text-blue-600 mb-1">Diameter (d)</div>
                <div className="text-slate-700">d = 2 × radius = 2 × {radius} = {diameter} units</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="font-bold text-green-600 mb-1">Circumference (C)</div>
                <div className="text-slate-700">C = 2 × π × radius = 2 × π × {radius} = {circumference.toFixed(2)} units</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="font-bold text-purple-600 mb-1">Area (A)</div>
                <div className="text-slate-700">A = π × radius² = π × {radius}² = {area.toFixed(2)} square units</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-700 mb-2">🍕 Pizza</div>
                <p className="text-slate-700">A pizza with 7-inch radius has circumference of 44 inches (crust length) and area of 154 square inches (cheese area).</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-700 mb-2">🚗 Car Tire</div>
                <p className="text-slate-700">A tire with 14-inch radius rotates 44 inches per turn (circumference) and covers 616 square inches (contact area).</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-700 mb-2">⏰ Clock Face</div>
                <p className="text-slate-700">A clock with 6-inch radius needs 38 inches of frame (circumference) and has 113 square inches of face area.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-bold text-yellow-700 mb-2">🏀 Basketball Hoop</div>
                <p className="text-slate-700">A hoop with 9-inch radius has 57-inch circumference (rim length) and 254 square inches area (opening).</p>
              </div>
            </div>
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