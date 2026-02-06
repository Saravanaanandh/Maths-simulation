'use client'

import React from "react"
import Link from 'next/link'

export default function LandingPage() {
  const modules = [
    {
      title: "Addition",
      description: "Learn what addition is, why it is used, and how to find totals.",
      link: "/addition",
      icon: "+",
      color: "bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300"
    },
    {
      title: "Subtraction",
      description: "Learn how subtraction helps find the difference between numbers.",
      link: "/subtraction",
      icon: "-",
      color: "bg-red-50 border-red-200 text-red-600 hover:border-red-300"
    },
    {
      title: "Multiplication",
      description: "Learn multiplication as repeated addition.",
      link: "/multiplication",
      icon: "×",
      color: "bg-green-50 border-green-200 text-green-600 hover:border-green-300"
    },
    {
      title: "Division",
      description: "Learn how to split numbers into equal parts.",
      link: "/division",
      icon: "÷",
      color: "bg-purple-50 border-purple-200 text-purple-600 hover:border-purple-300"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Mathematics Study App</h1>
            <p className="text-sm text-slate-500">Choose a topic to start learning</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.link}
              className={`block group relative overflow-hidden rounded-xl border-2 p-8 transition-all hover:shadow-md ${module.color}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{module.title}</h2>
                  <span className="text-4xl font-bold opacity-50">{module.icon}</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {module.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-600">
          </p>
        </div>
      </div>
    </div>
  )
}
