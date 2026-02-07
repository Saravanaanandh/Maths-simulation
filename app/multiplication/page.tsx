'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function MultiplicationLesson() {
  const [firstNumber, setFirstNumber] = useState(1)
  const [secondNumber, setSecondNumber] = useState(1)
  const [dragSource, setDragSource] = useState<'pool' | null>(null)

  const total = firstNumber * secondNumber

  const handleDragStart = (e: React.DragEvent, source: 'pool') => {
    setDragSource(source)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDropFirst = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragSource === 'pool' && firstNumber < 10) {
      setFirstNumber(firstNumber + 1)
    }
    setDragSource(null)
  }

  const handleDropSecond = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragSource === 'pool' && secondNumber < 10) {
      setSecondNumber(secondNumber + 1)
    }
    setDragSource(null)
  }

  const handleDragEnd = () => {
    setDragSource(null)
  }

  const reset = () => {
    setFirstNumber(1)
    setSecondNumber(1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Multiplication</h1>
            <p className="text-sm text-slate-500">What is Multiplication?</p>
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
            Multiplication is repeated addition. It means adding equal groups together.
          </p>
          <p className="text-slate-700 leading-relaxed">
            For example, 3 × 4 means 3 groups of 4, or adding 4 three times (4 + 4 + 4 = 12).
          </p>
        </section>

        {/* Example Explanation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example: Apples in Baskets</h2>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-4">3 baskets × 4 apples each</span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Basket 1 */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🧺</div>
                  <div className="flex gap-1">
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                  </div>
                </div>

                <span className="text-3xl font-bold text-blue-400">+</span>

                {/* Basket 2 */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🧺</div>
                  <div className="flex gap-1">
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                  </div>
                </div>

                <span className="text-3xl font-bold text-blue-400">+</span>

                {/* Basket 3 */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">🧺</div>
                  <div className="flex gap-1">
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                  </div>
                </div>

                <span className="text-3xl font-bold text-blue-400">=</span>

                {/* Total */}
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-900 mb-2">12 apples</span>
                  <div className="flex gap-1 flex-wrap justify-center max-w-32">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="text-2xl">🍎</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiplication Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Multiplication Simulation</h2>
          
          {/* Simulation Row - Three Boxes with Operators - Always Horizontal */}
          <div className="flex items-stretch justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto">
            {/* First Number Box (Groups) */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropFirst}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                Groups
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {firstNumber}
              </div>
              <div className="flex flex-col gap-1 items-center">
                {Array.from({ length: firstNumber }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-xl sm:text-2xl mr-1">🧺</span>
                    <span className="text-sm text-slate-500">×{secondNumber}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Multiplication Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-green-400">×</span>
            </div>

            {/* Second Number Box (Items per group) */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropSecond}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                Items per group
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {secondNumber}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: secondNumber }).map((_, i) => (
                  <span key={i} className="text-lg sm:text-xl">🍎</span>
                ))}
              </div>
            </div>

            {/* Equals Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-green-400">=</span>
            </div>

            {/* Result Box */}
            <div className="flex-1 min-w-24 sm:min-w-32 bg-green-50 rounded-lg border-2 border-green-300 p-3 sm:p-6 flex flex-col items-center justify-center">
              <label className="block text-xs sm:text-sm font-medium text-green-600 mb-2 sm:mb-3 text-center">
                Total Items
              </label>
              <div className="text-5xl sm:text-6xl font-bold text-green-600 text-center mb-2">
                {total}
              </div>
              <div className="flex flex-col gap-2 items-center">
                {Array.from({ length: firstNumber }).map((_, groupIndex) => (
                  <div key={groupIndex} className="flex items-center gap-1">
                    <span className="text-lg">🧺</span>
                    {Array.from({ length: secondNumber }).map((_, itemIndex) => (
                      <span key={itemIndex} className="text-lg">🍎</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation of the current multiplication */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
            <p className="text-blue-800 text-center font-medium">
              {firstNumber} × {secondNumber} = {firstNumber} groups of {secondNumber} = {total}
            </p>
          </div>

          {/* Apple Pool - Drag From Here */}
          <div 
            draggable
            onDragStart={(e) => handleDragStart(e, 'pool')}
            onDragEnd={handleDragEnd}
            className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-400 p-8 text-center mb-6 hover:bg-slate-100 transition-colors cursor-move"
          >
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex flex-col items-center">
                <span className="text-5xl mb-2">🍎</span>
                <p className="text-slate-700 text-sm">Apple</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-5xl mb-2">🧺</span>
                <p className="text-slate-700 text-sm">Basket</p>
              </div>
            </div>
            <p className="text-slate-700 font-bold text-lg">Drag to create groups and items</p>
            <p className="text-sm text-slate-500 mt-2">
              Drag apples to add items per group. Drag baskets to add more groups.
            </p>
          </div>

          {/* Reset Button */}
          <Button
            onClick={reset}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 text-lg rounded-lg transition-colors"
          >
            Reset Simulation
          </Button>
        </section>

        {/* Educational Explanation */}
        <section className="space-y-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Multiplication?</h3>
            <p className="text-slate-700 leading-relaxed">
              Multiplication is repeated addition. It helps us quickly calculate the total when we have equal groups of items. Instead of adding the same number multiple times, multiplication gives us the answer faster. For example, 5 × 3 means 5 groups of 3, which is the same as 3 + 3 + 3 + 3 + 3 = 15.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Why do we use Multiplication?</h3>
            <p className="text-slate-700 leading-relaxed">
              We use multiplication in daily life when we need to calculate totals of equal groups. For example, if you buy 4 packs of cookies with 6 cookies in each pack, multiplication helps you quickly find that you have 24 cookies total. It's also used in calculating area, volume, scaling recipes, and determining prices for multiple items.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              • <strong>Classroom:</strong> 5 rows of desks with 6 desks in each row = 5 × 6 = 30 desks total<br/>
              • <strong>Grocery shopping:</strong> 3 cartons of eggs with 12 eggs each = 3 × 12 = 36 eggs total<br/>
              • <strong>Baking:</strong> 4 trays of cupcakes with 8 cupcakes each = 4 × 8 = 32 cupcakes total<br/>
              • <strong>Sports:</strong> 6 teams with 11 players each = 6 × 11 = 66 players total
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Multiplication as Arrays</h3>
            <p className="text-slate-700 leading-relaxed">
              Multiplication can also be shown as arrays (rows and columns). For example, 4 × 3 can be shown as 4 rows with 3 items in each row. This visual representation helps understand that multiplication is commutative (4 × 3 = 3 × 4).
            </p>
            <div className="mt-4 flex justify-center">
              <div className="inline-grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="text-2xl">🍪</span>
                ))}
              </div>
              <div className="ml-6 flex items-center">
                <span className="text-slate-600">4 rows × 3 columns = 12 items</span>
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