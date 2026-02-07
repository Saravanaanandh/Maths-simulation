'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function RectangleLesson() {
  const [length, setLength] = useState(5)
  const [width, setWidth] = useState(3)
  
  // Calculations
  const perimeter = 2 * (length + width)
  const area = length * width

  // Static example values (not dynamic)
  const exampleLength = 8
  const exampleWidth = 5
  const examplePerimeter = 2 * (exampleLength + exampleWidth)
  const exampleArea = exampleLength * exampleWidth

  const reset = () => {
    setLength(5)
    setWidth(3)
  }

  // Calculate font size based on rectangle size
  const getTextSize = () => {
    const maxSide = Math.max(length, width)
    if (maxSide <= 3) return "text-xs"
    if (maxSide <= 5) return "text-sm"
    if (maxSide <= 7) return "text-base"
    if (maxSide <= 9) return "text-lg"
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
            <h1 className="text-2xl font-bold text-slate-900">Rectangle - Area & Perimeter</h1>
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
            <span className="font-bold text-blue-600">Area of a Rectangle</span> means finding how much space is inside the rectangle. It's calculated by multiplying the length by the width.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-green-600">Perimeter of a Rectangle</span> means finding the total distance around the rectangle. It's calculated by adding all four sides: 2 × (length + width).
          </p>
        </section>

        {/* Example Explanation - Static values */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example Calculation</h2>
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              {/* Visual Rectangle - Static example */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Rectangle - Static size */}
                  <div 
                    className="border-2 border-blue-500 bg-blue-50 flex items-center justify-center"
                    style={{
                      width: `${exampleLength * 20}px`,
                      height: `${exampleWidth * 20}px`,
                      minWidth: `${exampleLength * 20}px`,
                      minHeight: `${exampleWidth * 20}px`
                    }}
                  >
                    <div className="text-center">
                      <div className={`${exampleTextSize} font-bold text-blue-600`}>
                        {exampleLength} × {exampleWidth}
                      </div>
                    </div>
                  </div>
                  {/* Length label */}
                  <div className="absolute -bottom-8 sm:text-nowrap left-1/2 transform -translate-x-1/2 text-sm text-blue-600 font-medium">
                    Length = {exampleLength} units
                  </div>
                  {/* Width label */}
                  <div className="absolute -right-16 sm:text-nowrap top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-blue-600 font-medium">
                    Width = {exampleWidth} units
                  </div>
                </div>
              </div>

              {/* Calculation - Static values */}
              <div className="text-center md:text-left">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700">
                      Length = <span className="font-bold text-blue-600">{exampleLength}</span> units<br />
                      Width = <span className="font-bold text-blue-600">{exampleWidth}</span> units
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-green-600 mb-1">Perimeter Calculation:</p>
                    <p className="text-slate-700">
                      Perimeter = 2 × (Length + Width)<br />
                      = 2 × ({exampleLength} + {exampleWidth})<br />
                      = <span className="font-bold text-green-600">{examplePerimeter} units</span>
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-purple-600 mb-1">Area Calculation:</p>
                    <p className="text-slate-700">
                      Area = Length × Width<br />
                      = {exampleLength} × {exampleWidth}<br />
                      = <span className="font-bold text-purple-600">{exampleArea} square units</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rectangle Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Rectangle Simulation</h2>
          
          {/* Dimension Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Length Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-slate-700">
                  Length: <span className="font-bold text-blue-600">{length} units</span>
                </label>
                <span className="text-sm text-slate-500">1 to 10 units</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>3</span>
                <span>5</span>
                <span>7</span>
                <span>10</span>
              </div>
            </div>

            {/* Width Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-slate-700">
                  Width: <span className="font-bold text-green-600">{width} units</span>
                </label>
                <span className="text-sm text-slate-500">1 to 10 units</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1</span>
                <span>3</span>
                <span>5</span>
                <span>7</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* Simulation Row */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 mb-8 overflow-x-auto">
            {/* Rectangle Visualization Box */}
            <div className="flex-1 min-w-64 bg-slate-50 rounded-lg border-2 border-slate-300 p-6 flex flex-col items-center justify-between">
              <label className="block text-sm font-medium text-slate-600 mb-4 text-center">
                Rectangle Visualization
              </label>
              
              {/* Rectangle */}
              <div className="relative mb-4 flex items-center justify-center">
                <div 
                  className="border-2 border-blue-500 bg-blue-50 flex items-center justify-center"
                  style={{
                    width: `${length * 20}px`,
                    height: `${width * 20}px`,
                    minWidth: `${length * 20}px`,
                    minHeight: `${width * 20}px`
                  }}
                >
                  {/* Dynamic text size based on rectangle size */}
                  <div className="text-center">
                    <div className={`${getTextSize()} font-bold text-blue-600`}>
                      {length} × {width}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-slate-600 text-center space-y-2">
                <div className={`text-xs ${Math.max(length, width) <= 3 ? 'text-xs' : 'text-sm'} text-slate-500`}>
                  = {area} unit squares
                </div>
                <div className="flex gap-4">
                  <div className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded">
                    Length = {length}
                  </div>
                  <div className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded">
                    Width = {width}
                  </div>
                </div>
                <div>Rectangle dimensions: {length} × {width}</div>
              </div>
            </div>

            {/* Results Box */}
            <div className="flex-1 min-w-64 bg-blue-50 rounded-lg border-2 border-blue-300 p-6 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-blue-600 mb-4 text-center">
                Calculation Results
              </label>
              
              <div className="space-y-6 w-full">
                <div className="text-center">
                  <div className="flex justify-center gap-6 mb-2">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{length}</div>
                      <div className="text-sm text-blue-700">Length</div>
                    </div>
                    <div className="text-2xl text-slate-400 mt-1">×</div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">{width}</div>
                      <div className="text-sm text-green-700">Width</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600">Rectangle dimensions</div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-1">{perimeter}</div>
                    <div className="text-sm text-green-700">Perimeter (units)</div>
                    <div className="text-xs text-slate-600 mt-1">
                      2 × ({length} + {width}) = {perimeter}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-1">{area}</div>
                    <div className="text-sm text-purple-700">Area (square units)</div>
                    <div className="text-xs text-slate-600 mt-1">
                      {length} × {width} = {area}
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
              Area measures the space inside a shape. For rectangles, it's calculated by multiplying the length by the width. Each unit square inside the rectangle counts as 1 square unit. The area tells us how many unit squares can fit inside the rectangle.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Perimeter?</h3>
            <p className="text-slate-700 leading-relaxed">
              Perimeter measures the total distance around the outside of a shape. For rectangles, since opposite sides are equal, the perimeter is 2 times the length plus 2 times the width. Think of it as walking around the rectangle - how far would you walk to go all the way around?
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-700 mb-2">📐 Classroom</div>
                <p className="text-slate-700">A classroom that is 8 meters long and 6 meters wide has perimeter of 28 meters (wall length) and area of 48 square meters (floor space).</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-bold text-green-700 mb-2">📱 Smartphone Screen</div>
                <p className="text-slate-700">A phone screen that is 15 cm long and 7 cm wide has perimeter of 44 cm (frame length) and area of 105 square cm (display area).</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-bold text-purple-700 mb-2">📦 Cardboard Box</div>
                <p className="text-slate-700">A box that is 30 cm long and 20 cm wide has perimeter of 100 cm (tape needed) and area of 600 square cm (wrapping paper needed).</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-bold text-yellow-700 mb-2">🏃‍♂️ Running Track</div>
                <p className="text-slate-700">A rectangular track that is 100 meters long and 50 meters wide has perimeter of 300 meters (running distance) and area of 5000 square meters (field area).</p>
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