'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Gamepad2,
  BookOpen,
  Trophy,
  Brain,
  Rocket,
  Users,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  Box,
} from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"

export default function EduKidMath() {

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        {/* Animated Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-[10%] opacity-20"
          >
            <Rocket size={120} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-[10%] opacity-20"
          >
            <Brain size={150} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
          >
            <Star size={400} />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Make Math Fun Again!</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl lg:text-7xl font-black font-outfit leading-tight">
                Master Math with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                  Play & Logic
                </span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl lg:text-2xl text-indigo-200 max-w-xl leading-relaxed">
                Join thousands of students learning addition, geometry, and logic through interactive simulations and exciting games.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Link href="/games">
                  <Button size="xl" className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-lg h-16 px-8 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                    <Gamepad2 className="mr-2 w-6 h-6" /> Play Games
                  </Button>
                </Link>
                <Link href="/simulations">
                  <Button size="xl" variant="outline" className="bg-transparent border-2 border-[#5544e5] text-[#5544e5] hover:bg-white/20 font-bold text-lg h-16 px-8 rounded-2xl">
                    <BookOpen className="mr-2 w-6 h-6" /> Math Simulations
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-10 -right-10 bg-yellow-400 text-yellow-900 p-4 rounded-2xl shadow-lg font-bold transform rotate-12">
                  <Trophy className="w-8 h-8 mb-1" />
                  #1 for Kids!
                </div>
                <img
                  src="https://img.freepik.com/free-vector/happy-student-math-class_1308-33333.jpg?w=1480"
                  alt="Math Learning"
                  className="rounded-2xl w-full h-auto shadow-inner"
                />
                <div className="mt-6 flex justify-between items-center text-white">
                  <div className="flex -space-x-4">
                    {["+", "-", "x", "/"].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-indigo-500 flex items-center justify-center text-2xl font-bold">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="font-bold text-lg">10k+ Happy Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto fill-slate-50">
            <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1440,96L1440,320L1344,320C1248,320,1152,320,1056,320C960,320,864,320,768,320C672,320,576,320,480,320C384,320,288,320,192,320C96,320,0,320,0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Primary Math Description */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 relative inline-block">
            Primary Mathematics
            <div className="absolute -bottom-2 left-0 w-full h-4 bg-yellow-300 -z-10 opacity-50 transform -rotate-1 rounded-full"></div>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We cover the essential building blocks of mathematics for primary school students.
            From basic arithmetic to the wonders of geometry, our curriculum is designed to build confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-blue-500"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Arithmetic</h3>
            <p className="text-slate-500 mb-6">Master addition, subtraction, multiplication, and division with visual aides and fun characters.</p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Number Sense</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Mental Math</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Operations</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-purple-500"
          >
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Box className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Geometry</h3>
            <p className="text-slate-500 mb-6">Explore shapes, sizes, and dimensions. Understand 2D and 3D objects with interactive models.</p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 2D Shapes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 3D Solids</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Measurements</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-3xl shadow-lg border-b-8 border-orange-500"
          >
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Logic & Reasoning</h3>
            <p className="text-slate-500 mb-6">Develop critical thinking skills through puzzles, patterns, and problem-solving challenges.</p>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Patterns</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Logical Sequences</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Strategy</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-50 skew-x-12 transform translate-x-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-slate-800 mb-6">About Our Mission</h2>
              <div className="h-2 w-20 bg-indigo-500 rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                EduKid Math was born from a simple idea: <span className="font-bold text-indigo-600">Learning should be an adventure, not a chore.</span>
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We believe that every child has the potential to love mathematics. By replacing rote memorization with verified interactive visual models, we help students build a deep, intuitive understanding of mathematical concepts.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-3xl font-black text-indigo-600 mb-2">100%</div>
                  <div className="text-sm font-bold text-slate-500">Free to Use</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-3xl font-black text-indigo-600 mb-2">24/7</div>
                  <div className="text-sm font-bold text-slate-500">Accessible Learning</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50"
              ></motion.div>

              <div className="grid grid-cols-2 gap-4">
                <img src="https://img.freepik.com/free-vector/kids-studying-from-home-concept-illustration_114360-2070.jpg" alt="Child Learning" className="rounded-3xl shadow-lg border-4 border-white transform translate-y-8" />
                <img src="https://img.freepik.com/free-vector/math-teacher-concept-illustration_114360-1755.jpg" alt="Teacher" className="rounded-3xl shadow-lg border-4 border-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-black font-outfit mb-4">EduKid Math</h3>
              <p className="text-slate-400 max-w-sm">
                Empowering the next generation of thinkers, solvers, and dreamers through interactive mathematics education.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-indigo-400">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/games" className="hover:text-white transition-colors">Games</Link></li>
                <li><Link href="/simulations" className="hover:text-white transition-colors">Lessons</Link></li>
                <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-indigo-400">Connect</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} EduKid Math. Made with ❤️ for students everywhere.
          </div>
        </div>
      </footer>
    </div>
  )
}
