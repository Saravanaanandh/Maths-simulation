'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function AdditionLesson() {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)
  const [dragSource, setDragSource] = useState<'pool' | null>(null)

  const total = firstNumber + secondNumber

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
    setFirstNumber(0)
    setSecondNumber(0)
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
            <h1 className="text-2xl font-bold text-slate-900">Addition</h1>
            <p className="text-sm text-slate-500">What is Addition?</p>
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
            Addition means finding the total when two or more quantities are combined.
          </p>
          <p className="text-slate-700 leading-relaxed">
            We use addition in daily life to count, calculate, and combine things.
          </p>
        </section>

        {/* Example Explanation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example: Apples</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 mb-2">2</span>
              <div className="flex gap-1">
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
              </div>
            </div>

            <span className="text-3xl font-bold text-blue-400">+</span>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 mb-2">3</span>
              <div className="flex gap-1">
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
              </div>
            </div>

            <span className="text-3xl font-bold text-blue-400">=</span>

            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 mb-2">5</span>
              <div className="flex gap-1 flex-wrap justify-center max-w-24">
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
                <span className="text-3xl">🍎</span>
              </div>
            </div>
          </div>
        </section>

        {/* Addition Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Addition Simulation</h2>
          
          {/* Simulation Row - Three Boxes with Operators - Always Horizontal */}
          <div className="flex items-stretch justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto">
            {/* First Number Box */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropFirst}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                First
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {firstNumber}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: firstNumber }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">🍎</span>
                ))}
              </div>
            </div>

            {/* Plus Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-blue-400">+</span>
            </div>

            {/* Second Number Box */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropSecond}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                Second
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {secondNumber}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: secondNumber }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">🍎</span>
                ))}
              </div>
            </div>

            {/* Equals Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-blue-400">=</span>
            </div>

            {/* Result Box */}
            <div className="flex-1 min-w-24 sm:min-w-32 bg-blue-50 rounded-lg border-2 border-blue-300 p-3 sm:p-6 flex flex-col items-center justify-center">
              <label className="block text-xs sm:text-sm font-medium text-blue-600 mb-2 sm:mb-3 text-center">
                Total
              </label>
              <div className="text-5xl sm:text-6xl font-bold text-blue-600 text-center mb-2">
                {total}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: total }).map((_, i) => (
                  <span key={i} className="text-lg sm:text-2xl">🍎</span>
                ))}
              </div>
            </div>
          </div>

          {/* Apple Pool - Drag From Here */}
          <div 
            draggable
            onDragStart={(e) => handleDragStart(e, 'pool')}
            onDragEnd={handleDragEnd}
            className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-400 p-8 text-center mb-6 hover:bg-slate-100 transition-colors cursor-move"
          >
            <span className="text-5xl mb-3 block">🍎</span>
            <p className="text-slate-700 font-bold text-lg">Apple (Drag to count)</p>
            <p className="text-sm text-slate-500 mt-2">
              By counting the apples in both boxes, we find the total number of apples.
            </p>
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
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Addition?</h3>
            <p className="text-slate-700 leading-relaxed">
              Addition is a basic mathematical operation used to find the total when two or more quantities are combined. It helps us count, calculate, and understand how objects or numbers come together to form a larger amount.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Why do we use Addition?</h3>
            <p className="text-slate-700 leading-relaxed">
              We use addition in daily life to count objects, calculate money, find totals, and solve real-life problems. Whether you're combining groceries in a shopping basket, calculating your total score in a game, or figuring out how much money you have, addition is an essential skill.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              If you have 2 apples and get 3 more apples, addition helps you know that you have 5 apples in total. Similarly, if you have 4 pencils and a friend gives you 6 more pencils, addition helps you find that you now have 10 pencils. These everyday examples show how addition is used in our daily activities.
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