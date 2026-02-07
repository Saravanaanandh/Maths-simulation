'use client'

import Link from "next/link"
import {
  Plus,
  Minus,
  X,
  Divide,
  Square,
  Circle,
  RectangleHorizontal,
  Triangle, 
  Box,
  Cuboid,
  Globe,
  Cone,
} from "lucide-react"

export default function EduKidMath() {
  const simulations = [
    {
      title: "Addition",
      desc: "Visualize addition using objects and number lines.",
      link: "/addition",
      icon: Plus,
    },
    {
      title: "Subtraction",
      desc: "Understand subtraction by removing quantities.",
      link: "/subtraction",
      icon: Minus,
    },
    {
      title: "Multiplication",
      desc: "Learn multiplication as repeated addition.",
      link: "/multiplication",
      icon: X,
    },
    {
      title: "Division",
      desc: "Divide numbers into equal parts step by step.",
      link: "/division",
      icon: Divide,
    },
    {
      title: "Square – Area & Perimeter",
      desc: "Explore square measurements interactively.",
      link: "/square",
      icon: Square,
    },
    {
      title: "Circle – Area & Circumference",
      desc: "Understand circle formulas visually.",
      link: "/circle",
      icon: Circle,
    },
    {
      title: "Rectangle – Area & Perimeter",
      desc: "Calculate rectangle dimensions clearly.",
      link: "/rectangle",
      icon: RectangleHorizontal,
    },
    {
      title: "Triangle – Basics",
      desc: "Learn triangle area and perimeter concepts.",
      link: "/triangle",
      icon: Triangle,
    },
    {
      title: "Cube - Volume & Surface Area",
      desc: "Calculate volume and surface area in 3D.",
      link: "/cube",
      icon: Box,
    },
    {
      title: "Cuboid - Volume & Surface Area",
      desc: "Calculate volume and surface area of rectangular prisms in 3D.",
      link: "/cuboid",
      icon: Cuboid, // You can use the same Box icon or create/import a Cuboid icon
    },
    {
      title: "Sphere - Volume & Surface Area",
      desc: "Calculate volume and surface area of perfect spheres in 3D.",
      link: "/sphere",
      icon: Globe, // Lucide-react Circle icon works well for sphere
    },
    {
      title: "Cone - Volume & Surface Area",
      desc: "Calculate volume and surface area of 3D cones with circular bases.",
      link: "/cone",
      icon: Cone, // If you have a Cone icon available
    }
  ]

  return (
    <div className="min-h-screen bg-[#f2f2f2]">

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-semibold text-slate-900">
            EduKid
          </h1>
          <p className="text-sm text-slate-500">
            Interactive Math Simulations
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-8 text-sm">
          <span className="font-medium text-blue-600">Mathematics Simulations</span>
          <span className="text-slate-600">Math Playground</span> 
        </div>
      </nav>

      {/* Section Title */}
      <section className="bg-[#eaeaea]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Mathematics Simulations
          </h2>
        </div>
      </section>

      {/* Simulation Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {simulations.map((sim) => {
            const Icon = sim.icon
            return (
              <Link key={sim.title} href={sim.link}>
                <div className="
                  bg-white border rounded-md
                  hover:shadow-lg transition
                  h-full flex flex-col
                ">
                  {/* Preview */}
                  <div className="
                    h-32 border-b bg-[#fafafa]
                    flex items-center justify-center
                  ">
                    <Icon className="w-10 h-10 text-slate-500" />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2">
                      {sim.title}
                    </h3>
                    <p className="text-sm text-slate-600 flex-1">
                      {sim.desc}
                    </p>
                    <span className="mt-4 text-sm text-blue-600 font-medium">
                      Open Simulation →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-500">
          © EduKid – Math Learning Platform
        </div>
      </footer>

    </div>
  )
}