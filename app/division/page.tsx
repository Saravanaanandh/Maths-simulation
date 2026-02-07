'use client'

import React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function DivisionLesson() {
  const [totalItems, setTotalItems] = useState(1)
  const [numberOfGroups, setNumberOfGroups] = useState(1)
  const [dragSource, setDragSource] = useState<'pool' | null>(null)

  const itemsPerGroup = numberOfGroups > 0 ? Math.floor(totalItems / numberOfGroups) : 0
  const remainder = numberOfGroups > 0 ? totalItems % numberOfGroups : 0

  const handleDragStart = (e: React.DragEvent, source: 'pool') => {
    setDragSource(source)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDropTotal = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragSource === 'pool' && totalItems < 20) {
      setTotalItems(totalItems + 1)
    }
    setDragSource(null)
  }

  const handleDropGroups = (e: React.DragEvent) => {
    e.preventDefault()
    if (dragSource === 'pool' && numberOfGroups < 6) {
      setNumberOfGroups(numberOfGroups + 1)
    }
    setDragSource(null)
  }

  const handleDragEnd = () => {
    setDragSource(null)
  }

  const reset = () => {
    setTotalItems(1)
    setNumberOfGroups(1)
  }

  // Calculate distribution for visualization
 const distributeItems = () => {
  const distribution: string[][] = Array.from({ length: numberOfGroups }, () => [])
  let itemsLeft = totalItems
  
  for (let i = 0; i < numberOfGroups; i++) {
    const itemsToAdd = Math.min(itemsPerGroup, itemsLeft)
    for (let j = 0; j < itemsToAdd; j++) {
      distribution[i].push('item')
    }
    itemsLeft -= itemsToAdd
  }
  
  return distribution
}

  const distribution = distributeItems()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Division</h1>
            <p className="text-sm text-slate-500">What is Division?</p>
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
            Division means sharing equally. It's splitting a total amount into equal groups.
          </p>
          <p className="text-slate-700 leading-relaxed">
            For example, 12 ÷ 3 means sharing 12 items equally among 3 groups.
          </p>
        </section>

        {/* Example Explanation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Example: Sharing Apples</h2>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {/* Total Apples */}
                <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 mb-2">12 apples</span>
                <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="text-2xl">🍎</span>
                    ))}
                </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-purple-400">÷</span>
                  <span className="text-sm text-slate-600 mt-1">shared among</span>
                </div>

                {/* 3 Friends */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-slate-900 mb-2">3 friends</span>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">👦</div>
                      <div className="flex gap-1 mt-2">
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">👧</div>
                      <div className="flex gap-1 mt-2">
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl">🧑</div>
                      <div className="flex gap-1 mt-2">
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                        <span className="text-2xl">🍎</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-purple-400">=</span>
                  <span className="text-sm text-slate-600 mt-1">each gets</span>
                </div>

                {/* Result */}
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-slate-900 mb-2">4 apples each</span>
                  <div className="flex gap-1">
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                    <span className="text-3xl">🍎</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 mt-4">
                12 ÷ 3 = 4 → Each friend gets 4 apples
              </p>
            </div>
          </div>
        </section>

        {/* Division Simulation */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Division Simulation</h2>
          
          {/* Simulation Row - Three Boxes with Operators - Always Horizontal */}
          <div className="flex items-stretch justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto">
            {/* Total Items Box */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropTotal}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                Total Items
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {totalItems}
              </div>
              <div className="flex gap-1 flex-wrap justify-center max-w-20">
                {Array.from({ length: Math.min(totalItems, 8) }).map((_, i) => (
                  <span key={i} className="text-lg sm:text-xl">🍎</span>
                ))}
                {totalItems > 8 && (
                  <span className="text-sm text-slate-500 self-center">+{totalItems - 8} more</span>
                )}
              </div>
            </div>

            {/* Division Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-purple-400">÷</span>
            </div>

            {/* Number of Groups Box */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDropGroups}
              className="flex-1 min-w-24 sm:min-w-32 bg-slate-50 rounded-lg border-2 border-slate-300 p-3 sm:p-6 flex flex-col items-center justify-center cursor-grab hover:bg-slate-100 transition-colors"
            >
              <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3 text-center">
                Groups
              </label>
              <div className="text-4xl sm:text-6xl font-bold text-slate-900 mb-2">
                {numberOfGroups}
              </div>
              <div className="flex gap-1 flex-wrap justify-center">
                {Array.from({ length: Math.min(numberOfGroups, 4) }).map((_, i) => (
                  <span key={i} className="text-2xl sm:text-3xl">🧺</span>
                ))}
                {numberOfGroups > 4 && (
                  <span className="text-sm text-slate-500 self-center">+{numberOfGroups - 4} more</span>
                )}
              </div>
            </div>

            {/* Equals Symbol */}
            <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-purple-400">=</span>
            </div>

            {/* Result Box */}
            <div className="flex-1 min-w-24 sm:min-w-32 bg-purple-50 rounded-lg border-2 border-purple-300 p-3 sm:p-6 flex flex-col items-center justify-center">
              <label className="block text-xs sm:text-sm font-medium text-purple-600 mb-2 sm:mb-3 text-center">
                Items per Group
              </label>
              <div className="text-5xl sm:text-6xl font-bold text-purple-600 text-center mb-2">
                {itemsPerGroup}
                {remainder > 0 && (
                  <span className="text-2xl text-purple-400 ml-1">R{remainder}</span>
                )}
              </div>
              <div className="text-sm text-purple-700 mb-2">
                {remainder > 0 ? `${itemsPerGroup} each + ${remainder} leftover` : 'Equal sharing'}
              </div>
              <div className="flex flex-col gap-2 items-center max-h-32 overflow-y-auto">
                {distribution.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex items-center gap-2">
                    <span className="text-lg">🧺</span>
                    <div className="flex gap-1">
                      {group.map((_, itemIndex) => (
                        <span key={itemIndex} className="text-lg">🍎</span>
                      ))}
                      {groupIndex === 0 && remainder > 0 && (
                        <span className="text-xs text-slate-500 self-center">
                          (+{remainder} leftover)
                        </span>
                      )}
                    </div>
                  </div>
                  
                ))}
              </div>
            </div>
          </div>


          {/* Explanation of the current division */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-6">
            <p className="text-blue-800 text-center font-medium">
              {totalItems} ÷ {numberOfGroups} = {itemsPerGroup} {numberOfGroups === 1 ? 'item' : 'items each'}
              {remainder > 0 && ` with ${remainder} leftover`}
            </p>
            <p className="text-sm text-blue-600 text-center mt-1">
              Sharing {totalItems} items equally among {numberOfGroups} {numberOfGroups === 1 ? 'group' : 'groups'}
            </p>
          </div>

          {/* Item Pool - Drag From Here */}
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
                <p className="text-slate-700 text-sm">Basket/Group</p>
              </div>
            </div>
            <p className="text-slate-700 font-bold text-lg">Drag to share items among groups</p>
            <p className="text-sm text-slate-500 mt-2">
              Drag apples to increase total items. Drag baskets to create more groups to share with.
            </p>
          </div>

          {/* Reset Button */}
          <Button
            onClick={reset}
            className="w-full bg-purple-400 hover:bg-purple-500 text-white font-semibold py-3 text-lg rounded-lg transition-colors"
          >
            Reset Simulation
          </Button>
        </section>

        {/* Educational Explanation */}
        <section className="space-y-6 mb-12">
          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">What is Division?</h3>
            <p className="text-slate-700 leading-relaxed">
              Division is the process of splitting a total amount into equal parts or groups. It answers questions like "How many in each group?" or "How many groups can we make?" Division is the opposite of multiplication. For example, if multiplication is about combining equal groups (3 × 4 = 12), division is about splitting into equal groups (12 ÷ 3 = 4).
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Why do we use Division?</h3>
            <p className="text-slate-700 leading-relaxed">
              We use division in daily life whenever we need to share things equally, split costs, calculate rates, or find averages. For example, when sharing pizza among friends, dividing money equally, calculating speed (distance ÷ time), or finding the price per item when buying in bulk. Division helps us distribute resources fairly and calculate per-unit values.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Real-Life Examples</h3>
            <p className="text-slate-700 leading-relaxed">
              • <strong>Sharing food:</strong> 20 cookies shared among 4 friends = 20 ÷ 4 = 5 cookies each<br/>
              • <strong>Party planning:</strong> 36 balloons to decorate 6 tables = 36 ÷ 6 = 6 balloons per table<br/>
              • <strong>Money:</strong> ₹150 split among 3 people = 150 ÷ 3 = ₹50 each<br/>
              • <strong>Time:</strong> 60 minutes of playtime for 4 games = 60 ÷ 4 = 15 minutes per game<br/>
              • <strong>Recipes:</strong> 500g flour for 10 cookies = 500 ÷ 10 = 50g flour per cookie
            </p>
          </div>

        <div className="bg-white rounded-lg border border-slate-300 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">Division with Remainders</h3>
        <p className="text-slate-700 leading-relaxed">
            Sometimes items cannot be divided equally, leaving some leftover. This is called a remainder. For example, 14 ÷ 3 = 4 remainder 2. This means if you share 14 apples among 3 people, each gets 4 apples and there are 2 apples left over. Remainders are common in real life when items can't be split further.
        </p>
        <div className="mt-4 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* 14 Apples */}
            <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-slate-600 mb-2">14 apples</span>
                <div className="flex gap-1 flex-wrap justify-center max-w-48">
                {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="text-xl">🍎</span>
                ))}
                </div>
            </div>
            
            {/* Division Symbol */}
            <div className="flex flex-col items-center">
                <span className="text-xl text-purple-500 font-bold">÷ 3 =</span>
            </div>
            
            {/* Distribution */}
            <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-slate-600 mb-2">3 people</span>
                <div className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-xl">👨</span>
                    <div className="flex gap-1 mt-1 flex-wrap justify-center w-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className="text-lg">🍎</span>
                    ))}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xl">👩</span>
                    <div className="flex gap-1 mt-1 flex-wrap justify-center w-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className="text-lg">🍎</span>
                    ))}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xl">🧒</span>
                    <div className="flex gap-1 mt-1 flex-wrap justify-center w-12">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className="text-lg">🍎</span>
                    ))}
                    </div>
                </div>
                </div>
                
                {/* Leftover */}
                <div className="mt-4 flex flex-col items-center">
                <span className="text-sm text-slate-600 mb-1">Leftover apples:</span>
                <div className="flex gap-1">
                    {Array.from({ length: 2 }).map((_, i) => (
                    <span key={i} className="text-xl">🍎</span>
                    ))}
                </div>
                <div className="mt-2 text-sm text-slate-600 font-medium">
                    4 each + 2 leftover
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

          <div className="bg-white rounded-lg border border-slate-300 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Division Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">Dividend</h4>
                <p className="text-slate-700">The total amount being divided (e.g., 12 in 12 ÷ 3)</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">Divisor</h4>
                <p className="text-slate-700">The number of groups we're dividing into (e.g., 3 in 12 ÷ 3)</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">Quotient</h4>
                <p className="text-slate-700">The result - items per group (e.g., 4 in 12 ÷ 3 = 4)</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-800 mb-2">Remainder</h4>
                <p className="text-slate-700">Leftover items that can't be divided equally</p>
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