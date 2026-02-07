"use client";

import { Navbar } from "@/components/layout/Navbar";
import { FrogMultiplicationSimulator } from "../../../components/simulations/frog-multiplication/FrogMultiplicationSimulator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FrogMultiplicationPage() {
    return (
        <div className="min-h-screen bg-blue-50 font-outfit">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link
                        href="/games"
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Games
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Simulator */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl font-black text-slate-800 mb-2">Frog Multiplication 🐸</h1>
                            <p className="text-slate-600 text-lg">
                                Build groups of frogs to learn multiplication!
                            </p>
                        </div>

                        <FrogMultiplicationSimulator />
                    </div>

                    {/* Sidebar / Instructions */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">How it Works</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>
                                    <strong className="text-green-600">Groups (Leaves)</strong> × <strong className="text-orange-500">Items (Frogs)</strong>
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>First, add correct number of <strong>Lily Pads</strong> for the first number.</li>
                                    <li>Then, add <strong>Frogs</strong> to each lily pad for the second number.</li>
                                    <li>Count the total frogs to find the answer!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-blue-100 p-6 rounded-2xl border border-blue-200">
                            <h3 className="font-bold text-blue-800 mb-2">Why this works?</h3>
                            <p className="text-blue-700 text-sm leading-relaxed">
                                Multiplication is just repeated addition. <br /><br />
                                <strong>2 × 3</strong> means "2 groups of 3". <br />
                                By visualizing groups, you can see that 3 + 3 = 6.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
