'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function SquareLesson() {
  const [sideLength, setSideLength] = useState(3)
  
  // Calculations
  const perimeter = 4 * sideLength
  const area = sideLength * sideLength

  // Static example values (not dynamic)
  const exampleSide = 4
  const examplePerimeter = 4 * exampleSide
  const exampleArea = exampleSide * exampleSide

  const reset = () => {
    setSideLength(3)
  }

  // Calculate font size based on square size
  const getTextSize = () => {
    if (sideLength <= 2) return "text-sm"
    if (sideLength <= 4) return "text-base"
    if (sideLength <= 6) return "text-lg"
    if (sideLength <= 8) return "text-xl"
    return "text-2xl"
  }

  // Calculate text size for example (static)
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
            <h1 className="text-2xl font-bold text-slate-900">Square - Area & Perimeter</h1>
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
            <span className="font-bold text-blue-600">Area of a Square</span> means finding how much space is inside the square. Since all sides are equal, we find the area by multiplying one side by itself.
          </p>
          <p className="text-slate-700 leading-relaxed">
            <span className="font-bold text-green-600">Perimeter of a Square</span> means finding the total distance around the square. Because a square has four equal sides, we add all four sides together.
          </p>
        </section>

        {/* Example Explanation - Static values */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example Calculation</h2>
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Visual Square - Static example */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Square - Static size */}
                  <div className="border-2 border-blue-500 bg-blue-50 w-48 h-48 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className={`${exampleTextSize} font-bold text-blue-600`}>{exampleSide}</div>
                      <div className="text-sm text-slate-500">units</div>
                    </div>
                  </div>
                  {/* Side labels - Static */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-blue-600 font-medium">
                    {exampleSide} units
                  </div>
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm text-blue-600 font-medium">
                    {exampleSide} units
                  </div>
                </div>
              </div>

              {/* Calculation - Static values */}
              <div className="text-center md:text-left">
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700">Side Length = <span className="font-bold text-blue-600">{exampleSide}</span> units</p>
                  </div>

                  <div>
                    <p className="font-medium text-green-600 mb-1">Perimeter Calculation:</p>
                    <p className="text-slate-700">
                      Perimeter = 4 × Side = 4 × {exampleSide} = <span className="font-bold text-green-600">{examplePerimeter} units</span>
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-purple-600 mb-1">Area Calculation:</p>
                    <p className="text-slate-700">
                      Area = Side × Side = {exampleSide} × {exampleSide} = <span className="font-bold text-purple-600">{exampleArea} square units</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Square Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Square Simulation</h2>
          
          {/* Side Length Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-slate-700">Side Length: <span className="font-bold text-blue-600">{sideLength} units</span></label>
              <span className="text-sm text-slate-500">1 to 10 units</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sideLength}
              onChange={(e) => setSideLength(parseInt(e.target.value))}
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
            {/* Square Visualization Box */}
            <div className="flex-1 min-w-64 bg-slate-50 rounded-lg border-2 border-slate-300 p-6 flex flex-col items-center justify-between">
              <label className="block text-sm font-medium text-slate-600 mb-4 text-center">
                Square Visualization
              </label>
              
              {/* Grid Square */}
              <div className="relative mb-4">
                <div 
                  className="border-2 border-blue-500 bg-blue-50 flex items-center justify-center"
                  style={{
                    width: `${sideLength * 24}px`,
                    height: `${sideLength * 24}px`,
                    minWidth: `${sideLength * 24}px`,
                    minHeight: `${sideLength * 24}px`
                  }}
                >
                  {/* Dynamic text size based on square size */}
                  <div className="text-center">
                    <div className={`${getTextSize()} font-bold text-blue-600`}>
                      {sideLength} × {sideLength}
                    </div>
                    
                  </div>
                </div>
                 
              </div>
              
              <div className="text-sm text-slate-600 text-center">
                <div className={`text-xs ${sideLength <= 3 ? 'text-xs' : 'text-sm'} text-slate-500 mb-2`}>
                      = {area} unit squares
                    </div>
                <div className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded">
                {sideLength} units
                </div>
                {sideLength} units on each side
              </div>
            </div>

            {/* Results Box */}
            <div className="flex-1 min-w-64 bg-blue-50 rounded-lg border-2 border-blue-300 p-6 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-blue-600 mb-4 text-center">
                Calculation Results
              </label>
              
              <div className="space-y-6 w-full">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{sideLength}</div>
                  <div className="text-sm text-blue-700">Side Length (units)</div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">{perimeter}</div>
                    <div className="text-sm text-green-700">Perimeter (units)</div>
                    <div className="text-xs text-slate-600 mt-1">4 × {sideLength} = {perimeter}</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{area}</div>
                    <div className="text-sm text-purple-700">Area (square units)</div>
                    <div className="text-xs text-slate-600 mt-1">{sideLength} × {sideLength} = {area}</div>
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
              Area measures the space inside a shape. For squares, it's calculated by multiplying the side length by itself. Each unit square inside the square counts as 1 square unit. The area tells us how many unit squares can fit inside the square.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Perimeter?</h3>
            <p className="text-slate-700 leading-relaxed">
              Perimeter measures the total distance around the outside of a shape. For squares, since all four sides are equal, the perimeter is 4 times the side length. Think of it as walking around the square - how far would you walk to go all the way around?
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              If you have a square garden with 5 meter sides, the perimeter is 20 meters (fence needed) and the area is 25 square meters (planting space). Similarly, a square room with 4 meter sides has 16 meters of baseboard (perimeter) and 16 square meters of flooring (area).
            </p>
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